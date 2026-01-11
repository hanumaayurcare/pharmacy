
insert into public.products (name, slug, dosage_form, therapeutic_categories, description, benefits, ingredients, usage_instructions, image_url)
values
  (
    'Hanuman Chyavanprash', 
    'hanuman-chyavanprash', 
    'Avaleha', 
    ARRAY['Immunity', 'General Wellness', 'Cold & Cough'],
    'A traditional Vedic formulation for boosting immunity and vitality.',
    ARRAY['Boosts immunity', 'Improves digestion', 'Anti-aging properties'],
    ARRAY['Amla', 'Ghee', 'Honey', 'Ashwagandha'],
    '1-2 teaspoons daily with warm milk.',
    '/images/products/chyavanprash.jpg'
  ),
  (
    'Ashwagandha Churna', 
    'ashwagandha-churna', 
    'Churna', 
    ARRAY['Mental Health', 'General Wellness'], 
    'Pure root powder for stress relief and strength.',
    ARRAY['Reduces stress', 'Improves sleep', 'Boosts energy'],
    ARRAY['Ashwagandha Root'],
    '3-6g with warm water or milk.',
    '/images/products/ashwagandha.jpg'
  ),
  (
    'Triphala Churna', 
    'triphala-churna', 
    'Churna', 
    ARRAY['Digestion & Gut', 'Eye Health'], 
    'Classic combination of three fruits for gentle detoxification.',
    ARRAY['Relieves constipation', 'Improves eye health', 'Antioxidant rich'],
    ARRAY['Amalaki', 'Bibhitaki', 'Haritaki'],
    '1 teaspoon at bedtime with warm water.',
    '/images/products/triphala.jpg'
  ),
  (
    'Brahmi Ghrita',
    'brahmi-ghrita',
    'Ghrita',
    ARRAY['Mental Health'],
    'Medicated ghee for enhancing memory and cognitive function.',
    ARRAY['Improves memory', 'Reduces mental fatigue', 'Calms the mind'],
    ARRAY['Brahmi', 'Ghee'],
    '10-20g empty stomach in the morning.',
    '/images/products/brahmi-ghrita.jpg'
  ),
  (
    'Kanchanara Guggulu',
    'kanchanara-guggulu',
    'Guggulu',
    ARRAY['Thyroid Health', 'Skin Health'],
    'Effective for glandular swellings and thyroid health.',
    ARRAY['Supports thyroid function', 'Reduces swelling', 'Purifies blood'],
    ARRAY['Kanchanara', 'Guggulu', 'Triphala', 'Trikatu'],
    '2 tablets twice daily with warm water.',
    '/images/products/kanchanara-guggulu.jpg'
  )
on conflict (slug) do nothing;
