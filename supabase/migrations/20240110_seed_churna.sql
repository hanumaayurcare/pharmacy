-- Seed Churna Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Churna',
  'churna', 
  'dosage', 
  'Powdered herb mixtures',
  '
### How Churna Are Prepared

#### 1. Selection and Sourcing of Raw Materials
- Medicinal herbs and other ingredients are sourced from certified suppliers or local farms.
- Only clean, authentic, and high-quality herbs are chosen, often after organoleptic and quality checks.

#### 2. Cleaning and Drying
- All ingredients are thoroughly cleaned to remove dust, dirt, and foreign matter.
- Ingredients are dried completely, often in shade or controlled conditions, to preserve active compounds and prevent spoilage.

#### 3. Pulverization (Grinding)
- Each dried ingredient is powdered separately using grinders, crushers, or pulverizers.
- The powder is passed through fine sieves (commonly mesh size 60–85) to ensure uniform fineness.

#### 4. Blending/Formulation
- The fine powders are accurately weighed and blended in specified proportions according to the classical or proprietary formula.
- Mixing is done in stainless steel or food-grade blenders to achieve a homogenous mixture.

#### 5. Quality Control
- The blended churna is tested for parameters like pH, total ash, extractive values, moisture content, and fineness.
- Only batches passing quality standards proceed to packaging.

#### 6. Packaging
- The final churna is packed in airtight containers (glass, plastic, or laminated pouches) to preserve potency and prevent moisture ingress.
- Containers are labeled with product details, batch number, and expiry date.

#### 7. Storage and Distribution
- Store in a cool, dry place away from sunlight to maintain efficacy.

### Summary Table

| Step | Description |
| :--- | :--- |
| **Selection** | Choose and authenticate raw herbs/ingredients |
| **Cleaning/Drying** | Clean and dry thoroughly |
| **Grinding** | Pulverize each ingredient separately, sieve to fine powder |
| **Blending** | Mix powders in exact proportions as per formula |
| **Quality Control** | Test for purity, potency, and physical parameters |
| **Packaging** | Pack in airtight, labeled containers |
| **Storage** | Store properly; distribute to market |

This process ensures Churna is pure, potent, and safe for consumption, adhering to Ayurvedic and modern quality standards.

