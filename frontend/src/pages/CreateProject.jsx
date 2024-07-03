import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"




// defining zod schema
const schema = z.object({
    title: z.string().min(3, 'Username must be at least 3 characters long'),
    description: z.string().min(50, 'Description must be at least 50 characters long'),
    proposal: z.string().optional(),
});


const CreateProject = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Card className='m-auto mt-4 w-96 sm:w-2/3 lg:w-1/2 lg:p-12 rounded-lg'>
            <CardHeader className='text-center'>
                <CardTitle>Create a Project </CardTitle>
                <CardDescription className="text-blue-900 ">& Build with Team</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CardContent className='w-3/4 m-auto'>
                    <Input {...register('username')} type='text' placeholder='title' className='mt-1 rounded' />

                    <Textarea className='mt-4' placeholder='project description' />
                    <label className="text-sm font-light font-sm">tell us about the project, number of required team members
                        ... etc
                    </label>
                    <Input type='text' placeholder='proposal link' id='proposal' className='mt-4 rounded' />
                    <label htmlFor="proposal" className="text-sm font-light font-sm"> (optional) </label>
                </CardContent>
                <CardContent className='text-center'>
                    <Button type='submit'>Create</Button>
                </CardContent>
                {/* <div className="flex flex-col">
            <label className="text-sm font-medium">Username</label>
            <Input {...register('username')} className="mt-1 p-2 border rounded" />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Email</label>
            <Input {...register('email')} className="mt-1 p-2 border rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register('password')} className="mt-1 p-2 border rounded" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Register</Button> */}
            </form>
        </Card>
    );
}

export default CreateProject;
