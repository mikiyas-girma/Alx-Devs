import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { getCookie } from "@/utils/utilities";
import { addProject } from "@/utils/projectSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { TechStackDropdown } from "@/components/MultiSelect";
import CreatableSelect from 'react-select/creatable';
import {customStyles} from '@/components/ui/customStyles';



// Define the Zod schema
const schema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z.string().min(50, 'Description must be at least 50 characters long'),
    proposal: z.string().optional(),
});

const CreateProject = () => {

    const roleOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'fullstack', label: 'Full stack' },
        { value: 'UI-designer', label: 'UI Designer' },
      ];

    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedRoles(selectedOptions || []);
    }

    const handleRoleClick = () => {
        const rolesJson = selectedRoles.reduce((acc, role) => {
            acc[role.value] = [role.value];
            return acc;
        }, {});
        return rolesJson;
    }


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {

        try {

            const roles = handleRoleClick();
            console.log(roles);

            dispatch(addProject({
                title: data.title,
                description: data.description,
                proposal: data.proposal,
                roles: roles,
            }));
            console.log("project created successfully")
            navigate('/home');

        } catch (error) {
            console.log("error creating the project", error)
        }


    };

    return (
        <Card className='m-auto mt-4 w-96 sm:w-2/3 lg:w-1/2 lg:p-12 rounded-lg'>
            <CardHeader className='text-center'>
                <CardTitle>Create a Project</CardTitle>
                <CardDescription className="text-blue-900">Build with Team</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CardContent className='w-3/4 m-auto'>
                    <div className="flex flex-col">
                        <Input
                            {...register('title')}
                            type='text'
                            placeholder='Title'
                            className='mt-1 rounded'
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="flex flex-col mt-4">
                        <Textarea
                            {...register('description')}
                            className='mt-1 rounded'
                            placeholder='Project description'
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        <label className="text-sm font-light">Tell us about the project, number of required team members, etc.</label>
                    </div>
                    <div className="flex flex-col mt-4">
                        <Input
                            {...register('proposal')}
                            type='text'
                            placeholder='Proposal link (optional)'
                            id='proposal'
                            className='mt-1 rounded'
                        />
                    </div>
                    <div className="mt-2 ">
                        <CreatableSelect
                            styles={customStyles}
                            isMulti
                            options={roleOptions}
                            onChange={handleChange}
                            value={selectedRoles}
                            className="font-light rounded"
                            placeholder='Select or Add roles'
                        />
                        <label className="text-sm font-light mb-2">Select or Add required roles by writing in it</label>
                    </div>
                </CardContent>
                <CardContent className='text-center'>
                    <Button type='submit'>Create</Button>
                </CardContent>
            </form>
        </Card>
    );
};

export default CreateProject;
