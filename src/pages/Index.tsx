import { Button } from "@/components/ui/button";
import { Coffee, MapPin, Users, Gift, Star, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import heroImage from "@/assets/coffee-hero.jpg";
import { getLastOrderedShop } from "@/lib/orderHistory";

const Index = () => {
  const lastShopId = useMemo(() => getLastOrderedShop(), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full screen, minimal */}
      <section className="relative min-h-screen flex items-center">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-bl-[100px] opacity-90"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent rounded-bl-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl">
            {/* Small accent badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Gift className="h-4 w-4" />
              Universal Rewards Program
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Your coffee,
              <br />
              <span className="text-primary">your way.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Discover local cafes, order ahead, and earn rewards at every stop. 
              One app for all your coffee adventures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shops">
                <Button size="lg" className="text-base px-8 h-12 gap-2 w-full sm:w-auto">
                  Start Ordering
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 w-full sm:w-auto">
                  View Rewards
                </Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Partner Cafes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* How It Works - Clean cards */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to better coffee experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                step: "01",
                title: "Discover",
                description: "Browse cafes near you with personalized recommendations based on your taste.",
                link: "/shops",
              },
              {
                icon: Coffee,
                step: "02",
                title: "Order",
                description: "Choose your drink, pick your barista, and order ahead to skip the line.",
                link: lastShopId ? `/menu/${lastShopId}` : "/shops",
              },
              {
                icon: Gift,
                step: "03",
                title: "Earn",
                description: "Collect points at every cafe and unlock rewards across our entire network.",
                link: "/profile",
              },
            ].map((item) => (
              <Link
                key={item.step}
                to={item.link}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/20">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                One rewards program.
                <br />
                <span className="text-primary">Every coffee shop.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Unlike loyalty cards that only work at one chain, Brew Buddy rewards 
                you everywhere. Earn points at any partner cafe and redeem them anywhere.
              </p>

              <div className="space-y-4">
                {[
                  "Earn 1 point for every dollar spent",
                  "Redeem at any participating cafe",
                  "Unlock tier benefits as you level up",
                  "Never lose points - they never expire",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/profile" className="inline-block mt-8">
                <Button variant="outline" size="lg" className="gap-2">
                  View Your Rewards
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Rewards tiers card */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-foreground mb-2">350</div>
                <div className="text-muted-foreground">Points Available</div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Bronze", range: "0-500", perks: "5% off drinks", active: true },
                  { name: "Silver", range: "500-1000", perks: "10% off + free drink monthly", active: false },
                  { name: "Gold", range: "1000+", perks: "15% off + VIP perks", active: false },
                ].map((tier) => (
                  <div
                    key={tier.name}
                    className={`p-4 rounded-xl border transition-colors ${
                      tier.active
                        ? "bg-primary/10 border-primary"
                        : "bg-background border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold ${tier.active ? "text-primary" : "text-foreground"}`}>
                        {tier.name}
                      </span>
                      <span className="text-sm text-muted-foreground">{tier.range} pts</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.perks}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Made for coffee lovers
            </h2>
            <p className="text-muted-foreground text-lg">
              Features designed around how you actually get coffee
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: "Find Nearby", desc: "Cafes close to you" },
              { icon: Users, title: "Pick Barista", desc: "Your favorite maker" },
              { icon: Coffee, title: "Order Ahead", desc: "Skip the wait" },
              { icon: Star, title: "Get Rewards", desc: "Every purchase" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean and minimal */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready for better coffee?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of coffee lovers who've simplified their daily brew.
          </p>
          <Link to="/shops">
            <Button size="lg" className="text-base px-10 h-12 gap-2">
              <Coffee className="h-5 w-5" />
              Browse Cafes
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Coffee className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Brew Buddy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Brew Buddy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
