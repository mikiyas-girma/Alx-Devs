
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectById } from "@/utils/projectSlice";
import { useState, useEffect } from "react";
import { fetchTeam, approveApplicant, rejectApplicant } from "@/utils/teamSlice";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


const ProjectDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const loggeduser = useSelector((state) => state.user.loggeduser);
    const project = useSelector((state) => state.projects.currentProject);
    const team = useSelector((state) => state.team.team);
    const team_status = useSelector((state) => state.team.team_status);
    const team_error = useSelector((state) => state.team.team_error);
    const creator = useSelector((state) => state.projects.creator);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);


    useEffect(() => {
        dispatch(fetchTeam(id));
        if (!project || project.id !== id) {
            console.log("heyy")
            dispatch(fetchProjectById(id));
        }
    }
        , [id, project, dispatch]);

    useEffect(() => {
        if (team_status === 'idle') {
            dispatch(fetchTeam(id));
        }
    }, [team_status, dispatch, id]);



    if (status == 'loading') {
        return <div>Loading...</div>
    }

    if (status == 'failed') {
        return <div>{error}</div>
    }


    if (!project) {
        return <div>
            <LoadingSpinner className='m-auto' />
        </div>;
    }


    return (
        <>
            <div className="sm:w-full ">
                <Card className='min-h-screen m-auto text-center'>
                    <div className=" ">
                        <div className="m-auto sm:w-3/4 lg:w-3/4 lg:p-12 rounded-lg">
                            <Card className='m-2 p-4 md:p-2'>
                                <div className='p-2 text-[#03C04A] '>
                                    <p className='md:text-xl text-center'>{project.title}</p>
                                </div>
                                <div>
                                    <p className='font-serif p-2 md:px-4 text-left m-auto lg:w-2/3'>
                                        {project.description}
                                    </p>
                                </div>
                                <div className="lg:w-2/3 m-auto">
                                    <div className="font-bold m-2">
                                        <p>Applicants </p>
                                    </div>
                                    <div className="flex flex-col">
                                        {team.map((member, index) => (
                                            <div key={index} className='flex mb-2'>
                                                {(member.status == 'pending' && member.role !== 'Owner') &&
                                                    <div className="w-full">
                                                        <div className="flex">
                                                        <p className=" w-full text-left">{member.user.name}</p>
                                                        <p className=" w-full text-left">{member.role}</p>
                                                        <p className=" text-yellow-500 w-full text-left">{member.status}</p>
                                                        <div className=''>
                                                            <Check
                                                                size={24}
                                                                className="mx-2 text-green-500 hover:text-green-700"
                                                                onClick={() => console.log('approved')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <X
                                                                size={24}
                                                                className=" mx-2 text-red-500 hover:text-red-700"
                                                                onClick={() => console.log('rejected')}
                                                            />
                                                        </div>
                                                        </div>
                                                        <Separator />
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}


export default ProjectDetails;
