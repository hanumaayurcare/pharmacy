-- Seed Guggulu Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Guggulu',
  'guggulu', 
  'dosage', 
  'Resin-based formulations',
  '
### How Guggulu Is Prepared

#### 1. Purification (Shodhana) of Raw Guggulu
- **Raw guggulu** (the resin from *Commiphora wightii*) is first cleaned to remove physical impurities like twigs, bark, and dust.
- The resin is cut into small pieces and tied in a cloth bundle (*pottali*).
- This bundle is immersed or suspended in a purification liquid, commonly Triphala decoction, cow’s urine, cow’s milk, or other herbal decoctions.
- The liquid is heated (using a *dola yantra* or directly boiling) so the guggulu softens and dissolves into the liquid.
- The dissolved guggulu is filtered while warm through a cloth to separate impurities.
- The filtrate is further heated to evaporate water, yielding purified guggulu, which is then dried (sometimes in sunlight) to obtain a solid mass.

#### 2. Preparation of Guggulu Formulations (Kalpa)
- Purified guggulu is mixed with fine powders of other herbs as per the specific formulation.
- This mixture may be prepared using different methods:
  - **Sagni (with heat):** Guggulu is melted with a little liquid, herbal powders are added, and the mass is cooked until it reaches the right consistency, then shaped into pills (*vati*) or tablets.
  - **Niragni (without heat):** Guggulu is triturated (ground) with the powders and a little ghee until a uniform mass is formed, then shaped as needed.
  - **Adityapaka (sun drying):** The herbal mixture is combined with decoction and dried in sunlight, sometimes with repeated addition and drying cycles.
- The final product is rolled into pills, tablets, or left as a soft mass, depending on the formulation.

### Summary Table

| Step | Description |
| :--- | :--- |
| **Purification** | Dissolve guggulu in herbal liquid, filter, and dry to remove impurities and enhance safety |
| **Mixing** | Combine purified guggulu with specified herbal powders and liquids |
| **Processing** | Use heat (*Sagni*), trituration (*Niragni*), or sun drying (*Adityapaka*) to reach final form |
| **Finalization** | Shape into pills, tablets, or soft masses as per formulation |

This process ensures guggulu is safe, potent, and suitable for therapeutic use, following classical Ayurvedic methods.

### Common Guggulu Formulations

| Sanskrit Name | Common Name | Principal Scientific Name(s) |
| :--- | :--- | :--- |
| Yogaraj Guggulu | Yogaraj Guggulu | *Commiphora wightii* (Guggulu), multiple herbs |
| Kaishore Guggulu | Kaishore Guggulu | *C. wightii*, *Tinospora cordifolia*, *Emblica officinalis*, *T. chebula*, *T. bellirica* |
| Kanchanara Guggulu | Kanchanara Guggulu | *Bauhinia variegata*, *Commiphora wightii* |
| Triphala Guggulu | Triphala Guggulu | *Emblica officinalis*, *Terminalia chebula*, *Terminalia bellirica*, *Commiphora wightii* |
| Punarnava Guggulu | Punarnava Guggulu | *Boerhavia diffusa*, *Commiphora wightii*, *Ricinus communis*, *Zingiber officinale*, *Operculina turpethum* |
| Amrita Guggulu | Amrita Guggulu | *Tinospora cordifolia*, *C. wightii*, *T. chebula*, *T. bellirica*, *Emblica officinalis* |
| Laksha Guggulu | Laksha Guggulu | *Laccifer lacca* (Laksha), *Commiphora wightii*, *Terminalia arjuna*, *Withania somnifera* |
| Gokshuradi Guggulu | Gokshuradi Guggulu | *Tribulus terrestris*, *C. wightii*, *Cyperus rotundus*, *T. chebula*, *T. bellirica*, *Emblica officinalis* |
| Vatari Guggulu | Vatari Guggulu | *Commiphora wightii*, *Terminalia chebula*, *Terminalia bellirica*, *Emblica officinalis* |
| Samshamani Guggulu | Samshamani Guggulu | *Commiphora wightii*, *Tinospora cordifolia* |
| Tryodashang Guggulu | Tryodashang Guggulu | *C. wightii*, *Withania somnifera*, *Pluchea lanceolata*, *Tribulus terrestris*, others |
| Rasanadi Guggulu | Rasanadi Guggulu | *Pluchea lanceolata* (Rasna), *Commiphora wightii* |
| Chitrakadi Guggulu | Chitrakadi Guggulu | *Plumbago zeylanica* (Chitraka), *Commiphora wightii* |
| Varunadi Guggulu | Varunadi Guggulu | *Crataeva nurvala* (Varuna), *Commiphora wightii* |
| Manjishthadi Guggulu | Manjishthadi Guggulu | *Rubia cordifolia* (Manjishtha), *Commiphora wightii* |
| Svayambhuva Guggulu | Svayambhuva Guggulu | *Psoralea corylifolia* (Bakuchi), *Shilajit*, *Commiphora wightii* |
| Trayushanadi Guggulu | Trayushanadi Guggulu | *Zingiber officinale*, *Piper nigrum*, *Piper longum*, *Commiphora wightii* |
| Samsharkar Guggulu | Samsharkar Guggulu | *C. wightii*, *Saindhava lavana*, *Devadaru*, *Mustaka*, *Vacha*, *Yavani*, *Haritaki*, *Bibhitaki*, *Amalaki* |
| Guggulutiktaka Guggulu | Guggulutiktaka Guggulu | *Commiphora wightii*, multiple bitter herbs |

