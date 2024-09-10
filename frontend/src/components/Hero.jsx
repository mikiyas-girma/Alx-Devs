import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className='bg-[#1F3934]'>
            <div className='text-white flex flex-col pt-10 md:pt-24'>
                <div className="text-3xl text-center md:text-6xl font-space_grotesk font-bold text-[#C7F494]">Collaborate
                    <span className='mx-2'> & </span>
                    <span className=''>Grow with</span> 
                    <span className='mx-2 underline hover:decoration-blue-500'>CoDevs</span>
                </div>
                <p className="text-lg md:text-2xl text-center px-4 pt-7 md:pt-2 md:m-6 font-victor_mono font-bold text-[#C7F494]">
                    Find peers, join projects, and build your portfolio together.
                </p>
                
                <div className="m-auto mt-4 md:mt-10  md:text-center text-lg md:text-2xl font-bold 
                     flex flex-col md:flex-row gap-4 md:gap-10 font-libre text-[#FFFFB1]">
                    <div className=''>
                        <span>
                            <Star
                                color='#C7F494'
                                className='m-auto md:my-2'
                            />
                        </span>
                        <p className='mx-2 flex justify-center'>Collaborate with developers</p>
                    </div>
                    <div className='text-center'>
                        <span>
                            <Star
                                color='#C7F494'
                                className='m-auto md:my-2'
                            />
                        </span>
                        <p className='mx-2 flex justify-center'>Work on real-world projects</p>
                    </div>
                    <div className='text-center'>
                        <span>
                            <Star
                                color='#C7F494'
                                className='m-auto md:my-2'
                            />
                        </span>
                        <p className='mx-2 flex justify-center'>Enhance  your skills</p>
                    </div>
                </div>
                <div className='mt-16 my-4 md:mb-28 md:mt-24 text-center'>
                    <Link to="/signup"
                        className="font-libre font-bold text-[#1F3934] bg-[#FFFFB1] 
                        py-3 md:py-4 px-6 md:px-20 md:mt-10 rounded">
                        Start Working Real Projects
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
