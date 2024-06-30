
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import PathConstants from "@/routes/pathConstants"

const Home = () => {
    return (
        <>
            <Card className="min-h-screen">
                <Card className='flex justify-around border-green-50'>
                    <Button className='m-4 border-green-700' variant='outline'>My Applications</Button>
                    <Button className='m-4 border-green-700' variant='outline'>Create Project</Button>
                </Card>
                <h2 className="my-7 font-serif text-xl text-center">Explore Some Projects You Can Do</h2>
                <div className="m-auto w-96 sm:w-2/3 gap-4 flex justify-around">
                    <Input type='text' placeholder='Filter' className='text-center mx-2' />
                    <Input type='text' placeholder='Search ...' className='text-center mx-2' />
                </div>
                <div className="mx-6 my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:m-2 sm:gap-2 md:gap-4 md:mx-6 md:my-4
                                lg:grid-cols-3 flex flex-wrap">
                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>

                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle className='text-center'>CMMS </CardTitle>
                                <CardDescription className='text-base tracking-wider
                                                            text-current'>
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
                    </div>


                </div>
            </Card>
        </>
    )
}


export default Home
