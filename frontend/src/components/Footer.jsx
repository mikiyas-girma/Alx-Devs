import { Linkedin, Youtube, Twitter, Instagram, Github } from 'lucide-react';


const Footer = () => {
    return (
        <>
            <div className="font-space_grotesk  bg-[#03363D] pt-8 pb-16">
                <div className="grid grid-cols-3 space-between px-8 border-[#C7F494] pb-8 border-b mx-10">
                    <div className="font-space_grotesk text-3xl font-bold flex items-end py-3">CoDevs</div>
                    <div className="col-span-2 flex justify-end space-around items-end">
                        <div className="text-2xl font-bold py-3">Powering Up Your Skills In Team</div>
                        <div className="flex items-center">
                            <div className="px-6 py-3 ml-4 font-bold tracking-wide leading-7 bg-[#1c5955]
                             hover:bg-[#35b999] rounded-lg">
                                Get Started
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className="flex w-full gap-8 pt-7 mx-14">
                        <div>
                            @ Codevs 2024
                        </div>
                        <div>
                            Privacy Policy
                        </div>
                        <div>
                            Terms of Service
                        </div>
                    </div>
                    <div className='flex w-full gap-8 pt-7 mr-14 justify-end'>
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
