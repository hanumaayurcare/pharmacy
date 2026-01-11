-- Seed Kwath Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Kwath',
  'kwath', 
  'dosage', 
  'Herbal decoctions',
  '
### How Kwath (Ayurvedic Decoction) Is Prepared

#### 1. Selection and Preparation of Ingredients
- Use coarsely powdered or small-cut dried herbs (or fresh, as specified).
- Weigh the herbs according to the prescribed formula.

#### 2. Water Addition
- Add water to the herbs in a specific ratio:
  - Commonly, **1 part herb : 16 parts water** (by weight to volume).
  - For softer herbs, use 4 or 8 parts water; for harder herbs, use up to 16 parts.

#### 3. Soaking (Optional)
- Soak the mixture overnight to enhance extraction, especially for bulk preparations.

#### 4. Boiling
- Place the mixture in a wide-mouthed, open vessel (iron or steel preferred).
- Boil on mild heat (85–90°C), stirring occasionally to prevent sticking or burning.
- Continue boiling until the water reduces to **1/4 or 1/8** of the original volume (typically to 1/8th for standard Kwath).

#### 5. Filtration
- Filter the decoction through a clean cloth while still warm to obtain the final Kwath.

#### 6. Administration
- Use the decoction fresh and warm for best results.

### Example Proportion
| Herb (coarse powder) | Water (ml) | Final Decoction (ml) |
| :--- | :--- | :--- |
| 10 g | 160 ml | 20 ml |
| 48 g | 768 ml | 96 ml |

### Summary Table

| Step | Description |
| :--- | :--- |
| **Selection** | Use coarse powder of dried herbs |
| **Water Ratio** | Typically 1:16 (Herb:Water) |
| **Boiling** | Boil in open vessel on mild heat |
| **Reduction** | Reduce to 1/4 or 1/8 of original volume |
| **Filtration** | Filter warm through clean cloth |
| **Usage** | Use fresh and warm |

**Key Points:**
- Do not cover the vessel while boiling; evaporation is needed.
- Stir intermittently to avoid charring.
- Use fresh decoction for maximum potency.

This traditional process ensures optimal extraction of water-soluble active compounds from the herbs.

