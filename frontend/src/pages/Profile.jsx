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

const Profile = () => {

    return (
        <>
        <Card className="container min-h-full flex flex-col justify-around px-4
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
                    <div className=" flex justify-center items-center">
                        <img className="w-32 h-32 rounded-full" src="/mikepp2.jpg" alt="" />
                    </div>
                </CardHeader>
                <div className="mx-10 flex justify-center">
                    <p>I am experienced full stack developer having skills in backend with flask
                        and Frontend using ReactJs
                    </p>
                </div>
                <CardContent className='m-auto text-left m-4 p-4 border border-green-100'>
                    <p className="p-2 border">Name: Mikiyas Girma</p>
                    <p className="p-2 border">email: mikiyasgirma1621@gmail.com</p>
                    <p className="p-2 border">Phone: +251927279885</p>
                    <p className="p-2 border">Github: https://github.com/mikiyas-girma </p>
                </CardContent>
                <CardContent>
                    <Button type='submit'>Update</Button>
                </CardContent>
            </div>
        </Card>
        </>
    );
    }


export default Profile;
