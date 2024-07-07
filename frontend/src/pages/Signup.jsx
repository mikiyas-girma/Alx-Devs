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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from "@/utils/axiosInstance";
import { set } from "react-hook-form";



const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: ''
    });
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleRegistration = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axiosInstance.post('/users/', {
                ...formData,
                password
            });
            console.log("Registration successful", response.data)
        } catch (error) {
            console.log(error.response.data.msg)
            setError(error.response.data.msg);
        }
        
    }
    return (
        <>
        <div className="m-auto w-96 sm:w-2/3 lg:w-1/2 lg:p-12 rounded-lg">
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>Sign up to register</CardTitle>
                    <CardDescription className="text-blue-900 ">Explore the power of working together</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegistration} >
                <CardContent className='w-3/4 m-auto'>
                    <Input
                        className='m-4'
                        name='name'
                        type='text'
                        placeholder='name' 
                        value={formData.name}
                        onChange={handleChange}
                        required
                     />
                    <Input
                        className='m-4' 
                        name='username'
                        type='text'
                        placeholder='user name'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        className='m-4'
                        name='email'
                        type='email'
                        placeholder='email' 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        className='m-4'
                        type='password'
                        name='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input 
                        className='m-4'
                        type='password'
                        name='confirmpassword'
                        placeholder='Confirm password' 
                        value={confirmpassword}
                        onChange={handleConfirmPassword}
                        required
                    />
                    {error && <p className='text-red-500'>{error}</p> }
                </CardContent>
                <CardContent className='text-center'>
                    <Button type='submit'>Register</Button>
                </CardContent>
                <CardContent className='text-center'>
                    <p>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
                </CardContent>
                </form>
            </Card>
        </div>
        </>
    )
}


export default Signup
