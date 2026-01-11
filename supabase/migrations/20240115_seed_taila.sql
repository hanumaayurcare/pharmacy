-- Seed Taila Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Taila',
  'taila', 
  'dosage', 
  'Medicated oils',
  '
### How Taila (Medicated Oil) Formulations Are Prepared

#### 1. Collection and Preparation of Ingredients
- Collect all required herbs, clean thoroughly, and dry if needed.
- Prepare:
  - **Kalka:** Fine paste of herbs.
  - **Kwatha/Drava Dravya:** Decoction or juice of herbs.
  - **Sneha Dravya:** Base oil (commonly sesame, coconut, or other specified oil).

#### 2. Preparation of Decoction (Kwatha)
- Coarsely powder the herbs and boil them in water (usually 16 parts water to 1 part herb) until reduced to one-fourth the original volume.
- Filter to obtain the decoction.

#### 3. Mixing
- In a wide-mouthed vessel, combine:
  - Base oil (*Sneha Dravya*)
  - Herbal decoction/juice (*Drava Dravya*)
  - Herbal paste (*Kalka Dravya*)
- The typical ratio is **1 part oil : 4 parts decoction : 1 part paste**.

#### 4. Boiling and Cooking
- Heat the mixture gently, stirring continuously to avoid sticking and burning.
- Continue boiling until all water content evaporates and only oil remains—this is confirmed by traditional tests (*Taila Siddhi Lakshana*) such as:
  - No frothing or crackling sound
  - Herbal paste forms a soft roll between fingers
  - Desired aroma and color appear.

#### 5. Filtration
- While still warm, filter the oil through a clean muslin cloth to remove residues and herbal paste.

#### 6. Cooling and Storage
- Allow the oil to cool completely.
- Store in airtight, preferably amber-colored bottles to protect from light and moisture.

### Summary Table

| Step | Description |
| :--- | :--- |
| **Ingredient Prep** | Clean, dry, and powder herbs; prepare base oil |
| **Decoction Prep** | Boil herbs in water, reduce, and filter to get decoction |
| **Mixing** | Combine oil, decoction, and herbal paste in defined ratio |
| **Boiling & Cooking** | Heat with stirring until water evaporates and oil is infused |
| **Filtration** | Filter hot oil to remove solid residues |
| **Cooling & Storage** | Cool and store in airtight, light-protected containers |

**Key Points:**
- The process ensures active herbal constituents are absorbed into the oil base for therapeutic use.
- Quality is checked by traditional and modern parameters before packaging.

### Common Taila Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Dhanvantara Taila | Dhanvantara Oil | *Sida cordifolia*, *Desmodium gangeticum*, *Prunus cerasoides* |
| Eranda Taila | Castor Oil | *Ricinus communis* (Castor) |
| Kshirbala Taila | Kshirbala Oil | *Sida cordifolia* (Bala) + Milk |
| Balashwagandhadi Taila | Balashwagandhadi Oil | *Withania somnifera*, *Sida cordifolia* |
| Jatyadi Taila | Jatyadi Oil | *Azadirachta indica* (Neem), *Curcuma longa* |
| Narayana Taila | Narayana Oil | *Sida cordifolia*, *Aegle marmelos* |
| Mahanarayan Taila | Mahanarayan Oil | *Sida cordifolia*, *Asparagus racemosus*, *Vitex negundo* |
| Kottamchukkadi Taila | Kottamchukkadi Oil | *Piper nigrum*, *Zingiber officinale*, *Cedrus deodara* |
| Chandanadi Taila | Sandalwood Oil | *Santalum album* (Sandalwood) |
| Kasisadi Taila | Kasisadi Oil | Ferrous sulfate (processed), *Berberis aristata* |
| Nalpamaradi Taila | Nalpamaradi Oil | *Ficus religiosa*, *Ficus benghalensis*, *Ficus racemosa* |
| Brihatsahacharadi Taila | Brihatsahacharadi Oil | *Vitex negundo*, *Desmodium gangeticum* |
| Panchaguna Taila | Panchaguna Oil | *Sesamum indicum* (Sesame) + 5 herbs |
| Gandharvahasta Taila | Gandharvahasta Oil | *Vitex negundo*, *Acorus calamus* |
| Bhringaraja Taila | Bhringaraj Oil | *Eclipta alba* (Bhringraj) |
| Apamarga Kshara Taila | Apamarga Alkaline Oil | *Achyranthes aspera* (Apamarga) ash |
| Ashvagandha Taila | Ashwagandha Oil | *Withania somnifera* |

