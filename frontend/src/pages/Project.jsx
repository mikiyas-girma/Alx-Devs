
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
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectById, fetchUserById } from "@/utils/projectSlice";
import { useEffect } from "react";



const Project = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projects.currentProject);
    const creator = useSelector((state) => state.projects.creator);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);


    useEffect(() => {
        // Fetch project by ID if not loaded or if the ID has changed
        if (!project || project.id !== id) {
            dispatch(fetchProjectById(id))
                .unwrap()
                .then((fetchedProject) => {
                    // Once the project is fetched, check if we need to fetch the creator
                    if (fetchedProject && fetchedProject.creator_id && (!creator || creator.id !== fetchedProject.creator_id)) {
                        dispatch(fetchUserById(fetchedProject.creator_id));
                    }
                })
                .catch(error => console.error("Failed to fetch project or creator:", error));
        }
    }, [id, project, creator, dispatch]);


    if (status == 'loading') {
        return <div>Loading...</div>
    }

    if (status == 'failed') {
        return <div>{ error }</div>
    }

    if (!project) {
        return <div>Project not found</div>;
    }
    

    return (
        <>
            <div className="m-4">
                <Card className='flex min-h-full'>
                    <div className="flex-1">
                        <CardHeader className='text-center'>
                            <CardTitle>
                                {project.title}
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className=''>
                            <p className='font-serif '>
                                {project.description}
                            </p>
                        </CardContent>

                        <div className="ml-6 p-2 ">
                            {creator &&
                                <p>Project Creator: {creator.name}</p>
                            }   
                            { project.proposal &&
                                <p className="">Proposal Link:  
                                    <a 
                                        className="text-blue-900" 
                                        href={project.proposal} 
                                        target="_blank" rel="noopener noreferrer"
                                    > 
                                    <span> </span> {project.proposal}
                                    </a>
                                </p>
                            }
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
                        <Link to='/home'>
                            <button className="p-2 my-4 border-4">See Another Projects</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}


export default Project;
