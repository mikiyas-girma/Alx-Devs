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
import { fetchTeam, addTeamMember, approveApplicant, rejectApplicant } from "@/utils/teamSlice";
import { Check, X } from 'lucide-react';


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
        const action = e.target.value.split(',')[1]
        if (action === 'approved') {
            dispatch(approveApplicant(id));
        }
        else if (action === 'rejected') {
            dispatch(rejectApplicant(id));
        }
    };

    const seeApplicants = (e) => {
        // Show a modal or a new page with the team members
        const project_id = e.target.value;
        dispatch(fetchTeam(project_id));

    }


    return (
        <div className="m-auto sm:w-full">
            <Card className='min-h-96 flex'>
                <div className="flex-1">
                    {myProjects.map((project, index) => (
                        <Card key={index} className="flex flex-col md:flex-row m-4 p-2 focus:ring-2 focus:ring-blue-600">
                            <Card className='flex-1 mb-4'>
                                <div className='p-2 text-[#03C04A]'>
                                    <p>{project.title}</p>
                                </div>
                                <div>
                                    <p className='font-serif p-2'>{project.description}</p>
                                </div>
                                <Button
                                    className='m-2 focus:ring-2 focus:ring-[#03C04A] '
                                    variant='outline'
                                    value={project.id}
                                    onClick={seeApplicants}
                                >
                                    See Applicants
                                </Button>
                            </Card>

                            <div className="flex-1 m-2">
                                {team.map((member, index) => (
                                    <div key={index} className='flex mb-2'>
                                        <p className=" w-full text-left">{member.user.name}</p>
                                        <p className=" w-full">{member.role}</p>
                                        <p className=" text-yellow-500 w-full">{member.status}</p>
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
                                ))}
                                <div className='flex mb-2'>
                                    <p className=" w-full text-left">Yoseph Girma</p>
                                    <p className=" w-full">UI-designer</p>
                                    <p className=" text-yellow-500 w-full">Pending</p>
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
                                <div className='flex mb-2'>
                                    <p className=" w-full text-left">Yoseph Girma</p>
                                    <p className=" w-full">UI-designer</p>
                                    <p className=" text-yellow-500 w-full">Pending</p>
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
                {/* <div className="flex-1">
                    <p className='text-center w-full font-bold p-2'>Applicants</p>
                    <Card className="mb-4 p-2">
                        <CardContent className='text-left p-4'>
                            <div className="">
                                <div className='flex mb-2'>
                                    <p className=" w-full text-left">Yoseph Girma</p>
                                    <p className=" w-full">UI-designer</p>
                                    <p className=" text-green-500 w-full">Approved</p>
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
                </div> */}
            </Card>
        </div>
    );
};

export default MyProjects;
