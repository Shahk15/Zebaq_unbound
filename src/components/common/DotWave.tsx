import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { className?: string };

// Rolling dot-grid wave. The dots near the cursor lift and spread away from it.
// Pauses off-screen, renders one still frame for reduced motion.
export default function DotWave({ className = "" }: Props) {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        host.appendChild(renderer.domElement);
        renderer.domElement.style.display = "block";

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.set(0, 4.4, 9.5);
        camera.lookAt(0, 0, 0);

        const COLS = 150;
        const ROWS = 48;
        const W = 24;
        const D = 7.5;
        const count = COLS * ROWS;
        const baseX = new Float32Array(count);
        const baseZ = new Float32Array(count);
        const positions = new Float32Array(count * 3);
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const i = r * COLS + c;
                baseX[i] = (c / (COLS - 1) - 0.5) * W;
                baseZ[i] = (r / (ROWS - 1) - 0.5) * D;
                positions[i * 3] = baseX[i];
                positions[i * 3 + 2] = baseZ[i];
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0xbcd9f7,
            size: 0.034,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            depthWrite: false,
        });
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        /* ---------- Pointer: mapped onto the wave plane ---------- */
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const hit = new THREE.Vector3();
        const ndc = new THREE.Vector2();
        const mouse = { x: 0, z: 0, strength: 0, target: 0 };
        const RADIUS = 2.1; // world units
        const LIFT = 1.15;
        const PUSH = 0.55;

        const onMove = (e: PointerEvent) => {
            const rect = host.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
            raycaster.setFromCamera(ndc, camera);
            if (raycaster.ray.intersectPlane(plane, hit) && Math.abs(hit.x) < W * 0.6 && Math.abs(hit.z) < D * 0.8) {
                if (mouse.target === 0) {
                    mouse.x = hit.x;
                    mouse.z = hit.z;
                }
                mouse.x += (hit.x - mouse.x) * 0.35;
                mouse.z += (hit.z - mouse.z) * 0.35;
                mouse.target = 1;
            } else {
                mouse.target = 0;
            }
        };
        const onLeave = () => {
            mouse.target = 0;
        };
        if (!reduce) {
            window.addEventListener("pointermove", onMove, { passive: true });
            document.addEventListener("pointerleave", onLeave);
        }

        const update = (t: number) => {
            const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
            mouse.strength += (mouse.target - mouse.strength) * 0.07;
            const s = mouse.strength;
            const r2 = RADIUS * RADIUS;

            for (let i = 0; i < count; i++) {
                const x = baseX[i];
                const z = baseZ[i];
                let y = Math.sin(x * 0.55 + t) * 0.38 + Math.cos(z * 1.1 + t * 0.8) * 0.24 + Math.sin((x + z) * 0.35 - t * 0.6) * 0.18;
                let px = x;
                let pz = z;

                if (s > 0.001) {
                    const dx = x - mouse.x;
                    const dz = z - mouse.z;
                    const d2 = dx * dx + dz * dz;
                    if (d2 < r2 * 4) {
                        const f = Math.exp(-d2 / (2 * r2 * 0.35)) * s;
                        const d = Math.sqrt(d2) || 1;
                        y += f * LIFT;
                        px += (dx / d) * f * PUSH;
                        pz += (dz / d) * f * PUSH;
                    }
                }
                attr.setXYZ(i, px, y, pz);
            }
            attr.needsUpdate = true;
        };

        const resize = () => {
            const w = host.clientWidth || 1;
            const h = host.clientHeight || 1;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(host);
        resize();

        let raf = 0;
        let visible = true;
        const clock = new THREE.Clock();
        const loop = () => {
            raf = requestAnimationFrame(loop);
            if (!visible) return;
            update(clock.getElapsedTime() * 0.7);
            renderer.render(scene, camera);
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        io.observe(host);

        update(0);
        renderer.render(scene, camera);
        if (!reduce) loop();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            io.disconnect();
            ro.disconnect();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={hostRef} aria-hidden="true" className={className} />;
}