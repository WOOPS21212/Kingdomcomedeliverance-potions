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
  
  // Get basePath for images
  const basePath = process.env.NODE_ENV === 'production' ? '/kingdom-come-deliverance-2-potions' : '';

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

  // Make sure the image path is correct
  const imagePath = potion.imagePath || `${basePath}/potion-recipes/temp.png`;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          backgroundColor: '#222', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '90%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '25px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ×
        </button>
        
        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          {/* Left column: Thumbnail and Effects */}
          <div>
            {/* Smaller thumbnail with text overlay */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '75%', // 4:3 aspect ratio for a smaller image
              marginBottom: '20px',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                {/* Text overlay on bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '15px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                }}>
                  <h1 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    color: 'white', 
                    margin: 0,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                  }}>
                    {potion.name}
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Effects section */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#aaa' }}>Effects:</h3>
              <p style={{ color: 'white', marginBottom: '15px' }}>{potion.effects}</p>
              
              {potion.enhancedEffects && (
                <div style={{ marginTop: '15px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#aaa' }}>Enhanced Effects:</h3>
                  <p style={{ color: 'white' }}>{potion.enhancedEffects}</p>
                </div>
              )}
              
              {potion.acquisition && (
                <div style={{ marginTop: '15px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#aaa' }}>Where to Find:</h3>
                  <p style={{ color: 'white' }}>{potion.acquisition}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Ingredients and Brewing Steps */}
          <div>
            {/* Ingredients section */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#aaa' }}>Ingredients:</h3>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {potion.ingredients.map((ing: string, i: number) => (
                  <li key={i} style={{ marginBottom: '8px', color: 'white' }}>{ing}</li>
                ))}
              </ul>
              
              {potion.baseLiquid !== "Unknown" && (
                <div style={{ marginTop: '15px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#aaa' }}>Base Liquid:</h3>
                  <p style={{ color: 'white' }}>{potion.baseLiquid}</p>
                </div>
              )}
            </div>
            
            {/* Brewing steps section */}
            {potion.steps && (
              <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '15px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#aaa' }}>Brewing Steps:</h3>
                <ol style={{ paddingLeft: '20px', margin: 0 }}>
                  {potion.steps.split('>').map((step, i) => (
                    <li key={i} style={{ marginBottom: '8px', color: 'white' }}>{step.trim()}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
