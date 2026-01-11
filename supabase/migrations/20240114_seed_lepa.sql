-- Seed Lepa Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Lepa',
  'lepa', 
  'dosage', 
  'Pastes for external application',
  '
### How Lepa (Ayurvedic Medicinal Paste) Is Prepared

#### 1. Selection and Preparation of Ingredients
- Choose the required herbs, minerals, or animal products as per the formulation.
- If using fresh herbs, clean and pound them directly to a fine paste.
- If using dried herbs, powder them finely (using a mortar and pestle or grinder) and sieve for uniformity.

#### 2. Mixing with Liquid Medium
- Place the powdered or fresh ingredients in a mortar.
- Add a suitable liquid to achieve paste consistency. Common liquids include water, milk, herbal decoctions (*kwatha*), ghee, oil, or other specified media, depending on the therapeutic need.
- The quantity of liquid should be just enough to make a smooth, spreadable paste—not too runny or too dry.

#### 3. Trituration
- Grind (triturate) the mixture thoroughly until a uniform, smooth paste is formed. This ensures even distribution of all ingredients and enhances efficacy.

#### 4. Proportion of Sneha (Oily Substance)
- For certain conditions, ghee or oil is added in specific proportions:
  - 1/4th part for *Vata* disorders
  - 1/6th part for *Pitta* disorders
  - 1/8th part for *Kapha* disorders

#### 5. Application
- Cleanse the affected skin area.
- Apply the lepa paste in the prescribed thickness (typically 1/4 to 1/2 angula, about 0.5–1 cm) against the direction of hair growth for better absorption.
- Allow it to dry and act, then remove as directed.

### Summary Table

| Step | Description |
| :--- | :--- |
| **Ingredient Prep** | Clean, powder or paste herbs/minerals/animal products |
| **Mixing** | Add suitable liquid (water, milk, decoction, ghee, oil, etc.) |
| **Trituration** | Grind to a smooth, uniform paste |
| **Sneha Addition** | Add ghee/oil in proportion if required for dosha-specific lepas |
| **Application** | Apply to cleansed skin, in proper thickness, and remove after drying |

**Key Points:**
- Lepa is always freshly prepared and used externally.
- The choice of liquid and sneha (oil/ghee) depends on the disease and dosha involved.
- The process is simple but must be done with care for safety and efficacy.

### Common Lepa Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Avalgujadi Lepa | Avalgujadi Lepa | *Psoralea corylifolia* (Bakuchi), others |
| Kachuradi Lepa | Kachuradi Lepa | *Curcuma zedoaria* (Kachura), others |
| Kalaka Lepa | Kalaka Lepa | *Terminalia chebula* (Haritaki), others |
| Grhadhumadi Lepa | Grhadhumadi Lepa | Grhadhuma (House soot), others |
| Tutthadi Lepa | Tutthadi Lepa | Copper sulfate (Tuttha), others |
| Dashanga Lepa | Dashanga Lepa | *Albizia lebbeck*, *Glycyrrhiza glabra*, *Valeriana wallichii*, *Santalum album*, *Elettaria cardamomum*, *Nardostachys jatamansi*, *Curcuma longa*, *Berberis aristata*, *Saussurea costus*, *Acacia catechu* |
| Rasanadi Lepa | Rasanadi Lepa | *Pluchea lanceolata* (Rasna), others |
| Pathadi Lepa | Pathadi Lepa | *Cissampelos pareira* (Patha), others |
| Shothagna Lepa | Anti-inflammatory Lepa | *Boerhavia diffusa* (Punarnava), *Cedrus deodara*, *Zingiber officinale*, *Brassica campestris*, *Moringa oleifera* |
| Vishaghna Lepa | Anti-poison Lepa | *Azadirachta indica* (Neem), *Curcuma longa*, others |
| Manjishtadi Lepa | Manjishtadi Lepa | *Rubia cordifolia* (Manjishta), others |
| Jatiphaladi Lepa | Jatiphaladi Lepa | *Myristica fragrans* (Jatiphala), others |
| Shalmali Kantaka Lepa | Shalmali Kantaka Lepa | *Bombax ceiba* (Shalmali), others |
| Arjunadi Lepa | Arjunadi Lepa | *Terminalia arjuna* (Arjuna), others |
| Kadhiradi Lepa | Kadhiradi Lepa | *Acacia catechu* (Khadira), others |
| Kukkutanda Twak Lepa | Eggshell Lepa | Eggshell (Calcium carbonate), others |
| Rasanjana Lepa | Rasanjana Lepa | *Berberis aristata* (Rasanjana), others |
| Gandhakadi Lepa | Gandhakadi Lepa | Sulphur (Gandhaka), others |
| Haridra Lepa | Turmeric Lepa | *Curcuma longa* (Haridra) |
| Yashtimadhu Lepa | Licorice Lepa | *Glycyrrhiza glabra* (Yashtimadhu) |
| Aragwadhadi Lepa | Aragwadhadi Lepa | *Cassia fistula* (Aragwadha), others |

