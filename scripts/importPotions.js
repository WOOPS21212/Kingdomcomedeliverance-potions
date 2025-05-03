// scripts/importPotions.js
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

// Configure the client
const client = createClient({
  projectId: 'v54tatoq',
  dataset: 'production',
  apiVersion: '2024-05-03', // Use today's date or your preferred version
  token: process.env.SANITY_TOKEN, // See https://www.sanity.io/docs/api-versioning for how to get a token
  useCdn: false, // We need to use the API directly for writes
});

// Import the JSON file
const potionsData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'potions-data.json'), 'utf8')
);

// Process and import each potion
async function importPotions() {
  console.log(`Importing ${potionsData.length} potions...`);
  
  const transaction = client.transaction();
  
  for (const potion of potionsData) {
    // Create a unique slug from the name
    const slug = slugify(potion.name, {lower: true, strict: true});
    
    // Create the document
    transaction.create({
      _type: 'potion',
      _id: `potion-${uuidv4()}`,
      name: potion.name,
      slug: {
        _type: 'slug',
        current: slug,
      },
      effects: potion.effects,
      difficulty: potion.difficulty || '',
      baseLiquid: potion.baseLiquid || '',
      ingredients: potion.ingredients,
      steps: potion.steps,
    });
    
    console.log(`Added potion: ${potion.name}`);
  }
  
  // Commit the transaction
  try {
    await transaction.commit();
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Import failed: ', error.message);
  }
}

// Run the import
importPotions().catch(console.error);
