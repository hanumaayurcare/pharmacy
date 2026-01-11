-- Seed Avaleha Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Avaleha',
  'avaleha', 
  'dosage', 
  'Semi-solid jams',
  '
### How Avaleha (Ayurvedic Herbal Jam) Is Prepared

#### 1. Preparation of Liquid Base
- Prepare the herbal decoction (*Kwatha*), juice (*Swarasa*), or other prescribed liquid by boiling the herbs in water and reducing to the required volume.

#### 2. Addition and Dissolution of Sweeteners
- Add jaggery (*guda*), sugar (*sharkara*), or sugar candy (*khanda sharkara*) to the liquid base.
- Heat gently with continuous stirring until the sweetener dissolves completely and forms a syrup with thread-like consistency (1–2 threads when pressed between fingers).

#### 3. Addition of Herbal Paste (Kalka)
- Add the prescribed herbal paste or powder (*kalka dravya*) to the syrupy mass and continue heating with stirring.
- Maintain mild to moderate heat, ensuring the mixture thickens and attains the classical *paka siddhi lakshana* (proper consistency and texture).

#### 4. Addition of Ghee or Oil (If Specified)
- If the formulation requires, add ghee or oil before the final stage of thickening.

#### 5. Addition of Prakshepa Dravyas (Condiments/Adjuvants)
- Once the mixture reaches the desired consistency and is removed from heat, add fine powders of aromatic or heat-sensitive herbs (*prakshepa dravyas*) and stir well to form a homogenous blend.
- If honey is included, add it only after the mixture cools below 60°C to preserve its properties.

#### 6. Cooling and Packaging
- Allow the Avaleha to cool completely.
- Pack in clean, airtight containers, label with preparation details, and store in a cool, dry place.

**Key Points:**
- Proper Avaleha is semisolid, forms threads when pressed, and sinks in water (indicating correct viscosity).
- Aromatic and volatile ingredients are added after removing from heat to prevent loss of efficacy.
- Industrial preparation uses steam-jacketed vessels and mechanical mixers for large batches.

### Summary Table

| Step | Description |
| :--- | :--- |
| Prepare liquid base | Make decoction or juice from herbs |
| Add & dissolve sweetener | Add jaggery/sugar, heat to syrup with thread consistency |
| Add herbal paste/powder | Mix in kalka, heat and stir to thicken |
| Add ghee/oil (if needed) | Add before final thickening |
| Add prakshepa dravyas | Add aromatic/adjuvant powders after removing from heat |
| Add honey (if needed) | Add after cooling below 60°C |
| Cool & package | Fill in airtight containers after cooling |

This process ensures Avaleha is palatable, stable, and therapeutically effective.

### Common Avaleha Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Chyavanaprasha | Chyawanprash | *Emblica officinalis* (Amla) |
| Drakshavaleha | Draksha Avaleha | *Vitis vinifera* (Grape) |
| Vasavaleha | Vasavaleha | *Adhatoda vasica* (Vasa) |
| Kantakaryavaleha | Kantakari Avaleha | *Solanum xanthocarpum* (Kantakari) |
| Kushmandavaleha | Kushmanda Avaleha | *Benincasa hispida* (Kushmanda/Ash gourd) |
| Haridrakhanda | Haridra Khanda | *Curcuma longa* (Haridra/Turmeric) |
| Agastya Haritaki Avaleha | Agastya Haritaki Avaleha | *Terminalia chebula* (Haritaki), *Sesbania grandiflora* (Agastya) |
| Danti Haritaki Avaleha | Danti Haritaki Avaleha | *Baliospermum montanum* (Danti), *Terminalia chebula* |
| Vyaghri Haritaki Avaleha | Vyaghri Haritaki Avaleha | *Solanum xanthocarpum* (Vyaghri), *Terminalia chebula* |
| Kutajavaleha | Kutaja Avaleha | *Holarrhena antidysenterica* (Kutaja) |
| Pippalyasava Avaleha | Pippalyasava Avaleha | *Piper longum* (Pippali) |
| Dashamoola Haritaki Avaleha | Dashamoola Haritaki Avaleha | Dashamoola (ten roots), *Terminalia chebula* |
| Shatavari Guda/Avaleha | Shatavari Avaleha | *Asparagus racemosus* (Shatavari) |
| Brahma Rasayana | Brahma Rasayana | *Emblica officinalis* (Amla), *T. chebula*, *T. bellirica*, others |
| Bhallataka Avaleha | Bhallataka Avaleha | *Semecarpus anacardium* (Bhallataka) |
| Amritaprasha Avaleha | Amritaprasha Avaleha | *Tinospora cordifolia* (Amrita/Guduchi) |
| Shringyadi Avaleha | Shringyadi Avaleha | *Inula racemosa* (Shringi), others |
| Dashamoolavaleha | Dashamoola Avaleha | Dashamoola (ten roots) |
| Badam Pak | Badam Pak | *Prunus amygdalus* (Almond) |
| Saubhagyashunthi Pak | Saubhagya Shunthi Pak | *Zingiber officinale* (Shunthi/Ginger), others |
| Dadimavaleha | Dadima Avaleha | *Punica granatum* (Dadima/Pomegranate) |
| Kalyanak Guda | Kalyanak Guda | Polyherbal, includes *Emblica officinalis* (Amla) |
| Puga Khanda/Supari Pak | Supari Pak | *Areca catechu* (Puga/Supari) |

