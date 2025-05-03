import fs from 'fs';
import path from 'path';

// Define types for our data
interface RawPotion {
  name: string;
  baseLiquid: string;
  effects: string;
  difficulty: string;
  ingredients: string;
  steps: string;
}

interface ProcessedPotion {
  name: string;
  baseLiquid: string;
  ingredients: string[];
  effects: string;
  difficulty: string;
  steps: string;
}

// This is a server component, so we can use async/await
export default async function PotionsPage() {
  // Read the potions data from the JSON file
  const potionsData: RawPotion[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), '../potions-data.json'), 'utf8')
  );
  
  // Process the data to match our component's expected format
  const potions: ProcessedPotion[] = potionsData.map((potion: RawPotion) => {
    // Split the ingredients string into an array
    const ingredientsArray = potion.ingredients
      .split(',')
      .map((item: string) => item.trim())
      .map((item: string) => {
        // Extract just the ingredient name without the quantity
        const match = item.match(/([A-Za-z\s']+)(?:\s+x\d+)?/);
        return match ? match[1].trim() : item;
      });
    
    return {
      name: potion.name,
      baseLiquid: potion.baseLiquid || "Unknown",
      ingredients: ingredientsArray,
      effects: potion.effects,
      difficulty: potion.difficulty || "Medium",
      steps: potion.steps
    };
  });

  return (
    <main style={{ padding: '20px', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Potions</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {potions.map((potion: ProcessedPotion, index: number) => {
          return (
            <div
              key={index}
              style={{ 
                backgroundColor: '#222', 
                borderRadius: '10px', 
                padding: '15px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{potion.name}</h2>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Base: {potion.baseLiquid}</p>
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Ingredients:</p>
                <ul style={{ paddingLeft: '20px' }}>
                  {potion.ingredients.map((ing: string, i: number) => (
                    <li key={i} style={{ marginBottom: '3px' }}>• {ing}</li>
                  ))}
                </ul>
              </div>
              <p style={{ marginTop: '10px', color: '#8aff8a', fontStyle: 'italic' }}>{potion.effects}</p>
              <p style={{ marginTop: '5px', fontSize: '0.9rem', color: '#ffcc00' }}>Difficulty: {potion.difficulty}</p>
              {potion.steps && (
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #444' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Brewing Steps:</p>
                  <p style={{ fontSize: '0.8rem', color: '#ccc' }}>{potion.steps}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
