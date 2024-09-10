
const Features = () => {
    return (
        <>
            <div className="bg-[url('/images/coworking1.svg')] hidden md:block bg-[#1F3934] bg-cover bg-center h-screen 
             ">
            </div>
            <div className="bg-[#1F3934]">
            <div className="flex flex-col md:flex-row text-center mx-2 md:mx-8 py-8 font-space_grotesk gap-6">
                <div className='flex-1 shadow-lg rounded-xl p-6 bg-[#1c5955]'>
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
                <div className='flex-1 rounded-xl bg-[#1c5955]'>
                    <div>
                        <div className="text-center text-2xl py-4 text-[#C7F494] font-bold">Build Your Portfolio</div>
                    </div>
                    <div>
                        <div className='shadow-lg py-4 md:p-6 '>


                            Showcase your contributions and skills. Create a portfolio
                            that stands out to employers and collaborators.
                        </div>
                    </div>
                </div>
                <div className='flex-1 shadow-lg rounded-xl p-6 bg-[#1c5955]'>
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
            </div>

        </>
    )
}


export default Features
