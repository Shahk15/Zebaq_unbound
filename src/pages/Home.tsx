
import Header from "../components/layout/Header";
import HeroStage from "../components/common/HeroStage";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Clients from "../components/sections/Clients";

type HomeProps = {
    play: boolean;
};

export default function Home({ play }: HomeProps) {
    return (
        <>
            <Header play={play} />
            <main>
                <HeroStage>
                    <Hero play={play} />
                </HeroStage>

                <Services play={play} />
                <Clients />
            </main>
        </>
    );
}
