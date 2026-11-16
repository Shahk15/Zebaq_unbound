import { Fragment, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type HeroProps = {
    play: boolean;
};

const WORDS = ["Innovate.", "Build.", "Grow."];

// Faint rounded cards in the background (full class strings so Tailwind can see them)
const BG_CARDS = [
    "left-[2.7%] top-[14%] h-[21%] w-[27%]",
    "left-[34%] top-[14%] h-[21%] w-[20%]",
    "left-[60.5%] top-[14%] h-[21%] w-[20.5%]",
    "left-[85%] top-[14%] h-[21%] w-[15%]",
    "left-[2.7%] top-[69%] h-[22%] w-[24.5%]",
    "left-[72%] top-[69%] h-[22%] w-[26%]",
];

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vH;
  varying float vAlpha;
  varying float vAccent;

  void main() {
    vec3 p = position;
    float t = uTime;

    // Layered, slow rolling hills
    float h = sin(p.x * 0.22 + t * 0.45) * 0.90
            + sin(p.z * 0.30 - t * 0.55) * 0.55
            + sin(p.x * 0.50 + p.z * 0.35 + t * 0.35) * 0.50
            + sin(p.x * 0.09 - p.z * 0.12 + t * 0.20) * 1.10;
    // Hills grow a little toward the back so they read from a low camera
    h *= 0.6 + 0.4 * smoothstep(4.0, -14.0, p.z);

    // Cursor: soft ripple plus a gentle lift
    float md = distance(p.xz, uMouse);
    h += sin(md * 2.2 - t * 4.0) * exp(-md * 0.55) * 0.45;
    h += exp(-md * md * 0.35) * 0.60;

    p.y = h;
    vH = h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;

    // A few dots (about 2.5%) get the accent color and a larger size
    float accent = step(0.975, aRand);
    vAccent = accent;

    // Fade into the background with distance, and slightly at the far sides
    float fade = (1.0 - smoothstep(9.0, 27.0, depth)) * (1.0 - smoothstep(15.0, 19.0, abs(p.x)));
    float k = smoothstep(-1.2, 2.6, h);
    vAlpha = mix(fade * (0.60 + 0.40 * k), fade, accent);

    float size = mix(0.85 + fract(aRand * 91.7) * 0.5, 2.0, accent);
    gl_PointSize = clamp(size * uPixelRatio * (15.0 / depth), 1.0 * uPixelRatio, 4.5 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uAccent;
  varying float vH;
  varying float vAlpha;
  varying float vAccent;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Light, airy blues: pale in the valleys, a softer mid-blue on the crests
    vec3 pale = vec3(0.58, 0.71, 0.92);
    vec3 soft = vec3(0.22, 0.42, 0.78);
    vec3 col = mix(pale, soft, smoothstep(-1.2, 2.6, vH));
    col = mix(col, uAccent, vAccent);
    gl_FragColor = vec4(col, smoothstep(0.5, 0.2, d) * vAlpha);
  }
`;

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[22px] w-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
    );
}

export default function Hero({ play }: HeroProps) {
    const heroRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /* ---------- Three.js dot-matrix wave ---------- */
    useEffect(() => {
        const canvas = canvasRef.current;
        const hero = heroRef.current;
        if (!canvas || !hero) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(pixelRatio);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        const lookTarget = new THREE.Vector3(0, 0.5, -6);
        let baseZ = 8;
        camera.position.set(0, 3, baseZ);
        camera.lookAt(lookTarget);

        // Dot grid on the ground plane: the near edge is cut off by the bottom of the screen
        const COLS = 380;
        const ROWS = 150;
        const WIDTH = 38;
        const NEAR = 4;
        const DEPTH = 24;
        const COUNT = COLS * ROWS;
        const positions = new Float32Array(COUNT * 3);
        const rands = new Float32Array(COUNT);
        let i = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                positions[i * 3] = (c / (COLS - 1) - 0.5) * WIDTH;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = NEAR - (r / (ROWS - 1)) * DEPTH;
                rands[i] = Math.random();
                i++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(999, 999) },
            uPixelRatio: { value: pixelRatio },
            // Accent color of the few scattered dots
            uAccent: { value: new THREE.Color(0x0b57d0) },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            depthWrite: false,
            vertexShader: VERTEX,
            fragmentShader: FRAGMENT,
        });

        const field = new THREE.Points(geometry, material);
        field.frustumCulled = false;
        scene.add(field);

        // Mouse -> world position on the ground plane (y = 0)
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const ndc = new THREE.Vector2();
        const hit = new THREE.Vector3();
        const mouseTarget = new THREE.Vector2(999, 999);
        const tiltTarget = new THREE.Vector2(0, 0);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(ndc, camera);
            if (raycaster.ray.intersectPlane(plane, hit)) mouseTarget.set(hit.x, hit.z);
            tiltTarget.set(ndc.x, ndc.y);
        };
        const onLeave = () => {
            mouseTarget.set(999, 999);
            tiltTarget.set(0, 0);
        };
        if (!reduce) {
            window.addEventListener("mousemove", onMove);
            document.documentElement.addEventListener("mouseleave", onLeave);
        }

        const resize = () => {
            const w = hero.clientWidth;
            const h = hero.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            // Pull the camera back a little on tall screens so the field still reads as a wave
            baseZ = camera.aspect < 1 ? 8 + (1 - camera.aspect) * 6 : 8;
            camera.position.z = baseZ;
            camera.updateProjectionMatrix();
            if (reduce) renderer.render(scene, camera);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(hero);
        resize();

        // Pause rendering when the hero is scrolled out of view
        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        io.observe(hero);

        let raf = 0;
        const start = performance.now();
        const tick = () => {
            raf = requestAnimationFrame(tick);
            if (!visible) return;

            uniforms.uTime.value = (performance.now() - start) / 1000;

            // Very small parallax that follows the cursor
            camera.position.x += (tiltTarget.x * 0.8 - camera.position.x) * 0.04;
            camera.position.y += (3 + tiltTarget.y * 0.3 - camera.position.y) * 0.04;
            camera.position.z = baseZ;
            camera.lookAt(lookTarget);

            // Smooth cursor follow so the ripple glides
            if (mouseTarget.x > 900) {
                uniforms.uMouse.value.set(999, 999);
            } else if (uniforms.uMouse.value.x > 900) {
                uniforms.uMouse.value.copy(mouseTarget);
            } else {
                uniforms.uMouse.value.lerp(mouseTarget, 0.12);
            }

            renderer.render(scene, camera);
        };
        if (!reduce) tick();

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            window.removeEventListener("mousemove", onMove);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    /* ---------- GSAP: hide everything until the loader reveals ---------- */
    useGSAP(
        () => {
            gsap.set(".hero-word", { yPercent: 115 });
            gsap.set(".hero-copy", { opacity: 0, y: 24 });
            gsap.set(".hero-fade-down", { opacity: 0, y: -20 });
            gsap.set(".hero-fade-up", { opacity: 0, y: 30 });
            gsap.set(".hero-card", { opacity: 0, scale: 0.96 });
            gsap.set(canvasRef.current, { opacity: 0 });
        },
        { scope: heroRef }
    );

    /* ---------- GSAP: entrance, runs when the loader curtain opens ---------- */
    useGSAP(
        () => {
            if (!play) return;

            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduce) {
                gsap.set(
                    [".hero-word", ".hero-copy", ".hero-fade-down", ".hero-fade-up", ".hero-card", canvasRef.current],
                    { clearProps: "all" }
                );
                return;
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(".hero-word", { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0)
                .to(canvasRef.current, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0)
                .to(".hero-card", { opacity: 1, scale: 1, duration: 1.2, stagger: 0.08 }, 0.2)
                .to(".hero-fade-down", { opacity: 1, y: 0, duration: 0.9 }, 0.4)
                .to(".hero-copy", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.55)
                .to(".hero-fade-up", { opacity: 1, y: 0, duration: 0.9 }, 0.8);
        },
        { scope: heroRef, dependencies: [play] }
    );

    return (
        <section
            ref={heroRef}
            className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f6f7fb] px-[4.4%] text-[#0b1b3a]"
        >
            {/* Background cards */}
            {BG_CARDS.map((pos) => (
                <div
                    key={pos}
                    className={`hero-card absolute z-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(228,232,242,0.55),rgba(240,242,249,0.35))] max-[820px]:hidden ${pos}`}
                />
            ))}

            {/* Particle canvas sits behind the text */}
            <canvas ref={canvasRef} className="absolute inset-0 z-[1] block h-full w-full" />

            {/* Header */}
            <header className="hero-fade-down relative z-[5] flex items-center justify-between py-[clamp(16px,3vh,32px)]">
                <a href="#" aria-label="Zebaq" className="flex items-center">
                    <img
                        src="/images/logo/full-logo.png"
                        alt="Zebaq"
                        className="h-[clamp(40px,5vw,64px)] w-auto"
                    />
                </a>
                <div className="flex items-center gap-7">
                    <button aria-label="Menu" className="grid place-items-center text-[#0b1b3a]">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <path d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                    </button>
                    <button aria-label="Search" className="grid place-items-center text-[#0b1b3a]">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <circle cx="11" cy="11" r="7.5" />
                            <path d="M16.5 16.5L21 21" />
                        </svg>
                    </button>
                    <button className="text-lg font-medium tracking-[0.02em] text-[#0b1b3a]">ENG</button>
                </div>
            </header>

            {/* Headline + side copy */}
            <div className="pointer-events-none relative z-[3] flex flex-1 flex-col items-center justify-center">
                <div
                    className="flex w-fit max-w-full flex-col gap-[clamp(16px,4vh,48px)]
                     [--fs:clamp(36px,min(9.2vw,18vh),170px)]
                     max-[820px]:[--fs:clamp(40px,13vw,80px)]"
                >
                    <h1
                        className="whitespace-nowrap text-center text-[length:var(--fs)] font-bold leading-[1.05]
                       tracking-[-0.045em] [font-family:var(--font-heading)] max-[820px]:whitespace-normal"
                    >
                        {WORDS.map((w, idx) => (
                            <Fragment key={w}>
                                {idx > 0 && " "}
                                {/* Mask: each word rises out of a hidden line */}
                                <span className="-mx-[0.06em] -mb-[0.12em] inline-block overflow-hidden px-[0.06em] pb-[0.12em] align-top">
                                    <span className="hero-word inline-block bg-[linear-gradient(rgb(0,76,148)_45%,rgb(41,123,196)_90%)] bg-clip-text text-transparent">
                                        {w}
                                    </span>
                                </span>
                            </Fragment>
                        ))}
                    </h1>

                    <div
                        className="flex items-start justify-between gap-6 pl-[calc(var(--fs)*0.055)]
                       max-[820px]:flex-col max-[820px]:items-center max-[820px]:pl-0 max-[820px]:text-center"
                    >
                        <p className="hero-copy max-w-[24ch] text-[clamp(13px,min(1.5vw,2.6vh),24px)] leading-[1.35] text-[#3a4560] max-[820px]:max-w-[34ch]">
                            We blend strategy, creativity, and technology to accelerate meaningful business growth.
                        </p>
                        <p className="hero-copy max-w-[24ch] text-[clamp(13px,min(1.5vw,2.6vh),24px)] leading-[1.35] text-[#0b1b3a] max-[820px]:max-w-[34ch]">
                            Every detail builds trust, strengthens your brand, and drives lasting results.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA pill */}
            <div
                className="hero-fade-up relative z-[5] mb-[clamp(16px,4vh,48px)] flex items-center gap-4 self-center rounded-full
                   bg-white/85 px-6 py-[14px] shadow-[0_10px_40px_rgba(20,50,110,0.10)] backdrop-blur-sm
                   max-[820px]:flex-wrap max-[820px]:justify-center max-[820px]:rounded-[28px]"
            >
                <img src="/images/logo/z.png" alt="" className="h-7 w-auto max-[820px]:hidden" />
                <span className="h-8 w-px bg-[#dfe3ee] max-[820px]:hidden" />
                <a
                    href="#"
                    className="inline-flex items-center gap-[14px] rounded-full border border-[#0b57d0] bg-[#0b57d0] px-[clamp(24px,2.8vw,40px)]
                     py-[clamp(12px,2.2vh,18px)] text-[19px] font-medium text-white transition duration-200
                     hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(11,87,208,0.35)]
                     max-[820px]:px-6 max-[820px]:py-[14px] max-[820px]:text-base"
                >
                    Book a consultation
                    <ArrowIcon />
                </a>
                <a
                    href="#"
                    className="inline-flex items-center gap-[14px] rounded-full border border-[#0b57d0] bg-white px-[clamp(24px,2.8vw,40px)]
                     py-[clamp(12px,2.2vh,18px)] text-[19px] font-medium text-[#0b1b3a] transition duration-200
                     hover:-translate-y-0.5 max-[820px]:px-6 max-[820px]:py-[14px] max-[820px]:text-base"
                >
                    View our work
                    <ArrowIcon />
                </a>
            </div>
        </section>
    );
}