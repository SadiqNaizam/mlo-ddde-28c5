import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface RecipeCardProps {
  slug: string;
  imageUrl: string;
  title: string;
  description: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ slug, imageUrl, title, description }) => {
  console.log(`RecipeCard loaded for: ${title}`);

  return (
    <Link to={`/recipe-management/${slug}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-amber-200/40 hover:-translate-y-1.5">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop'}
              alt={`Image of ${title}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="mb-2 text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;