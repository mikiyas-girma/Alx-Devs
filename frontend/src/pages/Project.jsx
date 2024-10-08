
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
import { fetchProjectById } from "@/utils/projectSlice";
import { fetchUserById } from "@/utils/userSlice";
import { useEffect, useState } from "react";
import { fetchTeam, addTeamMember, fetchMyRequests } from "@/utils/teamSlice";
import { useToast } from "@/components/ui/use-toast";
import MemberList from "@/components/MemberList";
import { LoadingSpinner } from "@/components/ui/loading-spinner";



const Project = () => {
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

    const [roles, setRoles] = useState({});
    const [selectedRole, setSelectedRole] = useState('');

    const { toast } = useToast();



    useEffect(() => {

        dispatch(fetchTeam(id));
        if (!project || project.id !== id) {
            dispatch(fetchProjectById(id));
        }

        if (project && project.creator_id) {
            setRoles(project.roles);
            dispatch(fetchUserById(project.creator_id));
        }

    }, [id, project, dispatch]);


    useEffect(() => {
        if (team_status === 'idle') {
            dispatch(fetchTeam(id));
        }
    }, [team_status, dispatch, id]);


    if (status == 'loading') {
        return (
            <div className="flex items-center h-96 justify-center">
                <LoadingSpinner className='' />
            </div>
        );
    }

    if (status == 'failed') {
        return <div>{error}</div>
    }


    if (!project) {
        return <div>Project not found</div>;
    }

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)
    }


    const handleApply = () => {

        if (!selectedRole) {
            toast({
                title: "Error",
                description: "Please select a role",
                status: "error",
                duration: 2000,
                variant: "destructive"
            }
            )
            return;
        }
        const newMember = {

            project_id: id,
            role: selectedRole,
            status: 'pending',
            user_id: loggeduser.id,
            user: loggeduser
        }


        dispatch(addTeamMember(newMember))
            .then((result) => {
                if (result.type.endsWith('fulfilled')) {
                    dispatch(fetchMyRequests())

                    toast({
                        title: "Success",
                        description: "Application submitted successfully",
                        status: "success",
                        duration: 2000,
                        variant: "success"
                    }
                    )
                } else if (result.type.endsWith('rejected')) {
                    console.log(result)
                    toast({
                        title: "Error",
                        description: "You have already applied to this project !",
                        status: "error",
                        duration: 2000,
                        variant: "destructive"
                    }
                    )
                }
            }
            )
    }


    return (
        <>
            <div className="m-4">
                <Card className='flex flex-col md:flex-row min-h-full'>
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
                            <p className='font-serif italic dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5
                                                   shadow  p-2 md:px-4 text-left m-auto mt-2'>
                                {project.application === 'open' ? 'Application Form is open' : 'Application Form is closed'}
                            </p>
                        </CardContent>

                        <div className="ml-6 p-2 ">
                            {creator &&
                                <p>Project Creator: {creator.name}</p>
                            }
                            {project.proposal &&
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
                        {(loggeduser.id !== project.creator_id && project.application !== 'closed') &&
                            <div>
                                <div className="p-4 m-auto">
                                    <h2 className="text-lg font-bold mb-2">Select a Role & Apply</h2>
                                    <div className="flex flex-col">
                                        {Object.keys(roles).map((category) => (
                                            <div key={category} className="mb-2">
                                                {roles[category].map((role, index) => (
                                                    <label key={index} className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            name="role"
                                                            value={role}
                                                            checked={selectedRole === role}
                                                            onChange={handleRoleChange}
                                                            className="form-radio"
                                                        />
                                                        <span className="ml-2">{role}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                        {(loggeduser.id !== project.creator_id && project.application !== 'closed') ?
                            <CardFooter className='justify-center'>
                                <div className="p-[3px] relative">
                                    <button
                                        className=" mt-2 bg-gradient-to-r from-green-400 via-green-500 to-green-500 
                                    hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-600 
                                    text-white font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
                                        type="submit"
                                        onClick={handleApply}
                                    >
                                        Apply Here
                                    </button>
                                </div>
                            </CardFooter>
                            : (loggeduser.id == project.creator_id) ?
                                <CardFooter className='justify-center'>
                                    <div className="p-[3px] relative">
                                        <Link
                                            to={`/project_details/${id}/`}
                                        >
                                            <button
                                                className=" mt-2 bg-gradient-to-r from-green-400 via-green-500 to-green-500 
                                    hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-600 
                                    text-white font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
                                                type="submit"
                                            >
                                                Manage Requests
                                            </button>
                                        </Link>
                                    </div>
                                </CardFooter> :
                                <CardFooter className='justify-center'>
                                    <div className="p-[3px] relative">
                                        <button
                                            className=" mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-500 
                                    hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-600 
                                    text-white font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
                                            type="submit"
                                        >
                                            Application Form Closed
                                        </button>
                                    </div>
                                </CardFooter>
                        }
                    </div>
                    <div className="flex-1 m-6 ">
                        <MemberList team={team} />
                    </div>


                </Card>
                <div className="text-center ">
                    <Link to='/home'>
                        <button
                            className=" mt-2 bg-gradient-to-r from-blue-400 via-blue-500 to-violet-500 
                                    hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-600 
                                    text-white font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
                        >
                            See Another Projects
                        </button>

                    </Link>
                </div>
            </div>
        </>
    )
}


export default Project;
