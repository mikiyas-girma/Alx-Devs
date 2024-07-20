
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectById, updateProject, setCurrentProject } from "@/utils/projectSlice";
import { useState, useEffect } from "react";
import { fetchTeam, approveApplicant, rejectApplicant } from "@/utils/teamSlice";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ConfirmableIcon from "@/components/ConfirmableIcon";
import { Link } from "react-router-dom";
import { setUser } from '@/utils/userSlice';


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

    const hasPendingRequests = team.some(member => member.status == 'pending' && member.role !== 'Owner');
    const hasApprovedRequests = team.some(member => member.status == 'approved' && member.role !== 'Owner');

    
    useEffect(() => {
        dispatch(fetchTeam(id));
        if (!project || project.id !== id) {
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
        return <div className="flex items-center h-96 justify-center">
                    <LoadingSpinner className='' />
                </div>
    }
    
    if (status == 'failed') {
        return <div>{error}</div>
    }
    
    
    if (!project) {
        return <div>
            <LoadingSpinner className='m-auto' />
            </div>;
    }
    

    const handleMemberStatusChange = (value) => {
        // console.log(e.target.value)
        // const id = e.target.value.split(',')[0]
        // const action = e.target.value.split(',')[1]
        const id = value[0];
        const action = value[1];
        if (action === 'approved') {
            dispatch(approveApplicant(id));
        }
        else if (action === 'rejected') {
            dispatch(rejectApplicant(id));
        }
    };

    const seeApplicant = (applicant) => {
        console.log(applicant)
        dispatch(setUser(applicant));
    }


    const handleCloseProject = (value) => {
        dispatch(updateProject({ id: value, application: 'closed' }));
    }

    const handleOpenProject = (value) => {
        dispatch(updateProject({ id: value, application: 'open' }));
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
                                <div>
                                    <p className='font-serif italic dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5
                                                   shadow  p-2 md:px-4 text-left m-auto lg:w-2/3'>
                                        {project.application === 'open' ? 'Application Form is open' : 'Application Form is closed'}
                                    </p>
                                </div>
                                <div className="lg:w-2/3 m-auto">
                                    {(hasApprovedRequests || hasPendingRequests) ?

                                        <div className="font-bold m-2">
                                            <p className="m-2">Applicants </p>
                                        </div>
                                        :
                                        <div className="font-bold m-2">
                                            <p className="m-2">No applicants</p>
                                        </div>
                                    }
                                    <div className="flex flex-col">
                                        {hasPendingRequests && (
                                            <>
                                                <p className="font-bold text-yellow-400 p-2">Pending requests</p>
                                                {team.map((member, index) => (
                                                    <div key={index} className='flex'>
                                                        {
                                                            (member.status == 'pending' && member.role !== 'Owner') &&
                                                            <div className="w-full">
                                                                <div className="flex justify-between ">
                                                                    <div className="flex">
                                                                    <Link
                                                                        onClick={() => seeApplicant(member)}
                                                                        to={`/user/${member.user.username}`}
                                                                    >
                                                                    <Info className="text-[#3a86ff] hover:text-[#0077b6] mx-2" />
                                                                    </Link>
                                                                    <p className="text-left">{member.user.name}</p>
                                                                    </div>
                                                                    <p className=" text-left">{member.role}</p>
                                                                    <p className=" text-yellow-500 text-left">{member.status}</p>
                                                                    <div className="flex">
                                                                        <div className='m-0'>
                                                                            <ConfirmableIcon
                                                                                iconType={'check'}
                                                                                message='Are you sure you want to approve this applicant?'
                                                                                onConfirm={handleMemberStatusChange}
                                                                                value={[member.id, 'approved']}
                                                                            />
                                                                        </div>
                                                                        <div className="m-0">
                                                                            <ConfirmableIcon
                                                                            iconType={'x'}
                                                                            message='Are you sure you want to reject this applicant?
                                                                                     this will remove the applicant from the team permanently'
                                                                            onConfirm={handleMemberStatusChange}
                                                                            value={[member.id, 'rejected']}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Separator className='mb-2' />
                                                            </div>
                                                        }
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {hasApprovedRequests && (
                                            <>
                                                <p className="my-2 font-bold text-green-400">Approved requests</p>
                                                {team.map((member, index) => (
                                                    <div key={index} className='flex'>
                                                        {
                                                            (member.status == 'approved' && member.role !== 'Owner') &&
                                                            <div className="w-full">
                                                                <div className="flex justify-between">
                                                                    <div className="flex">
                                                                    <Link
                                                                        to={`/user/${member.user.username}`}
                                                                    >
                                                                    <Info className="mx-2 text-[#3a86ff] hover:text-[#0077b6]" />
                                                                    </Link>
                                                                    <p className="text-left">{member.user.name}</p>
                                                                    </div>
                                                                    <p className="text-left">{member.role}</p>
                                                                    <p className="text-green-400 text-left">{member.status}</p>

                                                                    <div>
                                                                        <ConfirmableIcon
                                                                            iconType={'x'}
                                                                            message='Are you sure you want to remove this member from the team?
                                                                                     this will remove the member from the team permanently'
                                                                            className=" mx-2 text-red-500 hover:text-red-700"
                                                                            onConfirm={handleMemberStatusChange}
                                                                            value={[member.id, 'rejected']}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <Separator />
                                                            </div>
                                                        }
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                            <div className='m-2 p-4'>
                                { project.application === 'open' ?
                                
                                <div>
                                    <ConfirmableIcon
                                        iconType={'button'}
                                        message='Are you sure you want to close this project?
                                                 this will close the application form'
                                        value={project.id}
                                        onConfirm={handleCloseProject}
                                    />
                                </div> :
                                <div>
                                    <Button
                                        className='bg-green-500 dark:bg-slate-800 dark:text-white'
                                        onClick={() => handleOpenProject(project.id)}
                                    >
                                        Open Project
                                    </Button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}


export default ProjectDetails;
