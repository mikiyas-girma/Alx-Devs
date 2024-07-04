import React from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio"

const HeroSection = () => {
    return (
        <div className='drop-shadow-xl'>
        <AspectRatio ratio={ 4 / 2 } className="bg-no-repeat bg-top bg-cover" style={{ backgroundImage: `url('/landing1.jpg')` }}>
            <div className='text-white flex flex-col items-center h-full justify-center'>
                <h1 className="flex text-7xl font-bold">Collaborate 
                     <span className='mx-2'> & </span> <br /> Grow with Alx Devs</h1>
                <p className="text-xl m-6">Find peers, join projects, and build your portfolio together.</p>
                <Link to="/signup" 
                    className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded-xl">
                    Get Started
                </Link>
                <div className="mt-10 text-xl font-bold flex flex-col">
                    <p className='m-4'>Connect with developers worldwide.</p>
                    <p className='m-4'>Work on real-world projects.</p>
                    <p className='m-4'>Enhance your skills and portfolio.</p>
                </div>
            </div>
        </AspectRatio>
        </div>
    );
};

export default HeroSection;
