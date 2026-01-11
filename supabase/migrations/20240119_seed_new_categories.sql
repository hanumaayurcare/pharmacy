-- Seed Dosage Forms into shop.categories
INSERT INTO shop.categories (name, slug, description)
VALUES
  ('Asava and Arishta', 'asava-arishta', 'Fermented liquid preparations'),
  ('Churna', 'churna', 'Powdered herb mixtures'),
  ('Kwath', 'kwath', 'Decoctions'),
  ('Guggulu', 'guggulu', 'Resin-based formulations'),
  ('Vati and Gutika', 'vati-gutika', 'Tablets and pills'),
  ('Bhasma', 'bhasma', 'Calcined mineral preparations'),
  ('Taila', 'taila', 'Medicated oils'),
  ('Ghrita', 'ghrita', 'Medicated ghee preparations'),
  ('Lepa', 'lepa', 'Pastes for external application'),
  ('Avaleha', 'avaleha', 'Semi-solid preparations (like jams)')
ON CONFLICT (slug) DO UPDATE 
SET description = EXCLUDED.description;

-- Seed Therapeutic Categories into shop.health_solutions
INSERT INTO shop.health_solutions (name, slug)
VALUES
  ('Allergy', 'allergy'),
  ('Autoimmune', 'autoimmune'),
  ('Blood Disorders', 'blood-disorders'),
  ('Bone, Muscle, Joint Health', 'bone-muscle-joint'),
  ('Cold, Cough, Fever, Sinus', 'cold-cough-fever'),
  ('Digestion, Constipation & Gut Health', 'digestion-gut'),
  ('Eye Health', 'eye-health'),
  ('Female Health', 'female-health'),
  ('General', 'general'),
  ('Gynae Health', 'gynae-health'),
  ('Heart Care', 'heart-care'),
  ('Immunity', 'immunity'),
  ('Kidney Health', 'kidney-health'),
  ('Kids Health', 'kids-health'),
  ('Lifestyle disorders', 'lifestyle-disorders'),
  ('Liver Health', 'liver-health'),
  ('Male Health', 'male-health'),
  ('Mental Health', 'mental-health'),
  ('Old Age issues', 'old-age-issues'),
  ('Oral Health', 'oral-health'),
  ('Personal Care', 'personal-care'),
  ('Proteins, Vitamins & Minerals', 'proteins-vitamins'),
  ('Respiratory & Lung Health', 'respiratory-lung'),
  ('Sexual Health', 'sexual-health'),
  ('Skin Health', 'skin-health'),
  ('Urinary Health', 'urinary-health'),
  ('Weight Management', 'weight-management')
ON CONFLICT (slug) DO NOTHING;
