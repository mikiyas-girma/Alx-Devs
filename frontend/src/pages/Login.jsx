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



const Login = () => {
    return (
        <>
        <div className="m-auto w-96 sm:w-2/3 lg:w-1/2 lg:p-12 rounded-lg">
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>Login to Your Account</CardTitle>
                    <CardDescription className="text-blue-900 ">Lets see what's New</CardDescription>
                </CardHeader>
                <CardContent className='w-3/4 m-auto'>
                    <Input type='text' placeholder='user name' className='m-4' />
                    <Input type='password' placeholder='password' className='m-4' />
                </CardContent>
                <CardContent className='text-center'>
                    <Button type='submit'>Login</Button>
                </CardContent>
            </Card>
        </div>
        </>
    )
}


export default Login
