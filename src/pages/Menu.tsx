import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, ArrowLeft, Plus, Minus, Star, Milk, Leaf, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const baristas = [
  { id: 1, name: "Emma Rodriguez", specialty: "Latte Art Master", avatar: "👩‍🦱", rating: 4.9, orders: 1240 },
  { id: 2, name: "James Chen", specialty: "Espresso Expert", avatar: "👨", rating: 4.8, orders: 980 },
  { id: 3, name: "Sarah Johnson", specialty: "Cold Brew Specialist", avatar: "👩", rating: 4.9, orders: 1105 },
  { id: 4, name: "Marcus Williams", specialty: "Pour Over Pro", avatar: "👨‍🦲", rating: 4.7, orders: 756 },
];

const drinks = {
  hot: [
    { id: 1, name: "Cappuccino", price: 4.50, description: "Rich espresso with steamed milk", calories: 120 },
    { id: 2, name: "Latte", price: 4.75, description: "Smooth espresso with velvety milk", calories: 190 },
    { id: 3, name: "Americano", price: 3.50, description: "Espresso with hot water", calories: 15 },
    { id: 4, name: "Mocha", price: 5.25, description: "Chocolate and espresso delight", calories: 290 },
    { id: 5, name: "Flat White", price: 4.50, description: "Velvety microfoam with espresso", calories: 155 },
    { id: 6, name: "Macchiato", price: 4.25, description: "Espresso with milk foam", calories: 50 },
  ],
  cold: [
    { id: 7, name: "Iced Latte", price: 5.00, description: "Chilled espresso with cold milk", calories: 130 },
    { id: 8, name: "Cold Brew", price: 4.50, description: "Smooth, bold cold extraction", calories: 5 },
    { id: 9, name: "Iced Mocha", price: 5.50, description: "Chocolate espresso over ice", calories: 310 },
    { id: 10, name: "Frappuccino", price: 6.00, description: "Blended ice coffee drink", calories: 380 },
    { id: 11, name: "Nitro Cold Brew", price: 5.50, description: "Nitrogen-infused cold brew", calories: 5 },
    { id: 12, name: "Iced Caramel Macchiato", price: 5.75, description: "Vanilla, caramel & espresso", calories: 250 },
  ],
  pastries: [
    { id: 13, name: "Croissant", price: 3.50, description: "Buttery, flaky French pastry", calories: 230 },
    { id: 14, name: "Blueberry Muffin", price: 3.75, description: "Fresh baked with real blueberries", calories: 360 },
    { id: 15, name: "Chocolate Chip Cookie", price: 2.50, description: "Soft and chewy", calories: 220 },
    { id: 16, name: "Banana Bread", price: 3.25, description: "Moist and delicious", calories: 330 },
    { id: 17, name: "Almond Biscotti", price: 2.75, description: "Perfect for dipping", calories: 120 },
    { id: 18, name: "Cinnamon Roll", price: 4.25, description: "Warm with cream cheese frosting", calories: 420 },
  ]
};

const milkOptions = [
  { id: "whole", name: "Whole Milk", extra: 0 },
  { id: "2percent", name: "2% Milk", extra: 0 },
  { id: "skim", name: "Skim Milk", extra: 0 },
  { id: "oat", name: "Oat Milk", extra: 0.75 },
  { id: "almond", name: "Almond Milk", extra: 0.75 },
  { id: "soy", name: "Soy Milk", extra: 0.75 },
  { id: "coconut", name: "Coconut Milk", extra: 0.75 },
];

const sizeOptions = [
  { id: "small", name: "Small (8oz)", extra: 0 },
  { id: "medium", name: "Medium (12oz)", extra: 0.50 },
  { id: "large", name: "Large (16oz)", extra: 1.00 },
  { id: "xlarge", name: "X-Large (20oz)", extra: 1.50 },
];

const extraOptions = [
  { id: "espresso", name: "Extra Espresso Shot", price: 0.75 },
  { id: "whipped", name: "Whipped Cream", price: 0.50 },
  { id: "caramel", name: "Caramel Drizzle", price: 0.50 },
  { id: "vanilla", name: "Vanilla Syrup", price: 0.50 },
  { id: "sugar-free", name: "Sugar-Free Syrup", price: 0.50 },
];

const dietaryRestrictions = [
  { id: "vegan", name: "Vegan", icon: "🌱" },
  { id: "gluten-free", name: "Gluten Free", icon: "🌾" },
  { id: "dairy-free", name: "Dairy Free", icon: "🥛" },
  { id: "sugar-free", name: "Sugar Free", icon: "🍬" },
];

interface CartItem {
  drink: typeof drinks.hot[0];
  quantity: number;
  barista: typeof baristas[0];
  customizations?: {
    milk?: string;
    size?: string;
    extras?: string[];
    dietary?: string[];
  };
}

