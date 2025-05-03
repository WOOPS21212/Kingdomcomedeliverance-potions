// Example script for enriching potion data using Task Master AI
// This is a demonstration of how to use Task Master AI to enhance potion data

import fs from 'fs';
import path from 'path';

// This is a mock implementation of the Task Master AI client
// In a real implementation, this would be replaced with actual API calls
class TaskMasterAIClient {
  constructor(config = {}) {
    this.config = {
      model: config.model || 'claude-3-7-sonnet-20250219',
      temperature: config.temperature || 0.2,
      maxTokens: config.maxTokens || 64000,
      ...config
    };
    console.log('Initialized Task Master AI client with config:', this.config);
  }

  async enrichData({ data, fields, context }) {
    console.log(`Enriching data with fields: ${fields.join(', ')}`);
    console.log(`Context: ${context}`);
    
    // In a real implementation, this would make an API call to the Task Master AI server
    // For demonstration, we'll just add placeholder enriched data
    return data.map(item => {
      const enriched = { ...item };
      
      if (fields.includes('enhancedEffects') && !item.enhancedEffects) {
        enriched.enhancedEffects = `When brewed with higher quality ingredients, this potion's effects are stronger and last longer.`;
      }
      
      if (fields.includes('acquisition') && !item.acquisition) {
        enriched.acquisition = `This recipe can be found in ${['monasteries', 'apothecaries', 'herbalists', 'treasure chests'][Math.floor(Math.random() * 4)]} throughout the game world.`;
      }
      
      return enriched;
    });
  }
}

// Main function to demonstrate the enrichment process
async function enrichPotionsData() {
  try {
    // Load the potion data
    const dataPath = path.join(process.cwd(), 'potions-data.json');
    const potionsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`Loaded ${potionsData.length} potions from ${dataPath}`);
    
    // Initialize the Task Master AI client
    const taskMasterAI = new TaskMasterAIClient({
      model: 'claude-3-7-sonnet-20250219',
      temperature: 0.2
    });
    
    // Enrich the potion data
    const enrichedData = await taskMasterAI.enrichData({
      data: potionsData,
      fields: ['enhancedEffects', 'acquisition'],
      context: 'medieval alchemy in Kingdom Come Deliverance'
    });
    
    console.log('Data enrichment complete!');
    
    // Save the enriched data
    const outputPath = path.join(process.cwd(), 'potions-data-enriched-example.json');
    fs.writeFileSync(outputPath, JSON.stringify(enrichedData, null, 2), 'utf8');
    
    console.log(`Saved enriched data to ${outputPath}`);
    console.log('In a real implementation, this would use the actual Task Master AI API');
    
    // Display a sample of the enriched data
    console.log('\nSample of enriched data:');
    console.log(JSON.stringify(enrichedData[0], null, 2));
    
  } catch (error) {
    console.error('Error enriching potion data:', error);
  }
}

// Run the enrichment process
enrichPotionsData().catch(console.error);

/*
To use this with the actual Task Master AI:

1. Start the Task Master AI server using the provided scripts
2. Replace the mock TaskMasterAIClient with the actual client
3. Update the API calls to match the Task Master AI API
4. Run this script with: node scripts/enrich-potions-example.js

This example demonstrates the pattern for integrating Task Master AI
into your workflow for data enrichment tasks.
*/
