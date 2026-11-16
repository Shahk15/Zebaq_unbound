import Hero from "../components/sections/Hero";

type HomeProps = {
    // Becomes true when the loader curtain starts opening
    play: boolean;
};

export default function Home({ play }: HomeProps) {
    return (
        <main>
            <Hero play={play} />
            {/* Next: <Services />, <FeaturedWork />, <TrustBar /> ... */}
        </main>
    );
}