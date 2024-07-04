import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const Features = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
            <Card className='p-4 text-center' style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(1px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>Discover Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className='text-black'>
                    Find projects that match your skills and interests. 
                    Connect with opportunities tailored just for you.
                    </CardDescription>
                </CardContent>
            </Card>
            <Card className='p-4 text-center' style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>Build Your Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className='text-black'>
                    Showcase your contributions and skills. Create a portfolio 
                    that stands out to employers and collaborators.
                    </CardDescription>
                </CardContent>
            </Card>
            <Card className='p-4 text-center' style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>Flexible Approval Process</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className='text-black'>
                    Project creators can easily approve or reject requests to join their projects,
                    ensuring the right fit for the team.
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}


export default Features
