
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useParams, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"



const Project = () => {
    const { id } = useParams();
    return (
        <>
            <div className="m-4 bg-gray-50">
                <Card className='flex min-h-full'>
                    <div className="flex-1">
                        <CardHeader className='text-center'>
                            <CardTitle>
                                Project {id}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className=''>
                            <p className='font-serif '>
                                This is the description of project
                                The Construction and Machinery Material Management System
                                (CMMS) is a web-based application that helps in managing
                                The Construction and Machinery Material Management System
                                CMMS is a web-based application that helps in managing

                            </p>
                        </CardContent>
                        <div className="ml-6 p-2 ">
                            <p>Project Creator: Mikias Girma</p>
                            <p className="text-blue-900">Proposal Link: <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer">peeps</a></p>
                        </div>
                        <CardFooter className='justify-center'>
                            <div className="p-[3px] relative">
                                <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
                                    Apply Here
                                </button>
                            </div>
                        </CardFooter>
                    </div>
                    <div className="flex-1 m-6 ">
                        <p className="text-green-600">Already Joined Members:</p>
                        <Separator />
                        <div className="">
                            <CardContent className='text-left p-4'>
                                <p className="p-2 w-full">Name: Mikiyas Girma</p>
                                <Separator />
                                <p className="p-2 w-full">Name: Mikiyas Girma</p>
                                <Separator />

                            </CardContent>
                        </div>
                        <p className="pt-8 text-red-600">Pending Requests:</p>
                        <Separator />
                        <div className="">
                            <CardContent className='text-left p-4'>
                                <p className="p-2 w-full">Name: Mikiyas Girma</p>
                                <Separator />
                                <p className="p-2 w-full">Name: Mikiyas Girma</p>
                                <Separator />
                            </CardContent>
                        </div>
                    </div>
                </Card>
                    <div className="text-center">
                        <button className="p-2 my-4 border-4 border-blue-400 rounded-xl hover:border-blue-600">See Another Projects</button>
                    </div>
            </div>
        </>
    )
}


export default Project;
