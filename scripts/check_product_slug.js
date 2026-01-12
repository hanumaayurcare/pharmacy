
/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

try {
  const envConfig = fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (e) {
  console.warn('Could not read .env.local file', e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProduct() {
  const slug = 'chyavanaprasha';
  console.log(`Checking for slug: "${slug}"`);
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error finding slug:', error);
    
    // Try to find by name to see what the slug actually is
    const { data: nameData } = await supabase
        .from('products')
        .select('id, name, slug')
        .ilike('name', '%Chyavanaprash%')
        .limit(5);
        
    console.log('Did you mean one of these?', nameData);
  } else {
    console.log('Found product:', data);
  }
}

checkProduct();