> **Notes:**
> - Many Lepas are polyherbal; only principal or eponymous scientific names are listed.
> - Lepas may also contain minerals (e.g., Tuttha-copper sulfate, Gandhaka-sulphur) and animal products (e.g., eggshell).
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Lepa Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Avalgujadi Lepa', 'avalgujadi-lepa', 'Lepa', 'A traditional Avalgujadi Lepa formulation prepared with Psoralea corylifolia (Bakuchi), others.', ARRAY['General Wellness']),
  ('Kachuradi Lepa', 'kachuradi-lepa', 'Lepa', 'A traditional Kachuradi Lepa formulation prepared with Curcuma zedoaria (Kachura), others.', ARRAY['General Wellness']),
  ('Kalaka Lepa', 'kalaka-lepa', 'Lepa', 'A traditional Kalaka Lepa formulation prepared with Terminalia chebula (Haritaki), others.', ARRAY['General Wellness']),
  ('Grhadhumadi Lepa', 'grhadhumadi-lepa', 'Lepa', 'A traditional Grhadhumadi Lepa formulation prepared with Grhadhuma (House soot), others.', ARRAY['General Wellness']),
  ('Tutthadi Lepa', 'tutthadi-lepa', 'Lepa', 'A traditional Tutthadi Lepa formulation prepared with Copper sulfate (Tuttha), others.', ARRAY['General Wellness']),
  ('Dashanga Lepa', 'dashanga-lepa', 'Lepa', 'A traditional Dashanga Lepa formulation prepared with Albizia lebbeck, Glycyrrhiza glabra, Valeriana wallichii, Santalum album, Elettaria cardamomum, Nardostachys jatamansi, Curcuma longa, Berberis aristata, Saussurea costus, Acacia catechu.', ARRAY['General Wellness']),
  ('Rasanadi Lepa', 'rasanadi-lepa', 'Lepa', 'A traditional Rasanadi Lepa formulation prepared with Pluchea lanceolata (Rasna), others.', ARRAY['General Wellness']),
  ('Pathadi Lepa', 'pathadi-lepa', 'Lepa', 'A traditional Pathadi Lepa formulation prepared with Cissampelos pareira (Patha), others.', ARRAY['General Wellness']),
  ('Shothagna Lepa', 'shothagna-lepa', 'Lepa', 'A traditional Anti-inflammatory Lepa formulation prepared with Boerhavia diffusa (Punarnava), Cedrus deodara, Zingiber officinale, Brassica campestris, Moringa oleifera.', ARRAY['General Wellness']),
  ('Vishaghna Lepa', 'vishaghna-lepa', 'Lepa', 'A traditional Anti-poison Lepa formulation prepared with Azadirachta indica (Neem), Curcuma longa, others.', ARRAY['General Wellness']),
  ('Manjishtadi Lepa', 'manjishtadi-lepa', 'Lepa', 'A traditional Manjishtadi Lepa formulation prepared with Rubia cordifolia (Manjishta), others.', ARRAY['General Wellness']),
  ('Jatiphaladi Lepa', 'jatiphaladi-lepa', 'Lepa', 'A traditional Jatiphaladi Lepa formulation prepared with Myristica fragrans (Jatiphala), others.', ARRAY['General Wellness']),
  ('Shalmali Kantaka Lepa', 'shalmali-kantaka-lepa', 'Lepa', 'A traditional Shalmali Kantaka Lepa formulation prepared with Bombax ceiba (Shalmali), others.', ARRAY['General Wellness']),
  ('Arjunadi Lepa', 'arjunadi-lepa', 'Lepa', 'A traditional Arjunadi Lepa formulation prepared with Terminalia arjuna (Arjuna), others.', ARRAY['General Wellness']),
  ('Kadhiradi Lepa', 'kadhiradi-lepa', 'Lepa', 'A traditional Kadhiradi Lepa formulation prepared with Acacia catechu (Khadira), others.', ARRAY['General Wellness']),
  ('Kukkutanda Twak Lepa', 'kukkutanda-twak-lepa', 'Lepa', 'A traditional Eggshell Lepa formulation prepared with Eggshell (Calcium carbonate), others.', ARRAY['General Wellness']),
  ('Rasanjana Lepa', 'rasanjana-lepa', 'Lepa', 'A traditional Rasanjana Lepa formulation prepared with Berberis aristata (Rasanjana), others.', ARRAY['General Wellness']),
  ('Gandhakadi Lepa', 'gandhakadi-lepa', 'Lepa', 'A traditional Gandhakadi Lepa formulation prepared with Sulphur (Gandhaka), others.', ARRAY['General Wellness']),
  ('Haridra Lepa', 'haridra-lepa', 'Lepa', 'A traditional Turmeric Lepa formulation prepared with Curcuma longa (Haridra).', ARRAY['General Wellness']),
  ('Yashtimadhu Lepa', 'yashtimadhu-lepa', 'Lepa', 'A traditional Licorice Lepa formulation prepared with Glycyrrhiza glabra (Yashtimadhu).', ARRAY['General Wellness']),
  ('Aragwadhadi Lepa', 'aragwadhadi-lepa', 'Lepa', 'A traditional Aragwadhadi Lepa formulation prepared with Cassia fistula (Aragwadha), others.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