### Common Churna Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Amalaki Churna | Amla Powder | *Emblica officinalis* |
| Ashwagandha Churna | Ashwagandha Powder | *Withania somnifera* |
| Ajamodadi Churna | Ajamodadi Powder | *Trachyspermum ammi* (Ajmoda) |
| Avipattikara Churna | Avipattikar Powder | Polyherbal (main: *Terminalia chebula*, *Emblica officinalis*, *Zingiber officinale*, etc.) |
| Balachaturbhadra Churna | Balachaturbhadra Powder | Polyherbal (main: *Aegle marmelos*, *Cyperus rotundus*, etc.) |
| Bilvadi Churna | Bilvadi Powder | *Aegle marmelos* (Bilva) |
| Dadimastaka Churna | Dadimastaka Powder | *Punica granatum* (Dadima) |
| Dashanasanskara Churna | Dashanasanskara Powder | Polyherbal (for oral/dental use) |
| Eladi Churna | Eladi Powder | *Elettaria cardamomum* (Ela) and others |
| Haritaki Churna | Haritaki Powder | *Terminalia chebula* |
| Hingvashtaka Churna | Hingvashtaka Powder | *Ferula asafoetida* (Hing) + others |
| Lavanabhaskara Churna | Lavanabhaskar Powder | Polyherbal (main: *Saindhava lavana*, *Zingiber officinale*, *Piper nigrum*, etc.) |
| Nisha-Amalaki Churna | Nisha-Amalaki Powder | *Curcuma longa* (Nisha), *Emblica officinalis* |
| Panchanimba Churna | Panchanimba Powder | *Azadirachta indica* (Nimba) and others |
| Pushyanuga Churna | Pushyanuga Powder | Polyherbal (main: *Ficus religiosa*, *Areca catechu*, etc.) |
| Sitopaladi Churna | Sitopaladi Powder | *Saccharum officinarum*, *Bambusa arundinacea*, *Piper longum*, etc. |
| Talishadi Churna | Talishadi Powder | *Abies webbiana* (Talisapatra) and others |
| Trikatu Churna | Trikatu Powder | *Zingiber officinale*, *Piper nigrum*, *Piper longum* |
| Triphala Churna | Triphala Powder | *Emblica officinalis*, *Terminalia chebula*, *Terminalia bellirica* |
| Jatiphaladya Churna | Jatiphaladya Powder | *Myristica fragrans* (Jatiphala) and others |
| Pippali Churna | Pippali Powder | *Piper longum* |
| Pippalimula Churna | Pippalimula Powder | *Piper longum* (root) |
| Punarnava Churna | Punarnava Powder | *Boerhavia diffusa* |
| Shunthi Churna | Dry Ginger Powder | *Zingiber officinale* |
| Sarasvata Churna | Sarasvata Powder | Polyherbal (main: *Bacopa monnieri*, *Acorus calamus*, etc.) |
| Trivritamul/Trivrita Churna | Trivrit Powder | *Operculina turpethum* |
| Vidanga Churna | Vidanga Powder | *Embelia ribes* |
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Churna Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Amalaki Churna', 'amalaki-churna', 'Churna', 'A traditional Amla Powder formulation prepared with Emblica officinalis.', ARRAY['General Wellness']),
  ('Ashwagandha Churna', 'ashwagandha-churna', 'Churna', 'A traditional Ashwagandha Powder formulation prepared with Withania somnifera.', ARRAY['General Wellness']),
  ('Ajamodadi Churna', 'ajamodadi-churna', 'Churna', 'A traditional Ajamodadi Powder formulation prepared with Trachyspermum ammi (Ajmoda).', ARRAY['General Wellness']),
  ('Avipattikara Churna', 'avipattikara-churna', 'Churna', 'A traditional Avipattikar Powder formulation prepared with Polyherbal (main: Terminalia chebula, Emblica officinalis, Zingiber officinale, etc.).', ARRAY['General Wellness']),
  ('Balachaturbhadra Churna', 'balachaturbhadra-churna', 'Churna', 'A traditional Balachaturbhadra Powder formulation prepared with Polyherbal (main: Aegle marmelos, Cyperus rotundus, etc.).', ARRAY['General Wellness']),
  ('Bilvadi Churna', 'bilvadi-churna', 'Churna', 'A traditional Bilvadi Powder formulation prepared with Aegle marmelos (Bilva).', ARRAY['General Wellness']),
  ('Dadimastaka Churna', 'dadimastaka-churna', 'Churna', 'A traditional Dadimastaka Powder formulation prepared with Punica granatum (Dadima).', ARRAY['General Wellness']),
  ('Dashanasanskara Churna', 'dashanasanskara-churna', 'Churna', 'A traditional Dashanasanskara Powder formulation prepared with Polyherbal (for oral/dental use).', ARRAY['General Wellness']),
  ('Eladi Churna', 'eladi-churna', 'Churna', 'A traditional Eladi Powder formulation prepared with Elettaria cardamomum (Ela) and others.', ARRAY['General Wellness']),
  ('Haritaki Churna', 'haritaki-churna', 'Churna', 'A traditional Haritaki Powder formulation prepared with Terminalia chebula.', ARRAY['General Wellness']),
  ('Hingvashtaka Churna', 'hingvashtaka-churna', 'Churna', 'A traditional Hingvashtaka Powder formulation prepared with Ferula asafoetida (Hing) + others.', ARRAY['General Wellness']),
  ('Lavanabhaskara Churna', 'lavanabhaskara-churna', 'Churna', 'A traditional Lavanabhaskar Powder formulation prepared with Polyherbal (main: Saindhava lavana, Zingiber officinale, Piper nigrum, etc.).', ARRAY['General Wellness']),
  ('Nisha-Amalaki Churna', 'nisha-amalaki-churna', 'Churna', 'A traditional Nisha-Amalaki Powder formulation prepared with Curcuma longa (Nisha), Emblica officinalis.', ARRAY['General Wellness']),
  ('Panchanimba Churna', 'panchanimba-churna', 'Churna', 'A traditional Panchanimba Powder formulation prepared with Azadirachta indica (Nimba) and others.', ARRAY['General Wellness']),
  ('Pushyanuga Churna', 'pushyanuga-churna', 'Churna', 'A traditional Pushyanuga Powder formulation prepared with Polyherbal (main: Ficus religiosa, Areca catechu, etc.).', ARRAY['General Wellness']),
  ('Sitopaladi Churna', 'sitopaladi-churna', 'Churna', 'A traditional Sitopaladi Powder formulation prepared with Saccharum officinarum, Bambusa arundinacea, Piper longum, etc.', ARRAY['General Wellness']),
  ('Talishadi Churna', 'talishadi-churna', 'Churna', 'A traditional Talishadi Powder formulation prepared with Abies webbiana (Talisapatra) and others.', ARRAY['General Wellness']),
  ('Trikatu Churna', 'trikatu-churna', 'Churna', 'A traditional Trikatu Powder formulation prepared with Zingiber officinale, Piper nigrum, Piper longum.', ARRAY['General Wellness']),
  ('Triphala Churna', 'triphala-churna', 'Churna', 'A traditional Triphala Powder formulation prepared with Emblica officinalis, Terminalia chebula, Terminalia bellirica.', ARRAY['General Wellness']),
  ('Jatiphaladya Churna', 'jatiphaladya-churna', 'Churna', 'A traditional Jatiphaladya Powder formulation prepared with Myristica fragrans (Jatiphala) and others.', ARRAY['General Wellness']),
  ('Pippali Churna', 'pippali-churna', 'Churna', 'A traditional Pippali Powder formulation prepared with Piper longum.', ARRAY['General Wellness']),
  ('Pippalimula Churna', 'pippalimula-churna', 'Churna', 'A traditional Pippalimula Powder formulation prepared with Piper longum (root).', ARRAY['General Wellness']),
  ('Punarnava Churna', 'punarnava-churna', 'Churna', 'A traditional Punarnava Powder formulation prepared with Boerhavia diffusa.', ARRAY['General Wellness']),
  ('Shunthi Churna', 'shunthi-churna', 'Churna', 'A traditional Dry Ginger Powder formulation prepared with Zingiber officinale.', ARRAY['General Wellness']),
  ('Sarasvata Churna', 'sarasvata-churna', 'Churna', 'A traditional Sarasvata Powder formulation prepared with Polyherbal (main: Bacopa monnieri, Acorus calamus, etc.).', ARRAY['General Wellness']),
  ('Trivrita Churna', 'trivrita-churna', 'Churna', 'A traditional Trivrit Powder formulation prepared with Operculina turpethum.', ARRAY['General Wellness']),
  ('Vidanga Churna', 'vidanga-churna', 'Churna', 'A traditional Vidanga Powder formulation prepared with Embelia ribes.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
