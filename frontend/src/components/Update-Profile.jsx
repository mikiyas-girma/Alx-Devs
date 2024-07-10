import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/utils/axiosInstance";
import { getCookie } from "@/utils/utilities";
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogin } from '@/utils/userSlice';

export function UpdateProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
    const [bio, setBio] = useState(user.bio || '');
    const [name, setName] = useState(user.name || '');
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [github, setGithub] = useState(user.github || '');
    const [error, setError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = getCookie('csrf_access_token');
            const response = await axiosInstance.patch(`/users/${user.id}`, {
                bio,
                name,
                username,
                email,
                phone,
                github
            },
            {
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            }
        );
            console.log("Update successful", response.data);

            dispatch(setUserLogin(response.data));
            setError('');
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Update failed", error.response.data);
            setError(error.response.data.msg);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
            <DialogTrigger asChild>
                <Pencil className="text-center w-full text-[#E72F2F]" />
            </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
            <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="w-full grid grid-cols-4 justify-left items-center gap-4">
                            <Label htmlFor="about" className="text-right">
                                About
                            </Label>
                            <Textarea
                                id='about'
                                className='col-span-3 w-full h-22 resize-none'
                                placeholder='Add More Info about you so that other users know you better'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 justify-start items-start gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        {error && <p className='text-center text-red-500'>{error}</p> }
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="github" className="text-right">
                                Github profile
                            </Label>
                            <Input
                                id="github"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
            </form>
                </DialogContent>
        </Dialog>
    );
}
