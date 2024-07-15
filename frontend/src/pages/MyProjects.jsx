import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, filterMyProjects } from '@/utils/projectSlice';
import { fetchTeam, addTeamMember, approveApplicant } from "@/utils/teamSlice";


const MyProjects = () => {


    const dispatch = useDispatch();
    const loggeduser = useSelector((state) => state.user.loggeduser);
    const projects = useSelector((state) => state.projects.projects);
    const myProjects = useSelector((state) => state.projects.myProjects);
    const team = useSelector((state) => state.team.team);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [status, dispatch]);

    useEffect(() => {
        // Fetch the projects from the backend
        const userId = loggeduser?.id;
        if (projects.length > 0 && userId) {
            dispatch(filterMyProjects(userId));
        }
    }
        , [projects, loggeduser?.id, dispatch]);

    const handleMemberStatusChange = (e) => {
        console.log(e.target.value)
        const id = e.target.value.split(',')[0]
        console.log(id)
        dispatch(approveApplicant(id));
    };

    const seeApplicants = (e) => {
        // Show a modal or a new page with the team members
        const project_id = e.target.value;
        dispatch(fetchTeam(project_id));

    }


    return (
        <div className="m-auto w-96 sm:w-full">
            <Card className='min-h-96 flex flex-col sm:flex-row sm:m-4'>
                <div className="flex-1">
                    {myProjects.map((project, index) => (
                        <Card key={index} className="m-4 p-2">
                            <div>
                                <p>{project.title}</p>
                            </div>
                            <div>
                                <p className='font-serif'>{project.description}</p>
                            </div>
                            <Button
                                className='mt-2'
                                variant='outline'
                                value={project.id}
                                onClick={seeApplicants}
                            >
                                See Team Members
                            </Button>
                        </Card>
                    ))}
                    {
                        myProjects.length === 0 &&
                        <div className='flex flex-col items-center justify-center h-full'>
                            <p className="font-serif font-light tracking-wider">You have not created any projects yet</p>
                            <Button
                                variant='outline'
                                className='m-2'
                            >
                                <Link to='/create_project'>Create Project</Link>
                            </Button>
                        </div>
                    }
                </div>
                <div className="flex-1">
                    <p className='text-center w-full font-bold'>Team Members</p>
                    <Card className="m-4 p-2">
                        <CardContent className='text-left p-4'>
                            {team.map((member, index) => (
                                <div key={index}>
                                    {(member.status == 'approved' && member.role !== 'Owner') &&
                                        <div className="">
                                            <div className='flex'>
                                            <p className="p-2 m-2 w-full">{member.user.name}</p>
                                            <p className="p-2 m-2 w-full">{member.role}</p>
                                            <p className="p-2 m-2 text-green-500 w-full">{member.status}</p>
                                            
                                            <Button 
                                                className="px-2 m-2 bg-red-500 w-full"
                                                value={[member.id, 'rejected']}
                                                onClick={handleMemberStatusChange}
                                            >
                                                Reject
                                            </Button>
                                            </div>
                                            <Separator />
                                        </div>
                                    }
                                    {(member.status == 'pending' || member.status == 'rejected' && member.role !== 'Owner') &&
                                        <div className="">
                                            <div className='flex'>
                                            <p className="p-2 m-2 w-full">{member.user.name}</p>
                                            <p className="p-2 m-2 w-full">{member.role}</p>
                                            <p className="p-2 m-2 text-yellow-400 w-full">{member.status}</p>
                                            
                                            <Button 
                                                className="px-2 m-2 w-full"
                                                value={[member.id, 'approved']}
                                                onClick={handleMemberStatusChange}
                                            >
                                                Approve
                                            </Button>
                                            </div>
                                            <Separator />
                                        </div>
                                    }
                                    {
                                        team.length <= 1 &&
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <p className="font-serif font-light tracking-wider">No applicants yet</p>
                                        </div>
                                    }
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default MyProjects;