### Common Kwath Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Ayush Kwath | Ayush Kwath | *Ocimum tenuiflorum*, *Cinnamomum verum*, *Zingiber officinale*, *Piper nigrum* |
| Dashamoola Kwath | Dashamoola Decoction | Ten roots incl. *Oroxylum indicum*, *Aegle marmelos*, *Solanum indicum*, etc. |
| Pathyadi Kwath | Pathyadi Decoction | *Terminalia chebula*, *T. bellirica*, *Emblica officinalis*, *Andrographis paniculata*, *Curcuma longa*, *Tinospora cordifolia*, *Azadirachta indica* |
| Triphala Kwath | Triphala Decoction | *Emblica officinalis*, *Terminalia chebula*, *Terminalia bellirica* |
| Panchatikta Kwath | Panchatikta Decoction | *Azadirachta indica*, *Tinospora cordifolia*, *Trichosanthes dioica*, *Solanum xanthocarpum*, *Adhatoda vasica* |
| Mahamanjisthadi Kwath | Mahamanjisthadi Decoction | *Rubia cordifolia* (Manjistha) and others |
| Maharasnadi Kwath | Maharasnadi Decoction | *Pluchea lanceolata* (Rasna) and others |
| Devdarvyadi Kwath | Devdarvyadi Decoction | *Cedrus deodara* (Devadaru) and others |
| Bharangyadi Kwath | Bharangyadi Decoction | *Clerodendrum serratum* (Bharangi) and others |
| Bruhat Varunadi Kwath | Bruhat Varunadi Decoction | *Crataeva nurvala* (Varuna) and others |
| Rasnasaptak Kwath | Rasnasaptak Decoction | *Pluchea lanceolata* (Rasna) and others |
| Panchavalkal Kwath | Panchavalkal Decoction | *Ficus benghalensis*, *Ficus religiosa*, *Ficus glomerata*, *Ficus lacor*, *Thespesia populnea* |
| Panchatrunamool Kwath | Panchatrunamool Decoction | Five roots, incl. *Desmodium gangeticum*, *Uraria picta*, etc. |
| Poonarnavastak Kwath | Poonarnavastak Decoction | *Boerhavia diffusa* (Punarnava) and others |
| Yavadi Kwath | Yavadi Decoction | *Hordeum vulgare* (Yava/barley) and others |
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Kwath Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Ayush Kwath', 'ayush-kwath', 'Kwath', 'A traditional Ayush Kwath formulation prepared with Ocimum tenuiflorum, Cinnamomum verum, Zingiber officinale, Piper nigrum.', ARRAY['General Wellness']),
  ('Dashamoola Kwath', 'dashamoola-kwath', 'Kwath', 'A traditional Dashamoola Decoction formulation prepared with Ten roots incl. Oroxylum indicum, Aegle marmelos, Solanum indicum, etc.', ARRAY['General Wellness']),
  ('Pathyadi Kwath', 'pathyadi-kwath', 'Kwath', 'A traditional Pathyadi Decoction formulation prepared with Terminalia chebula, Terminalia bellirica, Emblica officinalis, Andrographis paniculata, Curcuma longa, Tinospora cordifolia, Azadirachta indica.', ARRAY['General Wellness']),
  ('Triphala Kwath', 'triphala-kwath', 'Kwath', 'A traditional Triphala Decoction formulation prepared with Emblica officinalis, Terminalia chebula, Terminalia bellirica.', ARRAY['General Wellness']),
  ('Panchatikta Kwath', 'panchatikta-kwath', 'Kwath', 'A traditional Panchatikta Decoction formulation prepared with Azadirachta indica, Tinospora cordifolia, Trichosanthes dioica, Solanum xanthocarpum, Adhatoda vasica.', ARRAY['General Wellness']),
  ('Mahamanjisthadi Kwath', 'mahamanjisthadi-kwath', 'Kwath', 'A traditional Mahamanjisthadi Decoction formulation prepared with Rubia cordifolia (Manjistha) and others.', ARRAY['General Wellness']),
  ('Maharasnadi Kwath', 'maharasnadi-kwath', 'Kwath', 'A traditional Maharasnadi Decoction formulation prepared with Pluchea lanceolata (Rasna) and others.', ARRAY['General Wellness']),
  ('Devdarvyadi Kwath', 'devdarvyadi-kwath', 'Kwath', 'A traditional Devdarvyadi Decoction formulation prepared with Cedrus deodara (Devadaru) and others.', ARRAY['General Wellness']),
  ('Bharangyadi Kwath', 'bharangyadi-kwath', 'Kwath', 'A traditional Bharangyadi Decoction formulation prepared with Clerodendrum serratum (Bharangi) and others.', ARRAY['General Wellness']),
  ('Bruhat Varunadi Kwath', 'bruhat-varunadi-kwath', 'Kwath', 'A traditional Bruhat Varunadi Decoction formulation prepared with Crataeva nurvala (Varuna) and others.', ARRAY['General Wellness']),
  ('Rasnasaptak Kwath', 'rasnasaptak-kwath', 'Kwath', 'A traditional Rasnasaptak Decoction formulation prepared with Pluchea lanceolata (Rasna) and others.', ARRAY['General Wellness']),
  ('Panchavalkal Kwath', 'panchavalkal-kwath', 'Kwath', 'A traditional Panchavalkal Decoction formulation prepared with Ficus benghalensis, Ficus religiosa, Ficus glomerata, Ficus lacor, Thespesia populnea.', ARRAY['General Wellness']),
  ('Panchatrunamool Kwath', 'panchatrunamool-kwath', 'Kwath', 'A traditional Panchatrunamool Decoction formulation prepared with Five roots, incl. Desmodium gangeticum, Uraria picta, etc.', ARRAY['General Wellness']),
  ('Poonarnavastak Kwath', 'poonarnavastak-kwath', 'Kwath', 'A traditional Poonarnavastak Decoction formulation prepared with Boerhavia diffusa (Punarnava) and others.', ARRAY['General Wellness']),
  ('Yavadi Kwath', 'yavadi-kwath', 'Kwath', 'A traditional Yavadi Decoction formulation prepared with Hordeum vulgare (Yava/barley) and others.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