const Menu = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBarista, setSelectedBarista] = useState(baristas[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingDrink, setCustomizingDrink] = useState<typeof drinks.hot[0] | null>(null);
  
  // Customization states
  const [selectedMilk, setSelectedMilk] = useState("whole");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const calculateItemPrice = () => {
    if (!customizingDrink) return 0;
    
    let price = customizingDrink.price;
    
    // Add milk upcharge
    const milk = milkOptions.find(m => m.id === selectedMilk);
    if (milk) price += milk.extra;
    
    // Add size upcharge
    const size = sizeOptions.find(s => s.id === selectedSize);
    if (size) price += size.extra;
    
    // Add extras
    selectedExtras.forEach(extraId => {
      const extra = extraOptions.find(e => e.id === extraId);
      if (extra) price += extra.price;
    });
    
    return price;
  };

  const addToCart = (drink: typeof drinks.hot[0]) => {
    const customizations = {
      milk: selectedMilk,
      size: selectedSize,
      extras: selectedExtras,
      dietary: selectedDietary,
    };
    
    const finalPrice = calculateItemPrice();
    const drinkWithPrice = { ...drink, price: finalPrice };
    
    setCart([...cart, { 
      drink: drinkWithPrice, 
      quantity: 1, 
      barista: selectedBarista,
      customizations 
    }]);

    toast({
      title: "Added to cart ☕",
      description: `${drink.name} by ${selectedBarista.name}`,
    });
    
    // Reset customizations
    setSelectedMilk("whole");
    setSelectedSize("medium");
    setSelectedExtras([]);
    setSelectedDietary([]);
    setCustomizingDrink(null);
  };

  const quickAddToCart = (drink: typeof drinks.hot[0]) => {
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

  const updateQuantity = (index: number, delta: number) => {
    setCart(cart.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.drink.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        cart, 
        cartTotal, 
        shopName: "Coffee Shop #" + shopId 
      } 
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-cream">
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
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{barista.avatar}</div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">{barista.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{barista.specialty}</p>
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span>{barista.rating}</span>
                        <span>({barista.orders})</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dietary Filters */}
            <div className="mb-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                <Leaf className="h-5 w-5 text-accent" />
                Dietary Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {dietaryRestrictions.map((diet) => (
                  <Badge
                    key={diet.id}
                    variant={selectedDietary.includes(diet.id) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent/10"
                    onClick={() => {
                      setSelectedDietary(prev =>
                        prev.includes(diet.id)
                          ? prev.filter(d => d !== diet.id)
                          : [...prev, diet.id]
                      );
                    }}
                  >
                    {diet.icon} {diet.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Menu</h2>
              <Tabs defaultValue="hot" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="hot">Hot Drinks</TabsTrigger>
                  <TabsTrigger value="cold">Cold Drinks</TabsTrigger>
                  <TabsTrigger value="pastries">Pastries</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hot" className="space-y-4">
                  {drinks.hot.map((drink) => (
                    <Card key={drink.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1 text-foreground">{drink.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{drink.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{drink.calories} cal</span>
                              <Badge variant="outline" className="text-xs">Customizable</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary mb-2">${drink.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="flex-1 bg-gradient-coffee"
                                onClick={() => setCustomizingDrink(drink)}
                              >
                                <Milk className="h-4 w-4 mr-2" />
                                Customize & Add
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Customize Your {drink.name}</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-6 py-4">
                                {/* Milk Options */}
                                <div>
                                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                                    <Milk className="h-4 w-4" />
                                    Milk Options
                                  </Label>
                                  <RadioGroup value={selectedMilk} onValueChange={setSelectedMilk}>
                                    {milkOptions.map((milk) => (
                                      <div key={milk.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                                        <RadioGroupItem value={milk.id} id={milk.id} />
                                        <Label htmlFor={milk.id} className="flex-1 cursor-pointer">
                                          {milk.name}
                                        </Label>
                                        {milk.extra > 0 && (
                                          <span className="text-sm text-muted-foreground">+${milk.extra.toFixed(2)}</span>
                                        )}
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>

                                <Separator />

                                {/* Size Options */}
                                <div>
                                  <Label className="text-base font-semibold mb-3 block">Size</Label>
                                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                                    {sizeOptions.map((size) => (
                                      <div key={size.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                                        <RadioGroupItem value={size.id} id={size.id} />
                                        <Label htmlFor={size.id} className="flex-1 cursor-pointer">
                                          {size.name}
                                        </Label>
                                        {size.extra > 0 && (
                                          <span className="text-sm text-muted-foreground">+${size.extra.toFixed(2)}</span>
                                        )}
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>

                                <Separator />

                                {/* Extras */}
                                <div>
                                  <Label className="text-base font-semibold mb-3 block">Add Extras</Label>
                                  <div className="space-y-2">
                                    {extraOptions.map((extra) => (
                                      <div key={extra.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                                        <Checkbox
                                          id={extra.id}
                                          checked={selectedExtras.includes(extra.id)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              setSelectedExtras([...selectedExtras, extra.id]);
                                            } else {
                                              setSelectedExtras(selectedExtras.filter(e => e !== extra.id));
                                            }
                                          }}
                                        />
                                        <Label htmlFor={extra.id} className="flex-1 cursor-pointer">
                                          {extra.name}
                                        </Label>
                                        <span className="text-sm text-muted-foreground">+${extra.price.toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                {/* Price Summary */}
                                <div className="bg-muted/50 rounded-lg p-4">
                                  <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total Price</span>
                                    <span className="text-primary">${calculateItemPrice().toFixed(2)}</span>
                                  </div>
                                </div>

                                <Button 
                                  className="w-full bg-gradient-coffee text-lg py-6"
                                  onClick={() => customizingDrink && addToCart(customizingDrink)}
                                >
                                  Add to Cart - ${calculateItemPrice().toFixed(2)}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => quickAddToCart(drink)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="cold" className="space-y-4">
                  {drinks.cold.map((drink) => (
                    <Card key={drink.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1 text-foreground">{drink.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{drink.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{drink.calories} cal</span>
                              <Badge variant="outline" className="text-xs">Customizable</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary mb-2">${drink.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="flex-1 bg-gradient-coffee"
                                onClick={() => setCustomizingDrink(drink)}
                              >
                                <Milk className="h-4 w-4 mr-2" />
                                Customize & Add
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Customize Your {drink.name}</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-6 py-4">
                                {/* Same customization UI as hot drinks */}
                                <div>
                                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                                    <Milk className="h-4 w-4" />
                                    Milk Options
                                  </Label>
                                  <RadioGroup value={selectedMilk} onValueChange={setSelectedMilk}>
                                    {milkOptions.map((milk) => (
                                      <div key={milk.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                                        <RadioGroupItem value={milk.id} id={milk.id} />
                                        <Label htmlFor={milk.id} className="flex-1 cursor-pointer">
                                          {milk.name}
                                        </Label>
                                        {milk.extra > 0 && (
                                          <span className="text-sm text-muted-foreground">+${milk.extra.toFixed(2)}</span>
                                        )}
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>

                                <Separator />

                                <div>
                                  <Label className="text-base font-semibold mb-3 block">Size</Label>
                                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                                    {sizeOptions.map((size) => (
                                      <div key={size.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                                        <RadioGroupItem value={size.id} id={size.id} />
                                        <Label htmlFor={size.id} className="flex-1 cursor-pointer">
                                          {size.name}
                                        </Label>
                                        {size.extra > 0 && (
                                          <span className="text-sm text-muted-foreground">+${size.extra.toFixed(2)}</span>
                                        )}
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>

                                <Separator />

                                <div>
                                  <Label className="text-base font-semibold mb-3 block">Add Extras</Label>
                                  <div className="space-y-2">
                                    {extraOptions.map((extra) => (
                                      <div key={extra.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                                        <Checkbox
                                          id={`cold-${extra.id}`}
                                          checked={selectedExtras.includes(extra.id)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              setSelectedExtras([...selectedExtras, extra.id]);
                                            } else {
                                              setSelectedExtras(selectedExtras.filter(e => e !== extra.id));
                                            }
                                          }}
                                        />
                                        <Label htmlFor={`cold-${extra.id}`} className="flex-1 cursor-pointer">
                                          {extra.name}
                                        </Label>
                                        <span className="text-sm text-muted-foreground">+${extra.price.toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                <div className="bg-muted/50 rounded-lg p-4">
                                  <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total Price</span>
                                    <span className="text-primary">${calculateItemPrice().toFixed(2)}</span>
                                  </div>
                                </div>

                                <Button 
                                  className="w-full bg-gradient-coffee text-lg py-6"
                                  onClick={() => customizingDrink && addToCart(customizingDrink)}
                                >
                                  Add to Cart - ${calculateItemPrice().toFixed(2)}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => quickAddToCart(drink)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="pastries" className="space-y-4">
                  {drinks.pastries.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1 text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <span className="text-xs text-muted-foreground">{item.calories} cal</span>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                          <Button onClick={() => quickAddToCart(item)} className="bg-gradient-coffee">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
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
                      {cart.map((item, index) => (
                        <div key={index} className="border-b border-border pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{item.drink.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                by {item.barista.name}
                              </p>
                              {item.customizations && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {item.customizations.size && (
                                    <div>{sizeOptions.find(s => s.id === item.customizations?.size)?.name}</div>
                                  )}
                                  {item.customizations.milk && (
                                    <div>{milkOptions.find(m => m.id === item.customizations?.milk)?.name}</div>
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="font-semibold text-foreground">
                              ${(item.drink.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(index, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(index, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground">Subtotal</span>
                        <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-accent">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Rewards Points
                        </span>
                        <span className="font-semibold">+{Math.floor(cartTotal * 2)} pts</span>
                      </div>
                    </div>

                    <div className="mb-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-center text-foreground">
                        <strong>Earn {Math.floor(cartTotal * 2)} points</strong> with this order!
                      </p>
                    </div>

                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-coffee hover:opacity-90 transition-opacity text-lg py-6"
                    >
                      Checkout ${cartTotal.toFixed(2)}
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
