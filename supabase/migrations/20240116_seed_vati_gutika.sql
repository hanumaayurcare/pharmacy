-- Seed Vati & Gutika Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Vati & Gutika',
  'vati-gutika', 
  'dosage', 
  'Tablets and pills',
  '
### How Vati and Gutika Are Prepared

#### 1. Preparation of Ingredients
- All plant ingredients are dried and finely powdered (mesh size ~85).
- Minerals/metals, if used, are processed into *bhasma* or *kajjali* (ash or trituration form).
- Guggulu (if used) is purified before use.

#### 2. Mixing and Binding
- Powders are thoroughly mixed.
- Binding agents are added, such as:
  - Honey, jaggery (*guda*), sugar (*sita*), guggulu, herbal decoctions (*kwath*), fresh juices (*swarasa*), cow’s urine (*gomutra*), or water.
- **Sagni (with heat):** Binding agents like jaggery or guggulu are melted gently, powders are added, and the mixture is stirred to a soft paste.
- **Niragni (without heat):** Powders are triturated with the binding agent to a dough-like consistency.

#### 3. Molding and Drying
- The soft mass is rolled by hand or machine into pills/tablets of uniform size and shape.
- Pills are dried in the shade or in a hot air oven until firm.

#### 4. Packaging and Storage
- Dried vati/gutika are stored in airtight containers to preserve potency and prevent spoilage.

### Summary Table

| Step | Description |
| :--- | :--- |
| **Ingredient Prep** | Dry, powder herbs; process minerals/metals to bhasma/kajjali |
| **Mixing & Binding** | Mix powders; add binding agent (honey, jaggery, guggulu, kwath, etc.) |
| **Sagni (with heat)** | Melt binding agent, add powders, mix to soft mass |
| **Niragni (no heat)** | Triturate powders with binding agent to dough-like mass |
| **Molding** | Roll into pills/tablets of uniform size |
| **Drying** | Dry in shade or hot air oven |
| **Packaging/Storage** | Store in airtight containers |

**Precautions:**
- Use only purified guggulu and bhasma.
- Ensure powders are fine and free from contaminants.
- Maintain uniformity in size and shape.
- Store in airtight containers to ensure shelf life.

This traditional process ensures Vati and Gutika are potent, stable, and effective for therapeutic use.

### Common Vati/Gutika Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Agnitundi Vati | Agnitundi Tablet | Polyherbal (main: *Zingiber officinale*, *Piper longum*) |
| Arogyavardhini Vati | Arogyavardhini Tablet | *Terminalia chebula*, *Commiphora wightii*, *Picrorhiza kurroa* |
| Bilwadi Gutika | Bilwadi Gutika | *Aegle marmelos* (Bilva), *Ocimum sanctum*, *Pongamia pinnata* |
| Chandraprabha Vati | Chandraprabha Tablet | Shilajit, *Cinnamomum camphora*, *Piper longum* |
| Eladi Gutika | Eladi Gutika | *Elettaria cardamomum* (Ela), *Cinnamomum zeylanicum* |
| Hinguleshwara Rasa | Hinguleshwara Rasa | *Ferula asafoetida* (Hing), Mercury sulfides (processed) |
| Lavangadi Vati | Lavangadi Tablet | *Syzygium aromaticum* (Clove), *Piper nigrum* |
| Mahayogaraja Guggulu | Mahayogaraja Guggulu | *Commiphora wightii*, *Withania somnifera*, *Curcuma longa* |
| Pravala Panchamrita | Pravala Panchamrita | Coral calcium (*Corallium rubrum*), *Mukta pishti* (pearl) |
| Sutshekhar Rasa | Sutshekhar Rasa | Conch shell ash, *Zingiber officinale*, *Piper longum* |
| Vasant Kusumakar Rasa | Vasant Kusumakar Rasa | Gold nanoparticles, *Mucuna pruriens*, *Crocus sativus* |

> **Notes:**
> - Many formulations are polyherbal; only principal ingredients are listed.
> - Vati/Gutika are tablet formulations, often combining herbs, minerals, or metals (processed for safety).
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Vati & Gutika Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Agnitundi Vati', 'agnitundi-vati', 'Vati & Gutika', 'A traditional Agnitundi Tablet formulation prepared with Polyherbal (main: Zingiber officinale, Piper longum).', ARRAY['General Wellness']),
  ('Arogyavardhini Vati', 'arogyavardhini-vati', 'Vati & Gutika', 'A traditional Arogyavardhini Tablet formulation prepared with Terminalia chebula, Commiphora wightii, Picrorhiza kurroa.', ARRAY['General Wellness']),
  ('Bilwadi Gutika', 'bilwadi-gutika', 'Vati & Gutika', 'A traditional Bilwadi Gutika formulation prepared with Aegle marmelos (Bilva), Ocimum sanctum, Pongamia pinnata.', ARRAY['General Wellness']),
  ('Chandraprabha Vati', 'chandraprabha-vati', 'Vati & Gutika', 'A traditional Chandraprabha Tablet formulation prepared with Shilajit, Cinnamomum camphora, Piper longum.', ARRAY['General Wellness']),
  ('Eladi Gutika', 'eladi-gutika', 'Vati & Gutika', 'A traditional Eladi Gutika formulation prepared with Elettaria cardamomum (Ela), Cinnamomum zeylanicum.', ARRAY['General Wellness']),
  ('Hinguleshwara Rasa', 'hinguleshwara-rasa', 'Vati & Gutika', 'A traditional Hinguleshwara Rasa formulation prepared with Ferula asafoetida (Hing), Mercury sulfides (processed).', ARRAY['General Wellness']),
  ('Lavangadi Vati', 'lavangadi-vati', 'Vati & Gutika', 'A traditional Lavangadi Tablet formulation prepared with Syzygium aromaticum (Clove), Piper nigrum.', ARRAY['General Wellness']),
  ('Mahayogaraja Guggulu', 'mahayogaraja-guggulu', 'Vati & Gutika', 'A traditional Mahayogaraja Guggulu formulation prepared with Commiphora wightii, Withania somnifera, Curcuma longa.', ARRAY['General Wellness']),
  ('Pravala Panchamrita', 'pravala-panchamrita', 'Vati & Gutika', 'A traditional Pravala Panchamrita formulation prepared with Coral calcium (Corallium rubrum), Mukta pishti (pearl).', ARRAY['General Wellness']),
  ('Sutshekhar Rasa', 'sutshekhar-rasa', 'Vati & Gutika', 'A traditional Sutshekhar Rasa formulation prepared with Conch shell ash, Zingiber officinale, Piper longum.', ARRAY['General Wellness']),
  ('Vasant Kusumakar Rasa', 'vasant-kusumakar-rasa', 'Vati & Gutika', 'A traditional Vasant Kusumakar Rasa formulation prepared with Gold nanoparticles, Mucuna pruriens, Crocus sativus.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
