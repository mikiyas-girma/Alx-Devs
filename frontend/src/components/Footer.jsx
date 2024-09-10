import { Linkedin, Youtube, Twitter, Instagram, Github } from 'lucide-react';


const Footer = () => {
    return (
        <>
            <div className="font-space_grotesk  bg-[#03363D] pt-8 pb-6 md:pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 space-between px-2 md:px-8 border-[#C7F494] pb-8 border-b mx-2 md:mx-10">
                    <div className="font-space_grotesk text-xl md:text-3xl hidden md:block font-bold flex items-end md:py-3">CoDevs</div>
                    <div className="md:col-span-2 flex flex-col md:flex-row md:justify-end space-around md:items-end">
                        <div className="text-lg md:text-2xl font-bold py-3 m-auto">Powering Up Your Skills In Team</div>
                        <div className="flex justify-center items-center">
                            <div className="px-6 py-3 md:ml-4 font-bold md:tracking-wide md:leading-7 bg-[#1c5955]
                             hover:bg-[#35b999] rounded-lg text-center">
                                Get Started
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row'>
                    <div className="text-sm md:text-lg flex w-full gap-x-2 md:gap-8 pt-7 ml-2 md:mx-14">
                        <div className='ml-2'>
                            Codevs @ 2024
                        </div>
                        <div className='ml-2'>
                            Privacy Policy
                        </div>
                        <div className='mr-4'>
                            Terms of Service
                        </div>
                    </div>
                    <div className='flex w-full gap-8 pt-7 mr-14 justify-center md:justify-end'>
                        <div>
                            <Linkedin />
                        </div>
                        <div>
                            <Youtube />
                        </div>
                        <div>
                            <Github />
                        </div>
                        <div>
                            <Twitter />
                        </div>
                        <div>
                            <Instagram />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Footer
