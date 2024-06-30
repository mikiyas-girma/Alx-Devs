
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useParams } from "react-router-dom";

const Project = () => {
    const { id } = useParams();
    return (
        <>
        <div className="m-2">
            <Card className=''>
                <CardHeader>
                    <CardTitle>Project {id}</CardTitle>
                    <CardDescription>Project Description here</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className='m-4'>View</Button>
                </CardContent>
            </Card>
        </div>
        </>
    )
}


export default Project;
