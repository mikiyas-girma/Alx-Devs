import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmableIcon from "@/components/ConfirmableIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyRequests, leaveTeam } from "@/utils/teamSlice";


const MyRequests = () => {

    const dispatch = useDispatch();
    const my_requests = useSelector((state) => state.team.my_requests);
    const team_status = useSelector((state) => state.team.team_status);

    useEffect(() => {
        if (team_status === 'idle') {
            dispatch(fetchMyRequests());
        }
    }
        , [dispatch, team_status]);


    const handleRevokeRequest = (value) => {
        dispatch(leaveTeam(value));
        console.log('revoke request for project id:', value);
    }


    return (
        <div className="min-h-screen m-4">
            <Card className='m-auto sm:w-3/4 md:w-5/6 lg:w-3/4 lg:p-12'>
                <div className="flex">
                    <div className="w-full">

                        <CardHeader>
                            <CardDescription>
                                Here you can view the status of your requests and you can cancel them also
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {my_requests.length > 0 ?
                                <p className="text-left">You have made {my_requests.length} requests</p>
                                :
                                <p className="font-italic">You haven't made a request to join a team yet</p>
                            }
                        </CardContent>

                        {my_requests.length > 0 && (
                            <>
                                {my_requests.map((myrequest, index) => (
                                    <div key={index}>
                                    <div className="grid grid-cols-5">

                                        <div className="flex col-span-2 mr-2">
                                            <Link
                                                to={`#`}
                                            >
                                                <Info className="mx-2 text-[#3a86ff] hover:text-[#0077b6]" />
                                            </Link>
                                            <p className="text-left w-32 sm:w-48 md:w-60">{myrequest.project.title}</p>
                                        </div>
                                        <p className="text-left">{myrequest.role}</p>
                                        {myrequest.status == 'approved' ?
                                        <p className="text-green-400 text-left">{myrequest.status}</p>
                                            :
                                        <p className="text-yellow-400 text-left">{myrequest.status}</p>
                                        }

                                        <div className="flex items-center">
                                            <ConfirmableIcon
                                                iconType={'x'}
                                                message='Are you sure you want to revoke this request?
                                                         this removes you from the team permanently'
                                                onConfirm={handleRevokeRequest}
                                                value={myrequest.project.id}
                                            />
                                        </div>
                                    </div>
                                <Separator className='my-2' />
                                </div>
                                ))}

                            </>
                        )}

                    </div>
                </div>
            </Card>
        </div>
    );

};


export default MyRequests;
