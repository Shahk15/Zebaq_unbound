import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { className?: string; color?: string };

const COLS = 150;
const ROWS = 46;
const W = 22;
const D = 7;
const RADIUS = 1.9;
const LIFT = 1.0;
const PUSH = 0.5;

// Dark dots on a light surface. Same pointer interaction as the dark DotWave.
export default function DotWaveInk({ className = "", color = "#0a1f44" }: Props) {
    const host = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = host.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        const canvas = renderer.domElement;
        canvas.style.cssText = "display:block;width:100%;height:100%";
        el.appendChild(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.set(0, 3.4, 8);
        camera.lookAt(0, 0, 0);

        const count = COLS * ROWS;
        const baseX = new Float32Array(count);
        const baseZ = new Float32Array(count);
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const alphas = new Float32Array(count);

        for (let j = 0; j < ROWS; j++) {
            for (let i = 0; i < COLS; i++) {
                const k = j * COLS + i;
                baseX[k] = (i / (COLS - 1) - 0.5) * W;
                baseZ[k] = (j / (ROWS - 1) - 0.5) * D;
                positions[k * 3] = baseX[k];
                positions[k * 3 + 2] = baseZ[k];
            }
        }

        const geo = new THREE.BufferGeometry();
        const posAttr = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage);
        const sizeAttr = new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage);
        const alphaAttr = new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage);
        geo.setAttribute("position", posAttr);
        geo.setAttribute("aSize", sizeAttr);
        geo.setAttribute("aAlpha", alphaAttr);

        const material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                uColor: { value: new THREE.Color(color) },
                uPx: { value: renderer.getPixelRatio() },
            },
            vertexShader: `
                attribute float aSize;
                attribute float aAlpha;
                varying float vA;
                uniform float uPx;
                void main() {
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aSize * uPx * (14.0 / -mv.z);
                    vA = aAlpha;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                varying float vA;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    float a = smoothstep(0.5, 0.36, d);
                    gl_FragColor = vec4(uColor, a * vA);
                }
            `,
        });

        const points = new THREE.Points(geo, material);
        points.frustumCulled = false;
        scene.add(points);

        // Pointer -> point on the wave plane
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const hit = new THREE.Vector3();
        const ndc = new THREE.Vector2();
        const mouse = { x: 0, z: 0, on: false, s: 0 };

        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
            mouse.on = inside;
            if (!inside) return;
            ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
            raycaster.setFromCamera(ndc, camera);
            if (raycaster.ray.intersectPlane(plane, hit)) {
                mouse.x = hit.x;
                mouse.z = hit.z;
            }
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        const draw = (time: number) => {
            const t = time * 0.001;
            mouse.s += ((mouse.on ? 1 : 0) - mouse.s) * 0.08;

            for (let k = 0; k < count; k++) {
                const x = baseX[k];
                const z = baseZ[k];
                let y =
                    Math.sin(x * 0.8 + t * 0.8) * 0.26 +
                    Math.sin(z * 1.6 - t * 0.6 + x * 0.35) * 0.18 +
                    Math.sin(x * 0.3 + z * 0.7 + t * 0.4) * 0.2;
                let px = x;
                let pz = z;
                let f = 0;

                if (mouse.s > 0.001) {
                    const dx = x - mouse.x;
                    const dz = z - mouse.z;
                    const d = Math.hypot(dx, dz);
                    if (d < RADIUS) {
                        f = Math.pow(1 - d / RADIUS, 2) * mouse.s;
                        y += f * LIFT;
                        const inv = 1 / (d || 1);
                        px += dx * inv * f * PUSH;
                        pz += dz * inv * f * PUSH;
                    }
                }

                positions[k * 3] = px;
                positions[k * 3 + 1] = y;
                positions[k * 3 + 2] = pz;
                sizes[k] = 1.7 + (y + 0.5) * 1.2 + f * 2.4;
                alphas[k] = Math.min(0.95, 0.32 + (y + 0.5) * 0.4 + f * 0.5);
            }

            posAttr.needsUpdate = true;
            sizeAttr.needsUpdate = true;
            alphaAttr.needsUpdate = true;
            renderer.render(scene, camera);
        };

        let raf = 0;
        const loop = (time: number) => {
            draw(time);
            raf = requestAnimationFrame(loop);
        };

        const resize = () => {
            const w = el.clientWidth || 1;
            const h = el.clientHeight || 1;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            if (reduce) draw(2000);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        resize();

        // Only animate while on screen
        const io = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(raf);
            if (entry.isIntersecting && !reduce) raf = requestAnimationFrame(loop);
        });
        io.observe(el);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            window.removeEventListener("pointermove", onMove);
            geo.dispose();
            material.dispose();
            renderer.dispose();
            canvas.remove();
        };
    }, [color]);

    return <div ref={host} aria-hidden="true" className={className} />;
}