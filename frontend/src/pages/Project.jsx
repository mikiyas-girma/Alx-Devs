
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
// import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




const Project = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projects.currentProject);
    const creator = useSelector((state) => state.projects.creator);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    const [roles, setRoles] = useState({});
    const [selectedRole, setSelectedRole] = useState('');

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
                            <div className="p-4">
                                <h2 className="text-lg font-bold mb-4">Select a Role & Apply</h2>
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
