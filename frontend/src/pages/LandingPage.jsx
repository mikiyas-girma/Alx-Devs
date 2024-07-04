import { AspectRatio } from "@/components/ui/aspect-ratio"
import Hero from "@/components/Hero"
import Features from "@/components/Features";
import About from "@/components/About";


const LandingPage = () => {
    return (
        <div className="bg-gradient-to-b from-blue-500 to-sky-500">
            <div>
                    <Hero />
            </div>
            <div>
                <Features />
            </div>
            <div>
                <About />
            </div>
        </div>
    );
};


export default LandingPage;