> **Notes:**
> - All these formulations are based on *Commiphora wightii* (Guggulu) as the core ingredient, combined with various other herbs according to classical Ayurvedic texts.
> - Many are polyherbal, so only principal or eponymous scientific names are listed.
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Guggulu Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Yogaraj Guggulu', 'yogaraj-guggulu', 'Guggulu', 'A traditional Yogaraj Guggulu formulation prepared with Commiphora wightii (Guggulu), multiple herbs.', ARRAY['General Wellness']),
  ('Kaishore Guggulu', 'kaishore-guggulu', 'Guggulu', 'A traditional Kaishore Guggulu formulation prepared with Commiphora wightii, Tinospora cordifolia, Emblica officinalis, Terminalia chebula, Terminalia bellirica.', ARRAY['General Wellness']),
  ('Kanchanara Guggulu', 'kanchanara-guggulu', 'Guggulu', 'A traditional Kanchanara Guggulu formulation prepared with Bauhinia variegata, Commiphora wightii.', ARRAY['General Wellness']),
  ('Triphala Guggulu', 'triphala-guggulu', 'Guggulu', 'A traditional Triphala Guggulu formulation prepared with Emblica officinalis, Terminalia chebula, Terminalia bellirica, Commiphora wightii.', ARRAY['General Wellness']),
  ('Punarnava Guggulu', 'punarnava-guggulu', 'Guggulu', 'A traditional Punarnava Guggulu formulation prepared with Boerhavia diffusa, Commiphora wightii, Ricinus communis, Zingiber officinale, Operculina turpethum.', ARRAY['General Wellness']),
  ('Amrita Guggulu', 'amrita-guggulu', 'Guggulu', 'A traditional Amrita Guggulu formulation prepared with Tinospora cordifolia, Commiphora wightii, Terminalia chebula, Terminalia bellirica, Emblica officinalis.', ARRAY['General Wellness']),
  ('Laksha Guggulu', 'laksha-guggulu', 'Guggulu', 'A traditional Laksha Guggulu formulation prepared with Laccifer lacca (Laksha), Commiphora wightii, Terminalia arjuna, Withania somnifera.', ARRAY['General Wellness']),
  ('Gokshuradi Guggulu', 'gokshuradi-guggulu', 'Guggulu', 'A traditional Gokshuradi Guggulu formulation prepared with Tribulus terrestris, Commiphora wightii, Cyperus rotundus, Terminalia chebula, Terminalia bellirica, Emblica officinalis.', ARRAY['General Wellness']),
  ('Vatari Guggulu', 'vatari-guggulu', 'Guggulu', 'A traditional Vatari Guggulu formulation prepared with Commiphora wightii, Terminalia chebula, Terminalia bellirica, Emblica officinalis.', ARRAY['General Wellness']),
  ('Samshamani Guggulu', 'samshamani-guggulu', 'Guggulu', 'A traditional Samshamani Guggulu formulation prepared with Commiphora wightii, Tinospora cordifolia.', ARRAY['General Wellness']),
  ('Tryodashang Guggulu', 'tryodashang-guggulu', 'Guggulu', 'A traditional Tryodashang Guggulu formulation prepared with Commiphora wightii, Withania somnifera, Pluchea lanceolata, Tribulus terrestris, others.', ARRAY['General Wellness']),
  ('Rasanadi Guggulu', 'rasanadi-guggulu', 'Guggulu', 'A traditional Rasanadi Guggulu formulation prepared with Pluchea lanceolata (Rasna), Commiphora wightii.', ARRAY['General Wellness']),
  ('Chitrakadi Guggulu', 'chitrakadi-guggulu', 'Guggulu', 'A traditional Chitrakadi Guggulu formulation prepared with Plumbago zeylanica (Chitraka), Commiphora wightii.', ARRAY['General Wellness']),
  ('Varunadi Guggulu', 'varunadi-guggulu', 'Guggulu', 'A traditional Varunadi Guggulu formulation prepared with Crataeva nurvala (Varuna), Commiphora wightii.', ARRAY['General Wellness']),
  ('Manjishthadi Guggulu', 'manjishthadi-guggulu', 'Guggulu', 'A traditional Manjishthadi Guggulu formulation prepared with Rubia cordifolia (Manjishtha), Commiphora wightii.', ARRAY['General Wellness']),
  ('Svayambhuva Guggulu', 'svayambhuva-guggulu', 'Guggulu', 'A traditional Svayambhuva Guggulu formulation prepared with Psoralea corylifolia (Bakuchi), Shilajit, Commiphora wightii.', ARRAY['General Wellness']),
  ('Trayushanadi Guggulu', 'trayushanadi-guggulu', 'Guggulu', 'A traditional Trayushanadi Guggulu formulation prepared with Zingiber officinale, Piper nigrum, Piper longum, Commiphora wightii.', ARRAY['General Wellness']),
  ('Samsharkar Guggulu', 'samsharkar-guggulu', 'Guggulu', 'A traditional Samsharkar Guggulu formulation prepared with Commiphora wightii, Saindhava lavana, Devadaru, Mustaka, Vacha, Yavani, Haritaki, Bibhitaki, Amalaki.', ARRAY['General Wellness']),
  ('Guggulutiktaka Guggulu', 'guggulutiktaka-guggulu', 'Guggulu', 'A traditional Guggulutiktaka Guggulu formulation prepared with Commiphora wightii, multiple bitter herbs.', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
