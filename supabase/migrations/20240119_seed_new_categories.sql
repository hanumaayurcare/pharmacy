-- Seed Dosage Forms into public.categories
INSERT INTO public.categories (name, slug, type, description)
VALUES
  ('Asava and Arishta', 'asava-arishta', 'dosage', 'Fermented liquid preparations'),
  ('Churna', 'churna', 'dosage', 'Powdered herb mixtures'),
  ('Kwath', 'kwath', 'dosage', 'Decoctions'),
  ('Guggulu', 'guggulu', 'dosage', 'Resin-based formulations'),
  ('Vati and Gutika', 'vati-gutika', 'dosage', 'Tablets and pills'),
  ('Bhasma', 'bhasma', 'dosage', 'Calcined mineral preparations'),
  ('Taila', 'taila', 'dosage', 'Medicated oils'),
  ('Ghrita', 'ghrita', 'dosage', 'Medicated ghee preparations'),
  ('Lepa', 'lepa', 'dosage', 'Pastes for external application'),
  ('Avaleha', 'avaleha', 'dosage', 'Semi-solid preparations (like jams)')
ON CONFLICT (slug) DO UPDATE 
SET description = EXCLUDED.description,
    type = EXCLUDED.type;

-- Seed Therapeutic Categories into public.categories (as type='therapeutic')
INSERT INTO public.categories (name, slug, type)
VALUES
  ('Allergy', 'allergy', 'therapeutic'),
  ('Autoimmune', 'autoimmune', 'therapeutic'),
  ('Blood Disorders', 'blood-disorders', 'therapeutic'),
  ('Bone, Muscle, Joint Health', 'bone-muscle-joint', 'therapeutic'),
  ('Cold, Cough, Fever, Sinus', 'cold-cough-fever', 'therapeutic'),
  ('Digestion, Constipation & Gut Health', 'digestion-gut', 'therapeutic'),
  ('Eye Health', 'eye-health', 'therapeutic'),
  ('Female Health', 'female-health', 'therapeutic'),
  ('General', 'general', 'therapeutic'),
  ('Gynae Health', 'gynae-health', 'therapeutic'),
  ('Heart Care', 'heart-care', 'therapeutic'),
  ('Immunity', 'immunity', 'therapeutic'),
  ('Kidney Health', 'kidney-health', 'therapeutic'),
  ('Kids Health', 'kids-health', 'therapeutic'),
  ('Lifestyle disorders', 'lifestyle-disorders', 'therapeutic'),
  ('Liver Health', 'liver-health', 'therapeutic'),
  ('Male Health', 'male-health', 'therapeutic'),
  ('Mental Health', 'mental-health', 'therapeutic'),
  ('Old Age issues', 'old-age-issues', 'therapeutic'),
  ('Oral Health', 'oral-health', 'therapeutic'),
  ('Personal Care', 'personal-care', 'therapeutic'),
  ('Proteins, Vitamins & Minerals', 'proteins-vitamins', 'therapeutic'),
  ('Respiratory & Lung Health', 'respiratory-lung', 'therapeutic'),
  ('Sexual Health', 'sexual-health', 'therapeutic'),
  ('Skin Health', 'skin-health', 'therapeutic'),
  ('Urinary Health', 'urinary-health', 'therapeutic'),
  ('Weight Management', 'weight-management', 'therapeutic')
ON CONFLICT (slug) DO UPDATE
SET type = EXCLUDED.type;
