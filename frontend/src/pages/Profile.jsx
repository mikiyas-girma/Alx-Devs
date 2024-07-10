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
import { Pencil, SquareUserRound, UserCog,
         BadgeInfo, Mail, Github, PhoneCall } from 'lucide-react';

import  { UpdateProfile }  from "@/components/Update-Profile"

const Profile = () => {

    const user = useSelector((state) => state.user.user);

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
                        {user.image ?
                            <div className=" flex justify-center items-center">
                                <img className="w-32 h-32 rounded-full" src="mikepp2.jpg" alt="" />
                            </div>
                            :
                            <div className=" flex justify-center items-center">
                                <SquareUserRound size={64} color="#E0A75E" />
                            </div>
                        }
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
