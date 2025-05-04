'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  
  // Get basePath for images
  const basePath = process.env.NODE_ENV === 'production' ? '/kingdom-come-deliverance-2-potions' : '';
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  return (
    <main style={{ padding: '64px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px' }}>
        Kingdom Come: Potion Guide
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '40px' }}>
        Explore, brew, and master the alchemy of Kingdom Come: Deliverance 2.
      </p>
      
      {/* Two modals side by side */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px',
          flexWrap: 'wrap',
          padding: '0 20px'
        }}
      >
        {/* First modal - MapGenie */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => window.open('https://mapgenie.io/kingdom-come-deliverance-2', '_blank')}
          style={{ 
            width: '400px',
            backgroundColor: '#222',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer'
          }}
        >
          <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '15px' }}>Interactive Map</h2>
          <div style={{ 
            position: 'relative',
            width: '100%',
            height: '250px',
            backgroundColor: '#333',
            borderRadius: '8px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}>
            {/* Using standard img tag */}
            <img 
              src={`${basePath}/images/mapgenie.jpg`}
              alt="MapGenie Interactive Map"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                opacity: 0.5
              }}
            />
            {/* Text overlay on image */}
            <div style={{ 
              position: 'absolute', 
              zIndex: 2,
              textAlign: 'center'
            }}>
              <p style={{ 
                color: 'white', 
                fontSize: '1.3rem', 
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)'
              }}>
                Interactive World Map
              </p>
            </div>
          </div>
          <p style={{ color: '#aaa', marginBottom: '15px' }}>
            Find all alchemy ingredients and brewing locations on the interactive map.
          </p>
          <a 
            href="https://mapgenie.io/kingdom-come-deliverance-2" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#4a4a4a',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
          >
            Open Interactive Map
          </a>
        </motion.div>
        
        {/* Second modal - Brewing button (whole card clickable) */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => router.push('/potions')}
          style={{ 
            width: '400px',
            backgroundColor: '#222',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background image with overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}>
            {/* Using standard img tag */}
            <img 
              src={`${basePath}/images/temp.png`}
              alt="Potion Background"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.3
              }}
            />
            {/* Dark overlay on the image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1
            }}></div>
          </div>
          
          {/* Content on top of background */}
          <div style={{
            position: 'relative', 
            zIndex: 2,
            width: '100%',
            padding: '50px 20px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '10px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              Get to brewing you beautiful bastard
            </h2>
            <p style={{ color: '#ccc', fontSize: '1.1rem' }}>
              Learn how to craft potions and elixirs
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
