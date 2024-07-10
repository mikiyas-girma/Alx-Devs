import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Pencil, SquareUserRound, FilePenLine,
         BadgeInfo, Mail, Github, PhoneCall } from 'lucide-react';

import  { UpdateProfile }  from "@/components/Update-Profile"
import { useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { getCookie } from "@/utils/utilities";
import { useDispatch } from 'react-redux';
import { setUserLogin } from '@/utils/userSlice';

const Profile = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file)

        try {
            const csrfToken = getCookie('csrf_access_token');
            const uploadResponse = await axiosInstance.post(`/upload_image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-Token': csrfToken
                }
            });
            const imagePath = uploadResponse.data.img_url;
            
            const response = await axiosInstance.patch(`/users/${user.id}`, {
                image: imagePath
            },
            {
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            });
            console.log("Update successful", response.data);
            dispatch(setUserLogin(response.data));
        } catch (error) {
            console.error("Update failed", error.response.data);
        }
    }
    let path = ''
    if (user && user.image) {
        path = user?.image.split('/')[2]
    }

    return (
        <>
            <Card className="container mt-4 min-h-full flex flex-col justify-around px-4
                         sm:w-96 md:flex-row md:w-full lg:w-3/4">
                <div className="w-1/2 order-2 md:m-4 flex items-center">
                    <div className="text-left">
                        <Button className='m-2' variant='outline' asChild>
                            <Link to='../my_projects' >My Projects</Link>
                        </Button>
                        <br />
                        <Button className='m-2' variant='outline' asChild>
                            <Link>My Teams</Link>
                        </Button>
                        <br />
                        <Button className='m-2' variant='outline' asChild>
                            <Link to='#' >My Applications</Link>
                        </Button>
                    </div>
                </div>
                <div className="w-full md:order-2">
                    <CardHeader>
                        {user?.image ?
                            <div className=" flex justify-center items-center">
                                <img className="w-32 h-32 rounded-full" src={path} alt="" />
                            </div>
                            :
                            <div className=" flex justify-center items-center">
                                <SquareUserRound size={64} color="#E0A75E" />
                            </div>
                        }
                        <form>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        <FilePenLine 
                            size={24} 
                            className="text-center m-auto" 
                            color="#E72F2F"
                            onClick={handleIconClick}
                        />
                        </form>
                    </CardHeader>
                    <div className="mx-10 flex justify-center">
                        <div>{user.bio ?
                            user.bio :
                            <div>
                                <span className="text-[#E0A75E]">Add More Info about you so that other users  know you better
                                    {/* <Pencil className="text-center w-full text-[#E72F2F]" /> */}
                                </span>
                            </div>}
                                    <UpdateProfile />
                        </div>
                    </div>
                    <CardContent className='m-auto text-left m-4 p-4 border border-green-100'>
                        {/* <div className='my-2 flex justify-end' variant='outline' type='submit'>
                            <Link to='/edit_profile'>
                                <UserCog className="text-right w-full text-[#E72F2F]" />
                            </Link>
                        </div> */}

                        <div className="flex border">
                            <BadgeInfo color="#402E7A" className="my-auto ml-2" />
                            <p className="p-2">Name: {user?.name}</p>
                        </div>

                        <div className="flex border">
                           <Mail color="#402E7A" className="my-auto ml-2" /> 
                           <p className="p-2">email: {user?.email}</p>
                        </div>

                        { user.phone ?
                        <div className="flex border">
                            <PhoneCall color="#402E7A" className="my-auto ml-2" />
                            <p className="p-2">Phone: {user?.phone}</p>
                        </div>
                        : ''
                        }

                        { user.github ?
                        <div className="flex border">
                            <Github color="#402E7A" className="my-auto ml-2" />
                            <p className="p-2">Github: {user?.github}</p> 
                        </div>
                        : ''
                        }
                    </CardContent>
                    {/* <CardContent>
                        <Button variant='outline' type='submit'>
                            <Link to='/edit_profile'>
                                <UserCog className="text-center w-full text-[#E72F2F]" />
                            </Link>
                        </Button>
                    </CardContent> */}
                </div>
            </Card>
        </>
    );
}


export default Profile;
