import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

// Define types for our data
interface RawPotion {
  name: string;
  baseLiquid: string;
  effects: string;
  difficulty: string;
  ingredients: string;
  steps: string;
  enhancedEffects?: string;
  acquisition?: string;
}

interface ProcessedPotion {
  name: string;
  baseLiquid: string;
  ingredients: string[];
  effects: string;
  difficulty: string;
  steps: string;
  imagePath?: string;
  enhancedEffects?: string;
  acquisition?: string;
}

// Define the params type
type PotionParams = {
  id: string;
}

// Page props interface
interface PageProps {
  params: PotionParams;
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Read the potions data from the JSON file
  const potionsData: RawPotion[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/potions-data-final-updated.json'), 'utf8')
  );
  
  const potionIndex = parseInt(params.id);
  const potion = potionsData[potionIndex];
  
  return {
    title: potion ? `${potion.name} | Kingdom Come Deliverance Potions` : 'Potion Not Found',
    description: potion ? potion.effects : 'The potion you are looking for does not exist.'
  };
}

export default async function PotionDetailPage({ params }: PageProps) {
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
  
  // Process all potions to get their names and IDs
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
  
  // Find the potion that matches the ID from the URL
  const potionIndex = parseInt(params.id);
  const potion = potions[potionIndex];
  
  if (!potion) {
    return (
      <main style={{ padding: '20px', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Potion Not Found</h1>
        <p>The potion you're looking for doesn't exist.</p>
        <Link href="/potions" style={{ color: '#8aff8a', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
          Back to Potions
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '20px', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <Link href="/potions" style={{ color: '#8aff8a', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Potions
      </Link>
      
      <div style={{ 
        backgroundColor: '#222', 
        borderRadius: '10px', 
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>{potion.name}</h1>
        
        {/* Add the potion image (using placeholder if no specific image is available) */}
        <div style={{ position: 'relative', height: '300px', marginBottom: '30px', borderRadius: '8px', overflow: 'hidden' }}>
          <Image 
            src={potion.imagePath || '/potion-recipes/temp.png'}
            alt={`${potion.name} recipe`}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {potion.baseLiquid !== "Unknown" && (
          <p style={{ fontSize: '1.2rem', color: '#aaa', textAlign: 'center', marginBottom: '20px' }}>Base: {potion.baseLiquid}</p>
        )}
        
        <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>Ingredients:</h2>
            <ul style={{ paddingLeft: '30px', fontSize: '1.5rem' }}>
              {potion.ingredients.map((ing: string, i: number) => (
                <li key={i} style={{ marginBottom: '10px' }}>{ing}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>Effects:</h2>
            <p style={{ fontSize: '1.2rem', color: '#aaaaaa', fontStyle: 'italic', marginBottom: '20px' }}>{potion.effects}</p>
            
            {potion.enhancedEffects && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Enhanced Effects:</h3>
                <p style={{ fontSize: '1.2rem', color: '#aaaaaa', fontStyle: 'italic' }}>{potion.enhancedEffects}</p>
              </div>
            )}
          </div>
        </div>
        
        {potion.steps && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>Brewing Steps:</h2>
            <ol style={{ paddingLeft: '30px', fontSize: '1.5rem', color: '#ccc' }}>
              {potion.steps.split('>').map((step, i) => (
                <li key={i} style={{ marginBottom: '15px' }}>{step.trim()}</li>
              ))}
            </ol>
          </div>
        )}
        
        {potion.acquisition && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>Where to Find:</h2>
            <p style={{ fontSize: '1.2rem', color: '#ccc' }}>{potion.acquisition}</p>
          </div>
        )}
      </div>
    </main>
  );
}
