-- Seed Ghrita Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Ghrita',
  'ghrita', 
  'dosage', 
  'Medicated ghee preparations',
  '
### How Ghrita (Medicated Ghee) Is Prepared

#### 1. Preparation of Ingredients
- **Ghee (Ghrita):** Use pure, preferably cow’s ghee.
- **Kalka:** Prepare a fine paste of the prescribed herbs.
- **Drava Dravya (Liquid):** Prepare the specified liquid, usually a herbal decoction (*kwatha*), juice, milk, or water.

#### 2. Proportion of Ingredients
- If not otherwise specified, the classical ratio is:
  - 1 part *Kalka* (herbal paste)
  - 4 parts *Ghee*
  - 16 parts *Drava Dravya* (liquid)

#### 3. Mixing
- In a wide-mouthed vessel, add the ghee, then the herbal paste, then the liquid.

#### 4. Cooking (Ghrita Paka)
- Heat the mixture over a mild to moderate flame.
- Stir continuously to prevent sticking or burning.
- Continue boiling until all water content evaporates and only the ghee remains. This is confirmed when:
  - The frothing and crackling sound stops.
  - The herbal paste forms a soft bolus between the fingers.
  - The mixture emits the characteristic aroma and color of finished ghrita.

#### 5. Filtration
- While still warm, filter the ghrita through a clean cloth to remove solid residues.

#### 6. Cooling and Storage
- Allow the medicated ghee to cool completely.
- Store in airtight containers, protected from light and moisture.

### Summary Table

| Step | Description |
| :--- | :--- |
| **Ingredient Prep** | Prepare ghee, herbal paste (*kalka*), and liquid (*drava dravya*) |
| **Mixing** | Combine all in a vessel in prescribed ratio |
| **Cooking** | Heat with stirring until water evaporates and only ghee remains |
| **Filtration** | Filter warm ghrita to remove herbal residues |
| **Cooling & Storage** | Cool and store in airtight containers |

**Key Points:**
- Both fat-soluble and water-soluble active herbal compounds are incorporated into the ghee.
- The process must be done on mild to medium heat to avoid burning and ensure proper extraction.
- The final product should be free from moisture and have a uniform texture and aroma.

### Common Ghrita Formulations

