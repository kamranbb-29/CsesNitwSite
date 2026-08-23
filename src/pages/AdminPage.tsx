import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ParticlesBackground from "@/components/particles-background";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      setSuccess("Login successful!");

      console.log("Login response:", data);
    } catch (error) {
      console.error(error);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <ParticlesBackground />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            CSES ADMIN
          </h1>

          <p className="text-slate-400">
            Sign in to access the admin panel
          </p>
        </div>

        <Card className="cyberpunk-glow-card relative">
          <div className="absolute inset-0 cyberpunk-scan-lines" />

          <CardContent className="p-6 relative z-10">
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-slate-300 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="your@email.com"
                  required
                  className="w-full bg-black/30 border border-green-400/30 rounded-md px-4 py-2 text-slate-200 placeholder:text-slate-500 outline-none focus:border-green-400 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-slate-300 mb-2"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/30 border border-green-400/30 rounded-md px-4 py-2 text-slate-200 placeholder:text-slate-500 outline-none focus:border-green-400 transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-green-400">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 rounded-md border border-green-400 text-green-400 hover:bg-green-400/10 transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}