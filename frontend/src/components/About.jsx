import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const About = () => {
    return (
        <>
        <div className="bg-[url('/images/letsbuild.svg')] bg-[#1F3934] bg-center bg-cover pt-32 ">
        
            <div className="mx-10 grid grid-cols-3 justify-center items-start h-screen text-center font-space_grotesk gap-y-6">
                
                <div className='bg-[#1c5955] col-span-1 shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">Frontend Technologies</div>
                    </div>
                    <div>
                        <div className='flex gap-x-4 justify-center'>
                            <img 
                                src="icons/React.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/Angular.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/Vue.js.svg" 
                                alt="React Js" 
                                width={70}
                            />
                        </div>
                    </div>
                </div>
                <div></div>
                <div className='bg-[#1c5955] col-span-1 shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">Backend Technologies</div>
                    </div>
                    <div className="">
                        <div className='flex gap-x-4 justify-center'>
                            <img 
                                src="icons/Nest.js.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/Laravel.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/FastAPI.svg" 
                                alt="React Js" 
                                width={70}
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-[#1c5955] col-span-1 shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">UI UX Technologies</div>
                    </div>
                    <div>
                        <div className='flex gap-x-4 justify-center'>
                            <img 
                                src="icons/Figma.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/Canva.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/Adobe.svg" 
                                alt="React Js" 
                                width={70}
                            />
                        </div>
                    </div>
                </div>
                <div></div>
                <div className='bg-[#1c5955] col-span-1 shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">DevOps & Cloud Computing</div>
                    </div>
                    <div>
                        <div className='flex gap-x-4 justify-center'>
                            <img 
                                src="icons/AWS.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/Docker.svg" 
                                alt="React Js" 
                                width={70}
                            />
                            <img 
                                src="icons/NGINX.svg" 
                                alt="React Js" 
                                width={70}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <Card className='p-4 text-center' style={{
                // background: 'rgba(255, 255, 255, 0.5)',
                // backdropFilter: 'blur(10px)',
                // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                // border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className='mx-8 text-black'>
                    Alx_Devs is a platform by developers, for developers. Our mission is to help 
                    you find collaboration opportunities, gain experience, and build a strong portfolio. 
                    Whether you're an experienced professional or a newcomer, Alx_Devs provides the tools and 
                    community support you need to succeed. Join us and take the next step in your development journey!
                    </CardDescription>
                </CardContent>
            </Card> */}
        </div>
        </>

    );
}


export default About;
