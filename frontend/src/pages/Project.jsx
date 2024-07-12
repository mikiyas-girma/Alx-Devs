
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
import { useEffect, useState } from "react";
import { askToJoinProject } from "@/utils/userprojectSlice";
import { useToast } from "@/components/ui/use-toast"



const Project = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projects.currentProject);
    const userproject = useSelector((state) => state.userProjects.userProjects);
    const application_status = useSelector((state) => state.userProjects.application_status);
    const form_status = useSelector((state) => state.userProjects.form_status);
    const creator = useSelector((state) => state.projects.creator);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    const [roles, setRoles] = useState({});
    const [selectedRole, setSelectedRole] = useState('');

    const { toast } = useToast();


    useEffect(() => {
        if (!project || project.id !== id) {
            dispatch(fetchProjectById(id));
        }

        if (project && project.creator_id) {
            setRoles(project.roles);
            dispatch(fetchUserById(project.creator_id));
        }

    }, [id, project, dispatch]);


    if (status == 'loading') {
        return <div>Loading...</div>
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
                isClosable: true,
                variant: "destructive"
            }
            )
            return;
        }

        try {
            dispatch(askToJoinProject({
                project_id: project.id,
                role: selectedRole
            }));

            if (application_status === 'succeeded') {
                toast({
                    title: "Submitted Successfully",
                    description: form_status,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    variant: "success"
                }
                )
            }

            if (application_status === 'failed') {
                toast({
                    title: "Not Submitted ",
                    description: form_status,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    variant: "destructive"
                }
                )
                console.log(form_status);
            }

        } catch (error) {
            console.log(error);

        }
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
                        <div>
                            <div className="p-4 text-center">
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
