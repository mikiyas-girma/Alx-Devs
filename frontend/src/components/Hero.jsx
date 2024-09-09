import React from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Star } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className='bg-[#1F3934]'>
            {/* <AspectRatio ratio={ 4 / 2 } className="bg-no-repeat bg-top bg-cover" style={{ backgroundImage: `url('landing1.jpg')` }}> */}
            <div className='text-white flex flex-col h-screen items-center justify-center'>
                <h1 className="flex text-6xl font-space_grotesk font-bold text-[#C7F494]">Collaborate
                    <span className='mx-4'> & </span>
                    <br />
                    Grow with <span className='mx-2 underline hover:decoration-blue-500'>CoDevs</span>
                </h1>
                <p className="text-2xl m-6 font-victor_mono font-bold text-[#C7F494]">Find peers, join projects, and build your portfolio together.</p>
                {/* <Link to="/signup"
                    className="font-space_grotesk self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded-xl">
                    Get Started
                </Link> */}
                <div className="mt-10 text-xl font-bold flex gap-10 font-victor_mono">
                    <div className=''>
                        <span>
                            <Star
                                color='#C7F494'
                                className='m-auto my-2'
                            />
                        </span>
                        <p className='mx-2'>Collaborate with developers</p>
                    </div>
                    <div>
                        <span>
                            <Star
                                color='#C7F494'
                                className='m-auto my-2'
                            />
                        </span>
                        <p className='mx-2'>Work on real-world projects</p>
                    </div>
                    <div>
                        <span>
                            <Star
                                color='#C7F494'
                                className='m-auto my-2'
                            />
                        </span>
                        <p className='mx-2'>Enhance your skills and portfolio</p>
                    </div>
                </div>
                <div className='mt-24'>
                    <Link to="/signup"
                        className="font-victor_mono font-bold self-center text-[#1F3934] bg-[#C7F494] 
                        py-4 px-20 mt-10">
                        Start Working Real Projects
                    </Link>
                </div>
            </div>
            {/* </AspectRatio> */}
        </div>
    );
};

export default HeroSection;
