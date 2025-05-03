'use client';

import { useState } from 'react';
import Image from 'next/image';
import PotionModal from './PotionModal';

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

export default function PotionsClient({ potions }: { potions: ProcessedPotion[] }) {
  const [selectedPotion, setSelectedPotion] = useState<ProcessedPotion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (potion: ProcessedPotion) => {
    setSelectedPotion(potion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main style={{ padding: '20px', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Potions</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {potions.map((potion: ProcessedPotion, index: number) => (
          <div
            key={index}
            onClick={() => openModal(potion)}
            style={{ 
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              cursor: 'pointer'
            }}
          >
            <div
              style={{ 
                backgroundColor: '#222', 
                borderRadius: '10px', 
                padding: '15px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%'
              }}
              className="potion-card"
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{potion.name}</h2>
              
              {/* Add the potion image (using placeholder if no specific image is available) */}
              <div style={{ position: 'relative', height: '150px', marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                <Image 
                  src={potion.imagePath || '/potion-recipes/temp.png'}
                  alt={`${potion.name} recipe`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority={potion.name === "Aqua Vitalis"} // Add priority to the Aqua Vitalis image (LCP)
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              {potion.baseLiquid !== "Unknown" && (
                <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Base: {potion.baseLiquid}</p>
              )}
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Ingredients:</p>
                <ul style={{ paddingLeft: '20px' }}>
                  {potion.ingredients.map((ing: string, i: number) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{ing}</li>
                  ))}
                </ul>
              </div>
              <p style={{ marginTop: '10px', color: '#aaaaaa', fontStyle: 'italic', fontSize: '0.8rem' }}>{potion.effects}</p>
              {potion.steps && (
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #444' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Brewing Steps:</p>
                  <ol style={{ paddingLeft: '20px', fontSize: '1rem', color: '#ccc' }}>
                    {potion.steps.split('>').map((step, i) => (
                      <li key={i} style={{ marginBottom: '5px' }}>{step.trim()}</li>
                    ))}
                  </ol>
                </div>
              )}
              
              {potion.enhancedEffects && (
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #444' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Enhanced Effects:</p>
                  <p style={{ fontSize: '0.8rem', color: '#aaaaaa', fontStyle: 'italic' }}>{potion.enhancedEffects}</p>
                </div>
              )}
              
              {potion.acquisition && (
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #444' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Where to Find:</p>
                  <p style={{ fontSize: '0.8rem', color: '#ccc' }}>{potion.acquisition}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <PotionModal 
        potion={selectedPotion} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </main>
  );
}
