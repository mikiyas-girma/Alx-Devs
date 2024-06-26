
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

const Home = () => {
    return (
        <>
            <Card className="min-h-screen">
                <Card className='flex justify-around border-green-50'>
                    <Button className='m-4 border-green-700' variant='outline'>My Applications</Button>
                    <Button className='m-4 border-green-700' variant='outline'>Create Project</Button>
                </Card>
                <h2 className="my-7 font-serif text-xl">Explore Some Projects You Can Do</h2>
                <div className="m-auto w-96 sm:w-2/3 gap-4 flex justify-around">
                    <Input type='text' placeholder='Filter' className='text-center mx-2' />
                    <Input type='text' placeholder='Search ...' className='text-center mx-2' />
                </div>
                <div className="mx-6 my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:m-2 sm:gap-2 md:gap-4 md:mx-6 md:my-4
                                lg:grid-cols-3 flex flex-wrap">
                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle>CMMS </CardTitle>
                                <CardDescription>
                                    The Construction and Machinery Material Management System
                                    (CMMS) is a web-based application that helps in managing
                                     ...
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='mt-auto'>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle>Project 2</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent className='mt-auto'>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1">
                        <Card className='h-full flex flex-col'>
                            <CardHeader>
                                <CardTitle>Project 3</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent className='mt-auto'>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project 4</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project 5</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project 6</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project 7</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project 8</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project 9</CardTitle>
                                <CardDescription>Project Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='m-4'>View</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Card>
        </>
    )
}


export default Home
