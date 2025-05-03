'use client';

import { useState, useMemo } from 'react';
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
  const [sortOrder, setSortOrder] = useState<'default' | 'alphabetical' | 'ingredients'>('default');
  const [isReversed, setIsReversed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sort potions based on current sort order and reverse flag
  const sortedPotions = useMemo(() => {
    let sorted = [...potions];
    
    if (sortOrder === 'alphabetical') {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'ingredients') {
      sorted = sorted.sort((a, b) => a.ingredients.length - b.ingredients.length);
    }
    
    // If reversed, reverse the sorted array
    return isReversed ? sorted.reverse() : sorted;
  }, [potions, sortOrder, isReversed]);

  const openModal = (potion: ProcessedPotion) => {
    setSelectedPotion(potion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortChange = (newSortOrder: 'default' | 'alphabetical' | 'ingredients') => {
    setSortOrder(newSortOrder);
    setIsDropdownOpen(false);
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <main style={{ padding: '20px', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Potions</h1>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={toggleDropdown}
              style={{ 
                backgroundColor: '#333', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Sort: {
                sortOrder === 'alphabetical' 
                  ? 'A-Z' 
                  : sortOrder === 'ingredients' 
                    ? 'Fewest Ingredients' 
                    : 'Default'
              }</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              onClick={toggleReverse}
              style={{ 
                backgroundColor: isReversed ? '#555' : '#333', 
                color: 'white', 
                border: 'none', 
                padding: '8px', 
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Reverse Order"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L4 4M4 4L7 7M4 4L1 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4L12 12M12 12L9 9M12 12L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {isDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              right: '0', 
              marginTop: '5px',
              backgroundColor: '#333',
              borderRadius: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              minWidth: '180px'
            }}>
              <div 
                onClick={() => handleSortChange('default')}
                style={{ 
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #444',
                  backgroundColor: sortOrder === 'default' ? '#444' : 'transparent'
                }}
              >
                Default
              </div>
              <div 
                onClick={() => handleSortChange('alphabetical')}
                style={{ 
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #444',
                  backgroundColor: sortOrder === 'alphabetical' ? '#444' : 'transparent'
                }}
              >
                Alphabetical (A-Z)
              </div>
              <div 
                onClick={() => handleSortChange('ingredients')}
                style={{ 
                  padding: '10px 15px',
                  cursor: 'pointer',
                  backgroundColor: sortOrder === 'ingredients' ? '#444' : 'transparent'
                }}
              >
                Fewest Ingredients
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px 20px' }}>
        {sortedPotions.map((potion: ProcessedPotion, index: number) => (
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
