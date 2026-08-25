import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ParticlesBackground from "@/components/particles-background";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

type ImageData = {
  _id: string;
  event: string;
  mediaType: string;
  url: string;
  uploadedAt?: string;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          setCurrentUser(null);
          return;
        }

        const data = await response.json();
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Failed to get current user", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const canManageGallery =
    currentUser !== null && ["pr"].includes(currentUser.role);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/image");
        const data = await response.json();

        setImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file || !event) return;

    const formData = new FormData();

    formData.append("event", event);
    formData.append("mediaType", "image");
    formData.append("image", file);

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const newImage = await response.json();

        setImages((prevImages) => [...prevImages, newImage]);
        setEvent("");
        setFile(null);
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/image/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setImages((prevImages) =>
          prevImages.filter((image) => image._id !== id),
        );
      }
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  return (
    <div className="min-h-screen">
      <ParticlesBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Gallery</h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Moments from CSES events, workshops, competitions and community
              activities.
            </p>
          </motion.div>

          {canManageGallery && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-green-400 font-mono mb-6 flex items-center gap-2">
                <span className="text-slate-600">&gt;</span> Upload Media
              </h2>

              <Card className="cyberpunk-glow-card relative">
                <div className="absolute inset-0 cyberpunk-scan-lines"></div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={event}
                      placeholder="Event name"
                      onChange={(e) => setEvent(e.target.value)}
                      className="flex-1 bg-black/30 border border-green-400/30 rounded-md px-4 py-2 text-slate-200 placeholder:text-slate-500 outline-none focus:border-green-400 transition-colors"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];

                        if (selectedFile) {
                          setFile(selectedFile);
                        }
                      }}
                      className="flex-1 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20"
                    />

                    <button
                      onClick={handleUpload}
                      className="px-6 py-2 rounded-md border border-green-400 text-green-400 hover:bg-green-400/10 transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-green-400 font-mono mb-6 flex items-center gap-2">
              <span className="text-slate-600">&gt;</span> Event Gallery
            </h2>

            {loading ? (
              <p className="text-slate-400">Loading gallery...</p>
            ) : images.length === 0 ? (
              <p className="text-slate-500">No images uploaded yet.</p>
            ) : (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {images.map((image) => (
                  <motion.div key={image._id} variants={itemVariants}>
                    <Card className="cyberpunk-glow-card hover-lift relative overflow-hidden h-full">
                      <div className="absolute inset-0 cyberpunk-scan-lines"></div>

                      <CardContent className="p-0 relative z-10">
                        <img
                          src={`http://localhost:5000/${image.url}`}
                          alt={image.event}
                          className="w-full h-64 object-cover"
                        />

                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-3">
                            {image.event}
                          </h3>

                          {canManageGallery && (
                            <button
                              onClick={() => handleDelete(image._id)}
                              className="text-sm text-red-400 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