| Sanskrit Name | Common/English Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Brahmi Ghrita | Brahmi Ghee | *Bacopa monnieri* |
| Dhatryadi Ghrita | Dhatri Ghee | *Emblica officinalis*, *Asparagus racemosus*, *Glycyrrhiza glabra*, etc. |
| Panchatikta Ghrita | Panchatikta Ghee | *Azadirachta indica* (Neem), *Tinospora cordifolia*, *Trichosanthes dioica*, etc. |
| Mahatiktaka Ghrita | Mahatiktaka Ghee | Polyherbal, mainly bitter herbs |
| Triphala Ghrita | Triphala Ghee | *Emblica officinalis*, *Terminalia chebula*, *Terminalia bellirica* |
| Saraswata Ghrita | Saraswata Ghee | *Bacopa monnieri*, *Acorus calamus*, *Saussurea lappa*, others |
| Jatyadi Ghrita | Jatyadi Ghee | *Jasminum officinale* (Jati), *Azadirachta indica* (Neem), *Curcuma longa*, others |
| Guggulutiktaka Ghrita | Guggulutiktaka Ghee | *Commiphora wightii* (Guggulu), bitter herbs |
| Kalyanaka Ghrita | Kalyanaka Ghee | Polyherbal, includes *Emblica officinalis*, *T. chebula*, *T. bellirica*, others |
| Dadimadi Ghrita | Dadimadi Ghee | *Punica granatum* (Pomegranate), others |
| Kshirabala Ghrita | Kshirabala Ghee | *Sida cordifolia* (Bala), milk |
| Phal Ghrita | Phal Ghee | Polyherbal, includes *Asparagus racemosus* (Shatavari), others |
| Asthishrinkhala Ghrita | Asthishrinkhala Ghee | *Cissus quadrangularis* (Asthishrinkhala) |
| Suvarna Siddha Ghrita | Suvarna Siddha Ghee | Gold (Suvarna), polyherbal |
| Jeevaniya Ghrita | Jeevaniya Ghee | Polyherbal (rejuvenating herbs) |
| Amrita Ghrita | Amrita Ghee | *Tinospora cordifolia* (Amrita) |
| Shatadhauta Ghrita | Shatadhauta Ghee | Cow ghee, repeatedly washed (no herbs) |
| Sthiradi Ghrita | Sthiradi Ghee | *Desmodium gangeticum* (Shalaparni), others |
| Swadanstradi Ghrita | Swadanstradi Ghee | Polyherbal |
| Haritakyadi Ghrita | Haritakyadi Ghee | *Terminalia chebula* (Haritaki) |
| Drakshadi Ghrita | Drakshadi Ghee | *Vitis vinifera* (Draksha/Grape) |
| Kasherukadi Ghrita | Kasherukadi Ghee | Polyherbal |
| Trivritadi Ghrita | Trivritadi Ghee | *Operculina turpethum* (Trivrit) |
| Nagdantyadi Ghrita | Nagdantyadi Ghee | *Nagadamani* (Aristolochia indica), others |
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Ghrita Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Brahmi Ghrita', 'brahmi-ghrita', 'Ghrita', 'A traditional Brahmi Ghee formulation prepared with Bacopa monnieri.', ARRAY['General Wellness']),
  ('Dhatryadi Ghrita', 'dhatryadi-ghrita', 'Ghrita', 'A traditional Dhatri Ghee formulation prepared with Emblica officinalis (Amla), Asparagus racemosus, Glycyrrhiza glabra (Yashtimadhu), Saccharum officinarum (Sugarcane), Santalum album (Sandalwood).', ARRAY['General Wellness']),
  ('Panchatikta Ghrita', 'panchatikta-ghrita', 'Ghrita', 'A traditional Panchatikta Ghee formulation prepared with Azadirachta indica (Neem), Tinospora cordifolia, Trichosanthes dioica, Solanum xanthocarpum, Adhatoda vasica.', ARRAY['General Wellness']),
  ('Mahatiktaka Ghrita', 'mahatiktaka-ghrita', 'Ghrita', 'A traditional Mahatiktaka Ghee formulation prepared with Polyherbal, mainly bitter herbs.', ARRAY['General Wellness']),
  ('Triphala Ghrita', 'triphala-ghrita', 'Ghrita', 'A traditional Triphala Ghee formulation prepared with Emblica officinalis, Terminalia chebula, Terminalia bellirica.', ARRAY['General Wellness']),
  ('Saraswata Ghrita', 'saraswata-ghrita', 'Ghrita', 'A traditional Saraswata Ghee formulation prepared with Bacopa monnieri, Acorus calamus, Saussurea lappa, others.', ARRAY['General Wellness']),
  ('Jatyadi Ghrita', 'jatyadi-ghrita', 'Ghrita', 'A traditional Jatyadi Ghee formulation prepared with Jasminum officinale (Jati), Azadirachta indica (Neem), Curcuma longa (Turmeric), others.', ARRAY['General Wellness']),
  ('Guggulutiktaka Ghrita', 'guggulutiktaka-ghrita', 'Ghrita', 'A traditional Guggulutiktaka Ghee formulation prepared with Commiphora wightii (Guggulu), bitter herbs.', ARRAY['General Wellness']),
  ('Kalyanaka Ghrita', 'kalyanaka-ghrita', 'Ghrita', 'A traditional Kalyanaka Ghee formulation prepared with Polyherbal, includes Emblica officinalis, Terminalia chebula, Terminalia bellirica, others.', ARRAY['General Wellness']),
  ('Dadimadi Ghrita', 'dadimadi-ghrita', 'Ghrita', 'A traditional Dadimadi Ghee formulation prepared with Punica granatum (Pomegranate), others.', ARRAY['General Wellness']),
  ('Kshirabala Ghrita', 'kshirabala-ghrita', 'Ghrita', 'A traditional Kshirabala Ghee formulation prepared with Sida cordifolia (Bala), milk.', ARRAY['General Wellness']),
  ('Phal Ghrita', 'phal-ghrita', 'Ghrita', 'A traditional Phal Ghee formulation prepared with Polyherbal, includes Asparagus racemosus (Shatavari), others.', ARRAY['General Wellness']),
  ('Asthishrinkhala Ghrita', 'asthishrinkhala-ghrita', 'Ghrita', 'A traditional Asthishrinkhala Ghee formulation prepared with Cissus quadrangularis (Asthishrinkhala).', ARRAY['General Wellness']),
  ('Suvarna Siddha Ghrita', 'suvarna-siddha-ghrita', 'Ghrita', 'A traditional Suvarna Siddha Ghee formulation prepared with Gold (Suvarna), polyherbal.', ARRAY['General Wellness']),
  ('Jeevaniya Ghrita', 'jeevaniya-ghrita', 'Ghrita', 'A traditional Jeevaniya Ghee formulation prepared with Polyherbal (rejuvenating herbs).', ARRAY['General Wellness']),
  ('Amrita Ghrita', 'amrita-ghrita', 'Ghrita', 'A traditional Amrita Ghee formulation prepared with Tinospora cordifolia (Amrita).', ARRAY['General Wellness']),
  ('Shatadhauta Ghrita', 'shatadhauta-ghrita', 'Ghrita', 'A traditional Shatadhauta Ghee formulation prepared with Cow ghee, repeatedly washed (no herbs).', ARRAY['General Wellness']),
  ('Sthiradi Ghrita', 'sthiradi-ghrita', 'Ghrita', 'A traditional Sthiradi Ghee formulation prepared with Desmodium gangeticum (Shalaparni), others.', ARRAY['General Wellness']),
  ('Swadanstradi Ghrita', 'swadanstradi-ghrita', 'Ghrita', 'A traditional Swadanstradi Ghee formulation prepared with Polyherbal.', ARRAY['General Wellness']),
  ('Haritakyadi Ghrita', 'haritakyadi-ghrita', 'Ghrita', 'A traditional Haritakyadi Ghee formulation prepared with Terminalia chebula (Haritaki).', ARRAY['General Wellness']),
  ('Drakshadi Ghrita', 'drakshadi-ghrita', 'Ghrita', 'A traditional Drakshadi Ghee formulation prepared with Vitis vinifera (Draksha/Grape).', ARRAY['General Wellness']),
  ('Kasherukadi Ghrita', 'kasherukadi-ghrita', 'Ghrita', 'A traditional Kasherukadi Ghee formulation prepared with Polyherbal.', ARRAY['General Wellness']),
  ('Trivritadi Ghrita', 'trivritadi-ghrita', 'Ghrita', 'A traditional Trivritadi Ghee formulation prepared with Operculina turpethum (Trivrit).', ARRAY['General Wellness']),
  ('Nagdantyadi Ghrita', 'nagdantyadi-ghrita', 'Ghrita', 'A traditional Nagdantyadi Ghee formulation prepared with Nagadamani (Aristolochia indica), others.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
