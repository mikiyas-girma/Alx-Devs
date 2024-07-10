import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, UserCog } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"


export function UpdateProfile() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil className="text-center w-full text-[#E72F2F]" />
            </DialogTrigger>
            <form>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="w-full flex flex-col m-auto justify-center">
                        <Label htmlFor="about" className="text-center mb-2">
                            About You
                        </Label>
                        <Textarea
                            id='about'
                            className='w-full h-22 resize-none'
                            placeholder='Add More Info about you so that other users know you better'
                        />
                        {/* {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>} */}
                        
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Abebe Kebede"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="abekebe"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            defaultValue="abekebe@gmail.com"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="username"
                            defaultValue="+251927279885"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Github profile
                        </Label>
                        <Input
                            id="username"
                            defaultValue="https://github.com/abekebe2"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
            </form>
        </Dialog>
    )
}
