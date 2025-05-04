import fs from 'fs';
import path from 'path';
import './potions.css';
import PotionsClient from './PotionsClient';

// Define types for our data
interface RawPotion {
  name: string;
  baseLiquid: string;
  effects: string;
  difficulty: string;
  ingredients: string;
  steps: string;
  enhancedEffects?: string; // New field for enhanced effects
  acquisition?: string; // New field for acquisition information
}

interface ProcessedPotion {
  name: string;
  baseLiquid: string;
  ingredients: string[];
  effects: string;
  difficulty: string;
  steps: string;
  imagePath?: string; // Added image path property
  enhancedEffects?: string; // New field for enhanced effects
  acquisition?: string; // New field for acquisition information
}

// This is a server component, so we can use async/await
export default async function PotionsPage() {
  // Read the potions data from the JSON file
  const potionsData: RawPotion[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/potions-data-final-updated.json'), 'utf8')
  );
  
  // Get the list of image files from the public/potion-recipes directory
  let recipeImages: string[] = [];
  try {
    recipeImages = fs.readdirSync(path.join(process.cwd(), 'public/potion-recipes'))
      .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'));
  } catch (error) {
    console.error('Error reading recipe images:', error);
  }
  
  // Process the data to match our component's expected format
  const potions: ProcessedPotion[] = potionsData.map((potion: RawPotion) => {
    // Split the ingredients string into an array
    const ingredientsArray = potion.ingredients
      .split(',')
      .map((item: string) => item.trim());
    
    // Find a matching image for this potion
    const potionNameLower = potion.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matchingImage = recipeImages.find(img => {
      const imgNameLower = path.parse(img).name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return imgNameLower.includes(potionNameLower) || potionNameLower.includes(imgNameLower);
    });
    
    return {
      name: potion.name,
      baseLiquid: potion.baseLiquid || "Unknown",
      ingredients: ingredientsArray,
      effects: potion.effects,
      difficulty: potion.difficulty || "Medium",
      steps: potion.steps,
      imagePath: matchingImage ? `/potion-recipes/${matchingImage}` : '/potion-recipes/temp.png',
      enhancedEffects: potion.enhancedEffects,
      acquisition: potion.acquisition
    };
  });

  return <PotionsClient potions={potions} />;
}
