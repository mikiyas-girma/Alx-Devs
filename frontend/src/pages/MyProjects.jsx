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

const MyProjects = () => {
    const [projects, setProjects] = useState([
        {
            title: "Project Title",
            description: "This is the description of project. The Construction and Machinery Material Management System (CMMS) is a web-based application."
        },
        {
            title: "Project Title",
            description: "This is the description of project. The Construction and Machinery Material Management System (CMMS) is a web-based application."
        },
        {
            title: "Project Title",
            description: "This is the description of project. The Construction and Machinery Material Management System (CMMS) is a web-based application."
        },
    ]);

    const [teamMembers, setTeamMembers] = useState([
        {
            name: "Mikiyas Girma",
            status: "pending" // This can be 'approved', 'rejected', or 'pending'
        },
    ]);

    const handleMemberStatusChange = (index, status) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index].status = status;
        setTeamMembers(updatedMembers);
    };

    return (
        <div className="m-auto w-96 sm:w-full">
            <Card className='min-h-96 flex flex-col sm:flex-row sm:m-4'>
                <div className="flex-1">
                    {projects.map((project, index) => (
                        <Card key={index} className="m-4 p-2">
                            <div>
                                <p>{project.title}</p>
                            </div>
                            <div>
                                <p className='font-serif'>{project.description}</p>
                            </div>
                            <Button className='mt-2' variant='outline'> See Team Members </Button>
                        </Card>
                    ))}
                </div>
                <div className="flex-1">
                    <p className='text-center w-full font-bold'>Team Members</p>
                    <Card className="m-4 p-2">
                        <CardContent className='text-left p-4'>
                            {teamMembers.map((member, index) => (
                                <div key={index}>
                                    <div className="flex">
                                        <p className="p-2 m-2 w-full">{member.name}</p>
                                        <Button className="px-2 m-2" onClick={() => handleMemberStatusChange(index, 'approved')}>Approve</Button>
                                        <Button className="px-2 m-2 bg-red-500" onClick={() => handleMemberStatusChange(index, 'rejected')}>Reject</Button>
                                    </div>
                                    <Separator />
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
