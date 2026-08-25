import { useLocation } from "wouter";

import Navigation from "@/components/navigation";
import ParticlesBackground from "@/components/particles-background";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

const AddAdminUser = () => {
    const [, navigate] = useLocation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const role = formData.get("role");

        try{
            const response = await fetch("/api/auth/addAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role
                }),
            });

            const data = await response.json();
            if(!response.ok){
                console.log(data.message);
                return;
            }

            console.log("Login response:", data);

        } catch(error){
            console.error(error);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            <div className="relative z-10">
                <Navigation />
                <ParticlesBackground />


                <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
                    <div className="w-full max-w-lg">

                        <div className="mb-8 text-center">
                            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                                Admin Panel
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Add Admin User
                            </h1>

                            <p className="mt-3 text-sm text-muted-foreground">
                                Create an administrator account for the CSES website.
                            </p>
                        </div>

                        <Card className="border-border/50 bg-background/80 shadow-2xl backdrop-blur-md">
                            <CardHeader>
                                <CardTitle>Create Account</CardTitle>

                                <CardDescription>
                                    Enter the details of the new admin user below.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Name
                                        </Label>

                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email
                                        </Label>

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="admin@csesnitw.org"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>

                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="role">
                                            Role
                                        </Label>

                                        <Select name="role" required>
                                            <SelectTrigger className="w-full max-w-48 bg-slate-900 focus:border-green-500">
                                                 <SelectValue placeholder = "Select your Query Type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Roles</SelectLabel>
                                                    <SelectItem value="editor">Editor</SelectItem>
                                                    <SelectItem value="pr">PR</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => navigate("/adminDashboard")}
                                        >
                                            Cancel
                                        </Button>

                                        <Button type="submit">
                                            Create Admin
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddAdminUser;