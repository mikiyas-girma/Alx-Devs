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
import { useState } from "react";

// Define the Zod schema
const schema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z.string().min(50, 'Description must be at least 50 characters long'),
    proposal: z.string().optional(),
});

const CreateProject = () => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data.title);
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
                            placeholder='Proposal link' 
                            id='proposal' 
                            className='mt-1 rounded' 
                        />
                        <label htmlFor="proposal" className="text-sm font-light">(optional)</label>
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
