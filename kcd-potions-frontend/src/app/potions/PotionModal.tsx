'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PotionModalProps {
  potion: {
    name: string;
    baseLiquid: string;
    ingredients: string[];
    effects: string;
    difficulty: string;
    steps: string;
    imagePath?: string;
    enhancedEffects?: string;
    acquisition?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PotionModal({ potion, isOpen, onClose }: PotionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add event listener to close modal on escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !potion) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          backgroundColor: '#222', 
          borderRadius: '10px', 
          padding: '30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '1000px',
          margin: '20px auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        
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
    </div>
  );
}