> **Notes:**
> - Tailas are polyherbal in most cases; only principal ingredients are listed.
> - Base oils are typically sesame (*Sesamum indicum*) or coconut (*Cocos nucifera*).
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Taila Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Dhanvantara Taila', 'dhanvantara-taila', 'Taila', 'A traditional Dhanvantara Oil formulation prepared with Sida cordifolia, Desmodium gangeticum, Prunus cerasoides.', ARRAY['General Wellness']),
  ('Eranda Taila', 'eranda-taila', 'Taila', 'A traditional Castor Oil formulation prepared with Ricinus communis (Castor).', ARRAY['General Wellness']),
  ('Kshirbala Taila', 'kshirbala-taila', 'Taila', 'A traditional Kshirbala Oil formulation prepared with Sida cordifolia (Bala) + Milk.', ARRAY['General Wellness']),
  ('Balashwagandhadi Taila', 'balashwagandhadi-taila', 'Taila', 'A traditional Balashwagandhadi Oil formulation prepared with Withania somnifera, Sida cordifolia.', ARRAY['General Wellness']),
  ('Jatyadi Taila', 'jatyadi-taila', 'Taila', 'A traditional Jatyadi Oil formulation prepared with Azadirachta indica (Neem), Curcuma longa.', ARRAY['General Wellness']),
  ('Narayana Taila', 'narayana-taila', 'Taila', 'A traditional Narayana Oil formulation prepared with Sida cordifolia, Aegle marmelos.', ARRAY['General Wellness']),
  ('Mahanarayan Taila', 'mahanarayan-taila', 'Taila', 'A traditional Mahanarayan Oil formulation prepared with Sida cordifolia, Asparagus racemosus, Vitex negundo.', ARRAY['General Wellness']),
  ('Kottamchukkadi Taila', 'kottamchukkadi-taila', 'Taila', 'A traditional Kottamchukkadi Oil formulation prepared with Piper nigrum, Zingiber officinale, Cedrus deodara.', ARRAY['General Wellness']),
  ('Chandanadi Taila', 'chandanadi-taila', 'Taila', 'A traditional Sandalwood Oil formulation prepared with Santalum album (Sandalwood).', ARRAY['General Wellness']),
  ('Kasisadi Taila', 'kasisadi-taila', 'Taila', 'A traditional Kasisadi Oil formulation prepared with Ferrous sulfate (processed), Berberis aristata.', ARRAY['General Wellness']),
  ('Nalpamaradi Taila', 'nalpamaradi-taila', 'Taila', 'A traditional Nalpamaradi Oil formulation prepared with Ficus religiosa, Ficus benghalensis, Ficus racemosa.', ARRAY['General Wellness']),
  ('Brihatsahacharadi Taila', 'brihatsahacharadi-taila', 'Taila', 'A traditional Brihatsahacharadi Oil formulation prepared with Vitex negundo, Desmodium gangeticum.', ARRAY['General Wellness']),
  ('Panchaguna Taila', 'panchaguna-taila', 'Taila', 'A traditional Panchaguna Oil formulation prepared with Sesamum indicum (Sesame) + 5 herbs.', ARRAY['General Wellness']),
  ('Gandharvahasta Taila', 'gandharvahasta-taila', 'Taila', 'A traditional Gandharvahasta Oil formulation prepared with Vitex negundo, Acorus calamus.', ARRAY['General Wellness']),
  ('Bhringaraja Taila', 'bhringaraja-taila', 'Taila', 'A traditional Bhringaraj Oil formulation prepared with Eclipta alba (Bhringraj).', ARRAY['General Wellness']),
  ('Apamarga Kshara Taila', 'apamarga-kshara-taila', 'Taila', 'A traditional Apamarga Alkaline Oil formulation prepared with Achyranthes aspera (Apamarga) ash.', ARRAY['General Wellness']),
  ('Ashvagandha Taila', 'ashvagandha-taila', 'Taila', 'A traditional Ashwagandha Oil formulation prepared with Withania somnifera.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
