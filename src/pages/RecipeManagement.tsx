import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import RecipeCard from '@/components/RecipeCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { Textarea } from '@/components/ui/textarea';

// Placeholder data for recipe cards
const sampleRecipes = [
  {
    slug: 'classic-sourdough-bread',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1780&auto=format&fit=crop',
    title: 'Classic Sourdough Bread',
    description: 'A rustic, artisanal loaf with a chewy crust and a soft, open crumb. Perfect for sandwiches or toast.',
  },
  {
    slug: 'flaky-butter-croissants',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1780&auto=format&fit=crop',
    title: 'Flaky Butter Croissants',
    description: 'Layers of buttery, flaky pastry, meticulously laminated to create the perfect crescent-shaped treat.',
  },
  {
    slug: 'chocolate-chip-cookies',
    imageUrl: 'https://images.unsplash.com/photo-1593289295534-3a7a4a2fe026?q=80&w=1780&auto=format&fit=crop',
    title: 'Gourmet Chocolate Chip Cookies',
    description: 'The ultimate comfort food, made with premium chocolate chunks and a hint of sea salt.',
  },
  {
    slug: 'blueberry-muffins',
    imageUrl: 'https://images.unsplash.com/photo-1557087422-243a035a816d?q=80&w=1780&auto=format&fit=crop',
    title: 'Bakery-Style Blueberry Muffins',
    description: 'Moist and fluffy muffins bursting with fresh blueberries and topped with a sweet, crunchy streusel.',
  },
  {
    slug: 'cinnamon-rolls',
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1780&auto=format&fit=crop',
    title: 'Gooey Cinnamon Rolls',
    description: 'Soft, sweet dough swirled with cinnamon sugar and topped with a rich cream cheese frosting.',
  },
  {
    slug: 'artisan-baguette',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1780&auto=format&fit=crop',
    title: 'French Artisan Baguette',
    description: 'A classic French baguette with a crisp crust and a light, airy interior. Simple, elegant, and delicious.',
  },
];

const RecipeManagement = () => {
  console.log('RecipeManagement loaded');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveRecipe = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newRecipe = {
      title: formData.get('title'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl'),
    };
    console.log('New recipe saved:', newRecipe);
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-800">My Recipes</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Recipe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Recipe</DialogTitle>
                  <DialogDescription>
                    Enter the details of your new recipe here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form id="add-recipe-form" onSubmit={handleSaveRecipe}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input id="title" name="title" placeholder="e.g., Classic Sourdough" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea id="description" name="description" placeholder="A brief description of the recipe..." className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="imageUrl" className="text-right">
                        Image URL
                      </Label>
                      <Input id="imageUrl" name="imageUrl" placeholder="https://..." className="col-span-3" />
                    </div>
                  </div>
                </form>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" form="add-recipe-form">Save Recipe</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.slug}
                  slug={recipe.slug}
                  imageUrl={recipe.imageUrl}
                  title={recipe.title}
                  description={recipe.description}
                />
              ))}
            </div>
          </ScrollArea>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RecipeManagement;