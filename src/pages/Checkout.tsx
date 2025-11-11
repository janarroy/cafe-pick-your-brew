import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Wallet, Star, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recordOrder } from "@/lib/orderHistory";
import type { DrinkId } from "@/data/drinks";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, cartTotal, shopName } = location.state || { cart: [], cartTotal: 0, shopName: "Coffee Shop" };
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [pickupTime, setPickupTime] = useState("asap");
  
  const pointsEarned = Math.floor(cartTotal * 2);
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handlePlaceOrder = () => {
    // Record each drink in the order history for recommendations
    cart.forEach((item: any) => {
      const drinkName = item.drink.name.toLowerCase().replace(/\s+/g, '-');
      
      // Map drink names to DrinkId
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
        // Record once for each quantity
        for (let i = 0; i < item.quantity; i++) {
          recordOrder(drinkId);
        }
      }
    });

    toast({
      title: "Order Placed! 🎉",
      description: `Your order will be ready in 15 minutes. You earned ${pointsEarned} points!`,
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Your cart is empty</h1>
          <Link to="/shops">
            <Button>Browse Coffee Shops</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-cream">
      <div className="max-w-4xl mx-auto">
        <Link to="/shops">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Details */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Shop</Label>
                    <p className="text-muted-foreground">{shopName}</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="pickup-time" className="text-base font-semibold mb-3 block">
                      Pickup Time
                    </Label>
                    <RadioGroup value={pickupTime} onValueChange={setPickupTime}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="asap" id="asap" />
                        <Label htmlFor="asap" className="cursor-pointer flex-1">
                          ASAP (15-20 minutes)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="30min" id="30min" />
                        <Label htmlFor="30min" className="cursor-pointer flex-1">
                          30 minutes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="1hour" id="1hour" />
                        <Label htmlFor="1hour" className="cursor-pointer flex-1">
                          1 hour
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex-1 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="cursor-pointer flex-1 flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Digital Wallet (Apple Pay, Google Pay)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer flex-1">
                      Pay at Pickup
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-8 shadow-warm">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.drink.name}</p>
                          <p className="text-xs text-muted-foreground">
                            by {item.barista.name} × {item.quantity}
                          </p>
                          {item.customizations && (
                            <p className="text-xs text-muted-foreground">
                              {item.customizations.milk && `${item.customizations.milk}, `}
                              {item.customizations.size}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold text-foreground">
                          ${(item.drink.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
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
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Rewards Section */}
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-accent" />
                      <p className="font-semibold text-foreground">Rewards</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll earn <strong className="text-accent">{pointsEarned} points</strong> with this order!
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <Button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-coffee hover:opacity-90 transition-opacity text-lg py-6"
                  >
                    Place Order ${total.toFixed(2)}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our Terms & Conditions
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
