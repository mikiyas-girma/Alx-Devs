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
        
            <div className="grid grid-cols-3 justify-center items-start h-screen text-center font-space_grotesk gap-6">
                
                <div className='col-span-1 shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">Discover Projects</div>
                    </div>
                    <div>
                        <div className=''>
                            Find projects that match your skills and interests.
                            Connect with opportunities tailored just for you.

                        </div>
                    </div>
                </div>
                <div></div>
                <div className='shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">Build Your Portfolio</div>
                    </div>
                    <div>
                        <div className=''>


                            Showcase your contributions and skills. Create a portfolio
                            that stands out to employers and collaborators.
                        </div>
                    </div>
                </div>
                <div className='shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold font-space_grotesk">
                            Flexible Approval Process
                        </div>
                    </div>
                    <div>
                        <div className=' font-space_grotesk'>

                            Project creators can easily approve or reject requests to join their projects,
                            ensuring the right fit for the team.
                        </div>
                    </div>
                </div>
                <div></div>
                <div className='shadow-lg rounded-lg p-6'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold font-space_grotesk">
                            Flexible Approval Process
                        </div>
                    </div>
                    <div>
                        <div className=' font-space_grotesk'>

                            Project creators can easily approve or reject requests to join their projects,
                            ensuring the right fit for the team.
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
