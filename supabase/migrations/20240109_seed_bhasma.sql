-- Seed Bhasma Description
INSERT INTO categories (name, slug, type, description, details)
VALUES (
  'Bhasma',
  'bhasma', 
  'dosage', 
  'Calcined mineral preparations',
  '
### How Bhasma (Ayurvedic Formulations) Are Prepared
The preparation of Bhasma—a unique Ayurvedic calcined formulation of metals, minerals, or animal derivatives—involves several meticulous steps to ensure safety, efficacy, and bioavailability. The core process includes:

#### 1. Shodhana (Purification)
- Raw materials (metals, minerals, etc.) are purified to remove physical and chemical impurities and reduce toxicity.
- Purification usually involves repeated heating, quenching in herbal liquids (like cow’s urine, decoctions, or oils), or other specific traditional methods.
- *Example:* Gold is heated and dipped in sesame oil, buttermilk, herbal decoctions, etc., multiple times.

#### 2. Bhavana (Trituration with Herbal Juices)
- The purified material is ground (triturated) with herbal juices, decoctions, or other specified liquids to enhance assimilation and therapeutic properties.
- This process is repeated several times, often with drying in sunlight between cycles.

#### 3. Marana (Incineration/Calcination)
- The material is formed into pellets or cakes, placed in earthen containers (*Sharava Samputa*), sealed, and subjected to controlled heating (*Puta*) using traditional furnaces or electric muffle furnaces.
- The heating and cooling cycle may be repeated multiple times (sometimes dozens of times) with fresh additions of herbal liquids or powders between cycles, depending on the specific Bhasma.
- After each cycle, the material is collected, ground, and reprocessed if necessary until the desired fineness and characteristics are achieved.

#### 4. Quality Control and Testing
- The final Bhasma is tested for classical qualities (such as fineness, ability to float on water, tastelessness, and non-reversibility to its original form) and modern parameters (particle size, absence of toxicity, etc.).

### Summary Table

| Step | Description |
| :--- | :--- |
| **Shodhana** | Purification to remove impurities and reduce toxicity using specific herbal or natural agents |
| **Bhavana** | Wet grinding/trituration with herbal juices or decoctions |
| **Marana** | Calcination/incineration in sealed containers with repeated heating and cooling cycles |
| **Quality Control** | Testing for classical and modern quality parameters |

**Key Points:**
- Each metal or mineral has specific purification and incineration protocols.
- The process transforms the raw material into a fine, bioavailable, and therapeutically safe ash (Bhasma).
- Modern equipment like electric muffle furnaces may be used for better temperature control.

This multi-step process ensures that Bhasmas are safe, effective, and suitable for medicinal use in Ayurveda.

### Common Bhasma Formulations

| Sanskrit Name | Common Name | Principal Scientific Name/Composition |
| :--- | :--- | :--- |
| Abhrak Bhasma | Mica Bhasma | Potassium Aluminum Silicate |
| Akik Bhasma | Agate Bhasma | Silicon Dioxide (SiO₂) |
| Godanti Bhasma | Gypsum Bhasma | Calcium Sulfate (CaSO₄·2H₂O) |
| Gomed Mani Bhasma | Hessonite Garnet Bhasma | Calcium Aluminum Silicate |
| Hajrul Yahood Bhasma | Jasper Bhasma | Silicon Dioxide (SiO₂) |
| Heerak Bhasma | Diamond Bhasma | Carbon (C) |
| Kansya Bhasma | Bell Metal Bhasma | Copper-Tin Alloy (Cu-Sn) |
| Kanta Loha Bhasma | Magnetite Bhasma | Iron Oxide (Fe₃O₄) |
| Kasis Bhasma | Green Vitriol Bhasma | Ferrous Sulfate (FeSO₄) |
| Kukkutanda Twak Bhasma | Eggshell Bhasma | Calcium Carbonate (CaCO₃) |
| Loha Bhasma | Iron Bhasma | Iron (Fe) |
| Mandur Bhasma | Iron Oxide Bhasma | Ferric Oxide (Fe₃O₄) |
| Mukta Bhasma | Pearl Bhasma | Calcium Carbonate (CaCO₃) |
| Muktasukti Bhasma | Pearl Oyster Bhasma | Calcium Carbonate (CaCO₃) |
| Naga Bhasma | Lead Bhasma | Lead (Pb) |
| Neel Mani Bhasma | Sapphire Bhasma | Aluminum Oxide (Al₂O₃) |
| Neelanjana Bhasma | Antimony Sulfide Bhasma | Antimony Trisulfide (Sb₂S₃) |
| Parwal Bhasma | Coral Bhasma | Calcium Carbonate (CaCO₃) |
| Parad Bhasma | Mercury Bhasma | Mercury (Hg) |
| Piroja Bhasma | Topaz Bhasma | Aluminum Silicate |
| Rajat Bhasma | Silver Bhasma | Silver (Ag) |
| Shankh Bhasma | Conch Shell Bhasma | Calcium Carbonate (CaCO₃) |
| Shringa Bhasma | Antler Bhasma | Calcium Phosphate |
| Swarna Bhasma | Gold Bhasma | Gold (Au) |
| Tamra Bhasma | Copper Bhasma | Copper (Cu) |
| Trivanga Bhasma | Tin-Lead-Zinc Bhasma | Tin (Sn), Lead (Pb), Zinc (Zn) |
| Vanga Bhasma | Tin Bhasma | Tin (Sn) |
| Varatika Bhasma | Cowrie Shell Bhasma | Calcium Carbonate (CaCO₃) |
| Vaikranta Bhasma | Tourmaline Bhasma | Complex Borosilicate |
| Vaidoor Bhasma | Cat’s Eye Bhasma | Chrysoberyl (BeAl₂O₄) |
| Yashada Bhasma | Zinc Bhasma | Zinc (Zn) |
| Sphatika Bhasma | Alum Bhasma | Potassium Alum |
| Hartal Bhasma | Orpiment Bhasma | Arsenic Trisulfide (As₂S₃) |
| Harital Godanti Bhasma | Orpiment-Gypsum Bhasma | As₂S₃ + CaSO₄·2H₂O |
| Swarna Makshik Bhasma | Chalcopyrite Bhasma | Copper Iron Sulfide (CuFeS₂) |

> **Notes:**
> - Bhasmas are mineral/metallic preparations processed through incineration and purification.
> - Scientific names reflect primary elemental/compositional constituents.
> - For safety, Bhasmas undergo rigorous *Shodhana* (purification) and *Marana* (calcination) processes.
'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;

-- Seed Bhasma Products
INSERT INTO products (name, slug, dosage_form, description, therapeutic_categories)
VALUES 
  ('Abhrak Bhasma', 'abhrak-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Mica (Potassium Aluminum Silicate).', ARRAY['General Wellness']),
  ('Akik Bhasma', 'akik-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Agate (Silicon Dioxide).', ARRAY['General Wellness']),
  ('Godanti Bhasma', 'godanti-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Gypsum (Calcium Sulfate).', ARRAY['General Wellness']),
  ('Gomed Mani Bhasma', 'gomed-mani-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Hessonite Garnet (Calcium Aluminum Silicate).', ARRAY['General Wellness']),
  ('Hajrul Yahood Bhasma', 'hajrul-yahood-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Jasper (Silicon Dioxide).', ARRAY['General Wellness']),
  ('Heerak Bhasma', 'heerak-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Diamond (Carbon).', ARRAY['General Wellness']),
  ('Kansya Bhasma', 'kansya-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Bell Metal (Copper-Tin Alloy).', ARRAY['General Wellness']),
  ('Kanta Loha Bhasma', 'kanta-loha-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Magnetite (Iron Oxide).', ARRAY['General Wellness']),
  ('Kasis Bhasma', 'kasis-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Green Vitriol (Ferrous Sulfate).', ARRAY['General Wellness']),
  ('Kukkutanda Twak Bhasma', 'kukkutanda-twak-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Eggshell (Calcium Carbonate).', ARRAY['General Wellness']),
  ('Loha Bhasma', 'loha-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Iron (Fe).', ARRAY['General Wellness']),
  ('Mandur Bhasma', 'mandur-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Iron Oxide (Ferric Oxide).', ARRAY['General Wellness']),
  ('Mukta Bhasma', 'mukta-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Pearl (Calcium Carbonate).', ARRAY['General Wellness']),
  ('Muktasukti Bhasma', 'muktasukti-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Pearl Oyster (Calcium Carbonate).', ARRAY['General Wellness']),
  ('Naga Bhasma', 'naga-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Lead (Pb).', ARRAY['General Wellness']),
  ('Neel Mani Bhasma', 'neel-mani-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Sapphire (Aluminum Oxide).', ARRAY['General Wellness']),
  ('Neelanjana Bhasma', 'neelanjana-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Antimony Sulfide (Antimony Trisulfide).', ARRAY['General Wellness']),
  ('Parwal Bhasma', 'parwal-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Coral (Calcium Carbonate).', ARRAY['General Wellness']),
  ('Parad Bhasma', 'parad-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Mercury (Hg).', ARRAY['General Wellness']),
  ('Piroja Bhasma', 'piroja-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Topaz (Aluminum Silicate).', ARRAY['General Wellness']),
  ('Rajat Bhasma', 'rajat-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Silver (Ag).', ARRAY['General Wellness']),
  ('Shankh Bhasma', 'shankh-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Conch Shell (Calcium Carbonate).', ARRAY['General Wellness']),
  ('Shringa Bhasma', 'shringa-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Antler (Calcium Phosphate).', ARRAY['General Wellness']),
  ('Swarna Bhasma', 'swarna-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Gold (Au).', ARRAY['General Wellness']),
  ('Tamra Bhasma', 'tamra-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Copper (Cu).', ARRAY['General Wellness']),
  ('Trivanga Bhasma', 'trivanga-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Tin-Lead-Zinc (Complex Alloy).', ARRAY['General Wellness']),
  ('Vanga Bhasma', 'vanga-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Tin (Sn).', ARRAY['General Wellness']),
  ('Varatika Bhasma', 'varatika-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Cowrie Shell (Calcium Carbonate).', ARRAY['General Wellness']),
  ('Vaikranta Bhasma', 'vaikranta-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Tourmaline (Complex Borosilicate).', ARRAY['General Wellness']),
  ('Vaidoor Bhasma', 'vaidoor-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Cat’s Eye (Chrysoberyl).', ARRAY['General Wellness']),
  ('Yashada Bhasma', 'yashada-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Zinc (Zn).', ARRAY['General Wellness']),
  ('Sphatika Bhasma', 'sphatika-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Alum (Potassium Alum).', ARRAY['General Wellness']),
  ('Hartal Bhasma', 'hartal-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Orpiment (Arsenic Trisulfide).', ARRAY['General Wellness']),
  ('Harital Godanti Bhasma', 'harital-godanti-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Orpiment-Gypsum.', ARRAY['General Wellness']),
  ('Swarna Makshik Bhasma', 'swarna-makshik-bhasma', 'Bhasma', 'A traditional Ayurvedic calcined formulation of Chalcopyrite (Copper Iron Sulfide).', ARRAY['General Wellness'])
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dosage_form = EXCLUDED.dosage_form,
  therapeutic_categories = EXCLUDED.therapeutic_categories;
