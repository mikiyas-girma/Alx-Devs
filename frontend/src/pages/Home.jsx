
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import PathConstants from "@/routes/pathConstants";
import { useEffect } from "react";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, setCurrentProject } from "@/utils/projectSlice";
import { LoadingSpinner } from "@/components/ui/loading-spinner";



const Home = () => {

    const dispatch = useDispatch()
    const projects = useSelector((state) => state.projects.projects);
    const projectStatus = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    const loggeduser = useSelector((state) => state.user.loggeduser);
    const navigate = useNavigate();

    const handleProjectClick = (project) => {
        dispatch(setCurrentProject(project));

        navigate(PathConstants.PROJECT.replace(':id', project.id));
    }

    useEffect(() => {
        if (projectStatus == 'idle' || !projects.length) {
            dispatch(fetchProjects());
        }
    }, [projectStatus, dispatch])

    if (projectStatus == 'loading') {

        return (
            <div className="flex items-center h-96 justify-center">
                    <LoadingSpinner className='' />
            </div>
        );
    }

    if (projectStatus == 'failed') {
        return <div>{ error }</div>
    }


    return (
        <>
            <Card className="min-h-screen">
                <Card className='flex justify-around items-center'>
                    <CardHeader className='text-center text-[#03AC13]'>
                        <CardTitle>Welcome {loggeduser?.username}</CardTitle>
                        <CardDescription className='text-base tracking-wider
                                                            text-current font-serif'>
                            Explore and Apply for Projects
                        </CardDescription>
                    </CardHeader>
                    <Link to='../my_requests' >
                        <Button className='m-4 border-green-700' variant='outline'>My Requests</Button>
                    </Link>
                    <Link to='../create_project'>
                        <Button className='m-4 border-green-700' variant='outline'>Create Project</Button>
                    </Link>
                </Card>
                <h2 className="my-7 font-serif text-xl text-center">Explore Some Projects You Can Do</h2>
                <div className="m-auto md:pb-7 w-96 sm:w-2/3 gap-4 flex justify-around">
                    <Input type='text' placeholder='Filter' className='text-center mx-2' />
                    {/* <Input type='text' placeholder='Search ...' className='text-center mx-2' /> */}
                    <form className="w-full">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-5 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search Projects..."
                                className="pl-8"
                            />
                        </div>
                    </form>
                </div>
                <div className="mx-6 my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:m-2 sm:gap-2 md:gap-4 md:mx-6 md:my-4
                                lg:grid-cols-3 flex flex-wrap">
                    {projects.map((project) => (
                        <div key={project.id} className="flex-1">
                            <Card className='h-full flex flex-col'>
                                <CardHeader>
                                    <CardTitle className='text-center text-[#03C04A]'>{project.title}</CardTitle>
                                    <CardDescription className='text-base tracking-wider
                                                            text-current font-serif'>
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='mt-auto'>
                                    <Button 
                                        variant='outline'
                                        onClick={() => handleProjectClick(project)} 
                                        asChild
                                    >
                                        <Link
                                            className="m-auto text-[#0C7C59]"
                                        >
                                            View
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                    {/* <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current font-serif'>
                                    The Construction and Machinery Material Management System
                                    (CMMS) is a web-based application that helps in managing
                                     ...
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='mt-auto text-center'>
                                <Button asChild>
                                    <Link className="m-auto" to={`${PathConstants.PROJECT.replace(':id', '1')}`}>View</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div> */}


                </div>
            </Card>
        </>
    )
}


export default Home
