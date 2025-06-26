import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil } from 'lucide-react';

// Define the type for an ingredient
type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'units';
  maxStock: number;
};

// Placeholder data for the inventory
const initialIngredients: Ingredient[] = [
  { id: '1', name: 'All-Purpose Flour', quantity: 10, unit: 'kg', maxStock: 20 },
  { id: '2', name: 'Butter', quantity: 2, unit: 'kg', maxStock: 10 },
  { id: '3', name: 'Vanilla Extract', quantity: 100, unit: 'ml', maxStock: 500 },
  { id: '4', name: 'Granulated Sugar', quantity: 15, unit: 'kg', maxStock: 15 },
  { id: '5', name: 'Yeast', quantity: 50, unit: 'g', maxStock: 500 },
  { id: '6', name: 'Chocolate Chips', quantity: 0, unit: 'kg', maxStock: 5 },
  { id: '7', name: 'Eggs', quantity: 24, unit: 'units', maxStock: 48 },
];

// Function to determine stock status and badge variant
const getStockStatus = (quantity: number, maxStock: number): { text: string; variant: "default" | "secondary" | "destructive" } => {
  const percentage = (quantity / maxStock) * 100;
  if (percentage <= 0) {
    return { text: "Out of Stock", variant: "destructive" };
  }
  if (percentage <= 25) {
    return { text: "Low Stock", variant: "secondary" };
  }
  return { text: "In Stock", variant: "default" };
};

const InventoryTracking = () => {
  console.log('InventoryTracking loaded');

  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateClick = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setNewQuantity(String(ingredient.quantity));
    setIsDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (editingIngredient) {
      const updatedIngredients = ingredients.map(ing =>
        ing.id === editingIngredient.id ? { ...ing, quantity: Number(newQuantity) } : ing
      );
      setIngredients(updatedIngredients);
      setIsDialogOpen(false);
      setEditingIngredient(null);
    }
  };
  
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Inventory Tracking</h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Ingredient
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ingredient Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your current bakery ingredients.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Ingredient</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Current Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((ingredient) => {
                    const status = getStockStatus(ingredient.quantity, ingredient.maxStock);
                    const stockPercentage = (ingredient.quantity / ingredient.maxStock) * 100;
                    return (
                      <TableRow key={ingredient.id}>
                        <TableCell className="font-medium">{ingredient.name}</TableCell>
                        <TableCell>
                          <Progress value={stockPercentage} className="w-[60%]" />
                        </TableCell>
                        <TableCell>{`${ingredient.quantity} ${ingredient.unit}`}</TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>{status.text}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog open={isDialogOpen && editingIngredient?.id === ingredient.id} onOpenChange={(open) => !open && setIsDialogOpen(false)}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleUpdateClick(ingredient)}>
                                <Pencil className="mr-2 h-3 w-3" /> Update
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Update Stock: {editingIngredient?.name}</DialogTitle>
                                <DialogDescription>
                                  Enter the new quantity for this ingredient. Click save when you're done.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="quantity" className="text-right">
                                    Quantity
                                  </Label>
                                  <Input
                                    id="quantity"
                                    type="number"
                                    value={newQuantity}
                                    onChange={(e) => setNewQuantity(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default InventoryTracking;