> **Notes:**
> - Many Avaleha are polyherbal; only principal or eponymous scientific names are listed.
> - The base is typically jaggery, sugar, or honey, with herbal decoctions and pastes.
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Avaleha Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Chyavanaprasha', 'chyavanaprasha', 'Avaleha', 'A traditional Chyawanprash formulation prepared with Emblica officinalis (Amla).', ARRAY['General Wellness']),
  ('Drakshavaleha', 'drakshavaleha', 'Avaleha', 'A traditional Draksha Avaleha formulation prepared with Vitis vinifera (Grape).', ARRAY['General Wellness']),
  ('Vasavaleha', 'vasavaleha', 'Avaleha', 'A traditional Vasavaleha formulation prepared with Adhatoda vasica (Vasa).', ARRAY['General Wellness']),
  ('Kantakaryavaleha', 'kantakaryavaleha-avaleha', 'Avaleha', 'A traditional Kantakari Avaleha formulation prepared with Solanum xanthocarpum (Kantakari).', ARRAY['General Wellness']),
  ('Kushmandavaleha', 'kushmandavaleha', 'Avaleha', 'A traditional Kushmanda Avaleha formulation prepared with Benincasa hispida (Kushmanda/Ash gourd).', ARRAY['General Wellness']),
  ('Haridrakhanda', 'haridrakhanda', 'Avaleha', 'A traditional Haridra Khanda formulation prepared with Curcuma longa (Haridra/Turmeric).', ARRAY['General Wellness']),
  ('Agastya Haritaki Avaleha', 'agastya-haritaki-avaleha', 'Avaleha', 'A traditional Agastya Haritaki Avaleha formulation prepared with Terminalia chebula (Haritaki), Sesbania grandiflora (Agastya).', ARRAY['General Wellness']),
  ('Danti Haritaki Avaleha', 'danti-haritaki-avaleha', 'Avaleha', 'A traditional Danti Haritaki Avaleha formulation prepared with Baliospermum montanum (Danti), Terminalia chebula.', ARRAY['General Wellness']),
  ('Vyaghri Haritaki Avaleha', 'vyaghri-haritaki-avaleha', 'Avaleha', 'A traditional Vyaghri Haritaki Avaleha formulation prepared with Solanum xanthocarpum (Vyaghri), Terminalia chebula.', ARRAY['General Wellness']),
  ('Kutajavaleha', 'kutajavaleha', 'Avaleha', 'A traditional Kutaja Avaleha formulation prepared with Holarrhena antidysenterica (Kutaja).', ARRAY['General Wellness']),
  ('Pippalyasava Avaleha', 'pippalyasava-avaleha', 'Avaleha', 'A traditional Pippalyasava Avaleha formulation prepared with Piper longum (Pippali).', ARRAY['General Wellness']),
  ('Dashamoola Haritaki Avaleha', 'dashamoola-haritaki-avaleha', 'Avaleha', 'A traditional Dashamoola Haritaki Avaleha formulation prepared with Dashamoola (ten roots), Terminalia chebula.', ARRAY['General Wellness']),
  ('Shatavari Guda', 'shatavari-guda', 'Avaleha', 'A traditional Shatavari Avaleha formulation prepared with Asparagus racemosus (Shatavari).', ARRAY['General Wellness']),
  ('Brahma Rasayana', 'brahma-rasayana', 'Avaleha', 'A traditional Brahma Rasayana formulation prepared with Emblica officinalis (Amla), T. chebula, others.', ARRAY['General Wellness']),
  ('Bhallataka Avaleha', 'bhallataka-avaleha', 'Avaleha', 'A traditional Bhallataka Avaleha formulation prepared with Semecarpus anacardium (Bhallataka).', ARRAY['General Wellness']),
  ('Amritaprasha Avaleha', 'amritaprasha-avaleha', 'Avaleha', 'A traditional Amritaprasha Avaleha formulation prepared with Tinospora cordifolia (Amrita/Guduchi).', ARRAY['General Wellness']),
  ('Shringyadi Avaleha', 'shringyadi-avaleha', 'Avaleha', 'A traditional Shringyadi Avaleha formulation prepared with Inula racemosa (Shringi), others.', ARRAY['General Wellness']),
  ('Dashamoolavaleha', 'dashamoolavaleha', 'Avaleha', 'A traditional Dashamoola Avaleha formulation prepared with Dashamoola (ten roots).', ARRAY['General Wellness']),
  ('Badam Pak', 'badam-pak', 'Avaleha', 'A traditional Badam Pak formulation prepared with Prunus amygdalus (Almond).', ARRAY['General Wellness']),
  ('Saubhagyashunthi Pak', 'saubhagyashunthi-pak', 'Avaleha', 'A traditional Saubhagya Shunthi Pak formulation prepared with Zingiber officinale (Shunthi/Ginger).', ARRAY['General Wellness']),
  ('Dadimavaleha', 'dadimavaleha', 'Avaleha', 'A traditional Dadima Avaleha formulation prepared with Punica granatum (Dadima/Pomegranate).', ARRAY['General Wellness']),
  ('Kalyanak Guda', 'kalyanak-guda', 'Avaleha', 'A traditional Kalyanak Guda formulation prepared with Polyherbal, includes Emblica officinalis (Amla).', ARRAY['General Wellness']),
  ('Puga Khanda/Supari Pak', 'puga-khandasupari-pak', 'Avaleha', 'A traditional Supari Pak formulation prepared with Areca catechu (Puga/Supari).', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
