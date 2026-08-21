import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [, navigate] = useLocation();

  useEffect(() => {
    const text = "cses";
    let i = 0;
    const timer = setInterval(() => {
      setTyped((t) => (i < text.length ? t + text[i++] : t));
      if (i >= text.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.substring(2); // remove '/#'

    // Navigate to home page if not already there
    if (window.location.pathname !== "/") {
      navigate("/");
      // Wait for the home page to render, then scroll
      setTimeout(() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Adjust delay if needed
    } else {
      // Already on the home page, just scroll
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home", type: "route" as const },
    { href: "/about", label: "About", type: "route" as const },
    { href: "/team", label: "Team", type: "route" as const },
    { href: "/events", label: "Events", type: "route" as const },
    { href: "/#projects-showcase", label: "Projects", type: "anchor" as const },
    { href: "/#contact", label: "Contact", type: "anchor" as const },
    { href: "/gallery", label: "Gallery", type: "route" as const },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2" data-testid="logo">
            <span className="font-mono text-green-400 lowercase text-lg md:text-xl">
              {typed}
              <span className="typing-cursor" aria-hidden="true"></span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.type === "route" ? (
                <Link key={item.href} href={item.href}>
                  <a
                    className="font-mono text-green-400 hover:text-white-400 transition-colors"
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-mono text-green-400 hover:text-green-400 transition-colors"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) =>
                item.type === "route" ? (
                  <Link key={item.href} href={item.href}>
                    <a
                      className="block w-full text-left px-3 py-2 hover:text-green-400 transition-colors"
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block w-full text-left px-3 py-2 hover:text-green-400 transition-colors"
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
