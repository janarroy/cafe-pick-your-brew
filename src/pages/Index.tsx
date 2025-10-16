import { Button } from "@/components/ui/button";
import { Coffee, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/coffee-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            Your Perfect Coffee,
            <br />
            Your Favorite Barista
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Choose your coffee shop, select your barista, and order your perfect brew
          </p>
          <Link to="/shops">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-warm">
              <Coffee className="mr-2 h-5 w-5" />
              Start Your Order
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <MapPin className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Choose Your Shop</h3>
              <p className="text-muted-foreground text-lg">
                Browse local coffee shops and find your favorite spot
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Users className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Pick Your Barista</h3>
              <p className="text-muted-foreground text-lg">
                Select your preferred barista for that personal touch
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Coffee className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Order Your Coffee</h3>
              <p className="text-muted-foreground text-lg">
                Customize your order and get it ready for pickup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-coffee">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Ready for Your Perfect Cup?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of coffee lovers enjoying personalized service
          </p>
          <Link to="/shops">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Browse Coffee Shops
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
