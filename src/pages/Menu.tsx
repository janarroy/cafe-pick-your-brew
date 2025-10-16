import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const baristas = [
  { id: 1, name: "Emma Rodriguez", specialty: "Latte Art Master", avatar: "👩‍🦱" },
  { id: 2, name: "James Chen", specialty: "Espresso Expert", avatar: "👨" },
  { id: 3, name: "Sarah Johnson", specialty: "Cold Brew Specialist", avatar: "👩" },
];

const drinks = {
  hot: [
    { id: 1, name: "Cappuccino", price: 4.50, description: "Rich espresso with steamed milk" },
    { id: 2, name: "Latte", price: 4.75, description: "Smooth espresso with velvety milk" },
    { id: 3, name: "Americano", price: 3.50, description: "Espresso with hot water" },
    { id: 4, name: "Mocha", price: 5.25, description: "Chocolate and espresso delight" },
  ],
  cold: [
    { id: 5, name: "Iced Latte", price: 5.00, description: "Chilled espresso with cold milk" },
    { id: 6, name: "Cold Brew", price: 4.50, description: "Smooth, bold cold extraction" },
    { id: 7, name: "Iced Mocha", price: 5.50, description: "Chocolate espresso over ice" },
    { id: 8, name: "Frappuccino", price: 6.00, description: "Blended ice coffee drink" },
  ],
};

interface CartItem {
  drink: typeof drinks.hot[0];
  quantity: number;
  barista: typeof baristas[0];
}

const Menu = () => {
  const { shopId } = useParams();
  const { toast } = useToast();
  const [selectedBarista, setSelectedBarista] = useState(baristas[0]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (drink: typeof drinks.hot[0]) => {
    const existingItem = cart.find(
      item => item.drink.id === drink.id && item.barista.id === selectedBarista.id
    );

    if (existingItem) {
      setCart(cart.map(item => 
        item.drink.id === drink.id && item.barista.id === selectedBarista.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { drink, quantity: 1, barista: selectedBarista }]);
    }

    toast({
      title: "Added to cart",
      description: `${drink.name} by ${selectedBarista.name}`,
    });
  };

  const updateQuantity = (drinkId: number, baristaId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.drink.id === drinkId && item.barista.id === baristaId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.drink.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/shops">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shops
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Barista Selection */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Choose Your Barista</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {baristas.map((barista) => (
                  <Card
                    key={barista.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedBarista.id === barista.id
                        ? "ring-2 ring-primary shadow-warm"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedBarista(barista)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3">{barista.avatar}</div>
                      <h3 className="font-semibold text-lg text-foreground">{barista.name}</h3>
                      <p className="text-sm text-muted-foreground">{barista.specialty}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Menu</h2>
              <Tabs defaultValue="hot" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="hot">Hot Drinks</TabsTrigger>
                  <TabsTrigger value="cold">Cold Drinks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hot" className="space-y-4">
                  {drinks.hot.map((drink) => (
                    <Card key={drink.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1 text-foreground">{drink.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{drink.description}</p>
                          <p className="text-lg font-bold text-primary">${drink.price.toFixed(2)}</p>
                        </div>
                        <Button onClick={() => addToCart(drink)} className="bg-gradient-coffee">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="cold" className="space-y-4">
                  {drinks.cold.map((drink) => (
                    <Card key={drink.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1 text-foreground">{drink.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{drink.description}</p>
                          <p className="text-lg font-bold text-primary">${drink.price.toFixed(2)}</p>
                        </div>
                        <Button onClick={() => addToCart(drink)} className="bg-gradient-coffee">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-warm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Your Order</h3>
                  {cartItemCount > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {cartItemCount}
                    </Badge>
                  )}
                </div>

                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={`${item.drink.id}-${item.barista.id}`} className="border-b border-border pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{item.drink.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                by {item.barista.name}
                              </p>
                            </div>
                            <p className="font-semibold text-foreground">
                              ${(item.drink.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.drink.id, item.barista.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.drink.id, item.barista.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 mb-6">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-coffee hover:opacity-90 transition-opacity text-lg py-6">
                      Checkout
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
