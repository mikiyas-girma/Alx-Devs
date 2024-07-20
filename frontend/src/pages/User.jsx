import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { CircleUser } from 'lucide-react';
import { setUser, fetchUserByusername } from '@/utils/userSlice';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
  

const User = () => {

    const username = useParams();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(fetchUserByusername(username.username));
    }, [dispatch, username]);


    return (
        <div className="min-h-screen m-4">
            <Card 
                className='m-auto sm:w-3/4 md:w-5/6 lg:w-3/4 lg:p-12 rounded-lg grid grid-cols-1 gap-4
                           sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
            >
                <div>
                <CardHeader>
                    <div className="w-full flex justify-center items-center">
                        <CircleUser size={92} color="#0096c7" />
                    </div>
                </CardHeader>
                <CardContent className='text-center'>
                    <CardDescription>
                        <Button
                            className='m-2 w-full text-center text-white bg-[#0096c7] hover:bg-blue-500
                                       rounded-xl'
                        >
                            Message
                        </Button>
                    </CardDescription>
                </CardContent>
                </div>
                <div className="col-span-2 flex flex-col">
                <CardFooter>
                    {user?.bio &&
                    <Card className='p-4 rounded-lg'>
                        <p className="m-2 font-bold">Bio</p>
                        <CardDescription>
                            {user.bio}
                        </CardDescription>
                    </Card>
                    }
                </CardFooter>

                <div className="pl-4 md:w-3/4">
                    {user?.name &&
                    <div className="grid grid-cols-3 ml-2 p-2 ">
                        <p className="text-sm font-bold text-muted-foreground">Name</p> 
                        <p className="px-2 md:px-4 bg-[#25a244] bg-opacity-10 text-center 
                                      rounded text-[#008bf8] md:max-w-max">
                            {user.name}
                        </p>
                    </div>
                    }

                    {user?.email &&
                    <div className="grid grid-cols-3 ml-2 p-2">
                        <p className="text-sm font-bold text-muted-foreground">Email </p>
                        <p className="col-span-2 px-2 md:px-2 bg-[#25a244] bg-opacity-10 
                                      rounded text-[#008bf8] max-w-max">
                                        {user.email}
                        </p>
                    </div>
                    }

                    {user?.phone &&
                    <div className="grid grid-cols-3 ml-2 p-2 ">
                        <p className="text-sm font-bold text-muted-foreground">Phone </p>
                        <p className="col-span-2 px-2 md:px-2 bg-[#25a244] bg-opacity-10 
                                      rounded text-[#008bf8] max-w-max">
                                        {user.phone}
                        </p>
                    </div>
                    }

                    {user?.github &&
                    <div className="grid grid-cols-3 ml-2 p-2 ">
                        <p className="text-sm font-bold text-muted-foreground">Github</p>
                        <p className="col-span-2 px-2 md:px-2 bg-[#25a244] bg-opacity-10 
                                      rounded text-[#008bf8] max-w-max"
                        >
                            {user.github}
                        </p>
                    </div>
                    }

                    {user?.website &&
                    <div className="grid grid-cols-3 ml-2 p-2 ">
                        <p className="text-sm font-bold text-muted-foreground">Website </p>
                        <p className="col-span-2 px-2 md:px-2 bg-[#25a244] bg-opacity-10 
                                      rounded text-[#008bf8] max-w-max">https://mikegirma.tech</p>
                    </div>
}
                </div>
                </div>

            </Card>
        </div>
    );
};


export default User;
