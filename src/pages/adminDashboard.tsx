
import ParticlesBackground from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { useLocation } from "wouter";

export default function AdminDashboard() {

    const[, navigate] = useLocation();

    const handleLogout = async () => {
    try{
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = response.json();

        if (!response.ok) {
            console.log("Logout Failed!");
            return;
        }

        navigate("/");
    }catch(error){
        console.error(error);
    }
};

    return (
        <div className="min-h-screen">
            <Navigation />
            <ParticlesBackground />

            <div className="pt-24 pb-16 px-4 flex items-center justify-center">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    <a href="/addAdmin">
                        <Card className="cyberpunk-glow-card hover-lift relative h-full" >
                            <div className="absolute inset-0 cyberpunk-scan-lines"></div>
                            <CardContent className="p-6 relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                {/* <event.icon className="text-green-500 h-7 w-7 flex-shrink-0" /> */}
                                <span className="text-xs font-mono text-green-400/70 bg-green-400/10 px-2 py-0.5 rounded">
                                Add
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Add Admins
                            </h3>
                            <p className="text-sm text-slate-300 flex-1">
                                Add more CSES members as admins to the website
                            </p>
                            </CardContent>
                        </Card>
                    </a>
                    
                    <Card className="cyberpunk-glow-card hover-lift relative h-full">
                        <div className="absolute inset-0 cyberpunk-scan-lines"></div>
                        <CardContent className="p-6 relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            {/* <event.icon className="text-green-500 h-7 w-7 flex-shrink-0" /> */}
                            <span className="text-xs font-mono text-green-400/70 bg-green-400/10 px-2 py-0.5 rounded">
                            Add
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Add Editorials
                        </h3>
                        <p className="text-sm text-slate-300 flex-1">
                            Add Blog Posts / Editorials onto the website
                        </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex justify-center ">
                <Button variant = "outline" className=" w-fu text-white transition-all hover:scale-125 hover:bg-green-700 hover:text-white" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    );
}