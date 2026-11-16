import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";

type HomeProps = {
    // Becomes true when the loader curtain starts opening
    play: boolean;
};

export default function Home({ play }: HomeProps) {
    return (
        <>
            <Header play={play} />
            <main>
                <Hero play={play} />
                {/* Next: <Services />, <FeaturedWork />, <TrustBar /> ... */}
            </main>
        </>
    );
}