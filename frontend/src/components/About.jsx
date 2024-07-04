import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const About = () => {
    return (
        <div className="p-8">
            <Card className='p-4 text-center' style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className='mx-8 text-black'>
                    Alx_Devs is a platform by developers, for developers. Our mission is to help 
                    you find collaboration opportunities, gain experience, and build a strong portfolio. 
                    Whether you're an experienced professional or a newcomer, Alx_Devs provides the tools and 
                    community support you need to succeed. Join us and take the next step in your development journey!
                    </CardDescription>
                </CardContent>
            </Card>
        </div>

    );
}


export default About;
