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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 bg-gradient-to-l from-cyan-500 via-violet-300 to-blue-300">
            <Card className='p-4' style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(1px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatibus.
                    </CardDescription>
                </CardContent>
            </Card>
            <Card className='p-4' style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatibus.
                    </CardDescription>
                </CardContent>
            </Card>
            <Card className='p-4' style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatibus.
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}


export default Features
