import Header from "../components/layout/Header";
import HeroStage from "../components/common/HeroStage";
import Cursor from "../components/common/Cursor";
import ScrollProgress from "../components/common/ScrollProgress";
import ScrollCue from "../components/common/ScrollCue";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Clients from "../components/sections/Clients";
import Manifesto from "../components/sections/Manifesto";
import Impact from "../components/sections/Impact";
import WhoWeHelp from "../components/sections/WhoWeHelp";


type HomeProps = {
    // Becomes true when the loader curtain starts opening
    play: boolean;
};

export default function Home({ play }: HomeProps) {
    return (
        <>
            <Cursor />
            <ScrollProgress />
            <Header play={play} />
            <ScrollCue play={play} />

            <main>
                <HeroStage>
                    <Hero play={play} />
                </HeroStage>

                <Services play={play} />
                <Clients />
                <Impact />
                <Manifesto />
                <WhoWeHelp />
                
            </main>
        </>
    );
}