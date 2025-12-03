import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNavbar = !isHomePage || isScrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          showNavbar
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm translate-y-0"
            : "-translate-y-full"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Coffee className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Brew Buddy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/shops"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Discover Cafes
            </Link>
            <Link to="/shops">
              <Button className="gap-2">
                <Coffee className="h-4 w-4" />
                Start Order
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border p-4 space-y-4">
            <Link
              to="/shops"
              className="block text-foreground py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discover Cafes
            </Link>
            <Link to="/shops" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full gap-2">
                <Coffee className="h-4 w-4" />
                Start Order
              </Button>
            </Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full gap-2 mt-2">
                <User className="h-4 w-4" />
                My Profile
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer for non-home pages */}
      {!isHomePage && <div className="h-16" />}
    </>
  );
};

export default Navbar;
