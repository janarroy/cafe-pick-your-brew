import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Wallet, Star, MapPin, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recordOrder, recordShopOrder, recordShopTags } from "@/lib/orderHistory";
import type { DrinkId } from "@/data/drinks";
import type { ShopTag } from "./Shops";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, cartTotal, shopName, shopId, shopTags } = location.state || { 
    cart: [], 
    cartTotal: 0, 
    shopName: "Coffee Shop", 
    shopId: 1,
    shopTags: [] as ShopTag[]
  };
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [pickupTime, setPickupTime] = useState("asap");
  
  const pointsEarned = Math.floor(cartTotal * 2);
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handlePlaceOrder = () => {
    if (shopId) {
      recordShopOrder(shopId);
    }
    
    if (shopTags && shopTags.length > 0) {
      recordShopTags(shopTags);
    }

    cart.forEach((item: any) => {
      const drinkName = item.drink.name.toLowerCase().replace(/\s+/g, '-');
      
      const drinkIdMap: Record<string, DrinkId> = {
        'cappuccino': 'cappuccino',
        'latte': 'latte',
        'iced-latte': 'latte',
        'americano': 'americano',
        'mocha': 'mocha',
        'iced-mocha': 'mocha',
        'flat-white': 'flat-white',
        'macchiato': 'macchiato',
        'iced-caramel-macchiato': 'macchiato',
      };
      
      const drinkId = drinkIdMap[drinkName];
      if (drinkId) {
        for (let i = 0; i < item.quantity; i++) {
          recordOrder(drinkId);
        }
      }
    });

    toast({
      title: "Order Placed!",
      description: `Your order will be ready in 15 minutes. You earned ${pointsEarned} points!`,
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to get started</p>
          <Link to="/shops">
            <Button>Browse Coffee Shops</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/shops">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="md:col-span-3 space-y-6">
            {/* Order Details */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Pickup Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Shop</Label>
                  <p className="font-medium text-foreground">{shopName}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground mb-3 block">Pickup Time</Label>
                  <RadioGroup value={pickupTime} onValueChange={setPickupTime} className="space-y-2">
                    {[
                      { value: "asap", label: "ASAP (15-20 min)" },
                      { value: "30min", label: "30 minutes" },
                      { value: "1hour", label: "1 hour" }
                    ].map(opt => (
                      <div key={opt.value} className="flex items-center space-x-2 p-3 border border-border/50 rounded-lg hover:border-border cursor-pointer">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="cursor-pointer flex-1 text-sm">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="mt-1.5" />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                  {[
                    { value: "card", label: "Credit / Debit Card", icon: CreditCard },
                    { value: "wallet", label: "Apple Pay / Google Pay", icon: Wallet },
                    { value: "cash", label: "Pay at Pickup", icon: null }
                  ].map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2 p-3 border border-border/50 rounded-lg hover:border-border cursor-pointer">
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="cursor-pointer flex-1 flex items-center gap-2 text-sm">
                        {opt.icon && <opt.icon className="h-4 w-4 text-muted-foreground" />}
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                    <div>
                      <Label htmlFor="card-number" className="text-sm">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1.5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-sm">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1.5" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card className="sticky top-24 border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {cart.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.drink.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.barista.name} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${(item.drink.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <p className="text-sm">
                        Earn <span className="font-semibold text-primary">{pointsEarned} points</span>
                      </p>
                    </div>
                  </div>

                  {/* Place Order */}
                  <Button 
                    onClick={handlePlaceOrder}
                    className="w-full py-6 text-base"
                  >
                    Place Order — ${total.toFixed(2)}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our Terms
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;