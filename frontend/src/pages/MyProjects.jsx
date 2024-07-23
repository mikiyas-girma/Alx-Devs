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
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, filterMyProjects, setCurrentProject } from '@/utils/projectSlice';
import { fetchTeam, approveApplicant, rejectApplicant } from "@/utils/teamSlice";
import { Check, X } from 'lucide-react';
import PathConstants from '@/routes/pathConstants';


const MyProjects = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
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


    const handleViewDetails = (project) => {
        // Show a modal or a new page with the team members
        dispatch(setCurrentProject(project));
        navigate(PathConstants.PROJECT_DETAILS.replace(':id', project.id));

    }

    return (
        <div className="m-auto sm:w-full">
            <Card className='min-h-screen'>
                <div className="grid sm:grid-cols-2">
                    {myProjects.map((project, index) => (
                        <div key={index} className="p-2 focus:ring-2 focus:ring-blue-600">
                            <Card className='mb-4 flex flex-col h-full'>
                                <div className='p-2 text-[#03C04A]'>
                                    <p className='md:text-xl text-center'>{project.title}</p>
                                </div>
                                <div className='flex-1 p-2 md:px-4'>
                                    <p className='font-serif'>{project.description}</p>
                                </div>
                                <Button
                                        className='self-start text-left focus:ring-2 focus:ring-[#03C04A] '
                                        variant='outline'
                                        onClick={() => handleViewDetails(project)}
                                    >
                                        See Applicants
                                    </Button>
                            </Card>

                        </div>

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
            </Card>
        </div>
    );
};

export default MyProjects;
