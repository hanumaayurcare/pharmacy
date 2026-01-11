
INSERT INTO public.categories (name, slug, type, description, details)
VALUES
  (
    'Asava & Arishta', 
    'asava-arishta', 
    'dosage', 
    'Fermented liquid preparations', 
    '### Preparation of Asava and Arishta
Asava and Arishta are traditional Ayurvedic fermented medicines. Both are prepared using herbs, sweeteners (like jaggery or honey), water, and natural fermenting agents, but their processes differ slightly. Here is a detailed, stepwise explanation:

#### 1. Selection and Preparation of Herbs
*   **For Arishta:** Coarsely powder the dried herbs as per the recipe.
*   **For Asava:** Use fresh herbs or their juices, or sometimes coarsely powdered dried herbs.

#### 2. Preparation of Herbal Extract
*   **Arishta (Decoction Method):**
    *   Mix one part of the coarse herbal powder with 16 parts water.
    *   Boil this mixture until the water is reduced to 1/4th or 1/8th of its original volume.
    *   Filter the decoction to remove solid particles. This filtered liquid is called *Kwath* or *Kashayam*.
*   **Asava (Infusion Method):**
    *   Mix the herbs (fresh or dried) directly with water, without boiling.
    *   Sometimes, fresh juice of herbs is used.

#### 3. Addition of Sweetening Agents
*   Add jaggery or honey to the filtered decoction (for Arishta) or directly to the herbal mixture (for Asava).
*   Stir until the sweetener is fully dissolved.

#### 4. Addition of Fermentation Initiators and Other Ingredients
*   Add natural fermenting agents, typically the flowers of *Dhataki* (*Woodfordia fruticosa*) or *Madhuka* (*Madhuca longifolia*).
*   Add any additional herbs or spices as specified in the formulation. These may regulate fermentation and enhance medicinal value.

#### 5. Fermentation Process
*   Transfer the mixture into a fermentation vessel (traditionally an earthen or wooden pot, now sometimes stainless steel or glass).
*   Fill the vessel up to 2/3rd of its capacity to allow space for fermentation gases.
*   Seal the vessel tightly, often with a cloth and clay, to prevent contamination.
*   Place the vessel in a warm, undisturbed location for 2–8 weeks (usually 1–3 months), depending on the climate and the specific recipe.

#### 6. Monitoring Fermentation
*   During fermentation, natural yeasts convert sugars into alcohol, which extracts the active medicinal compounds from the herbs and preserves the product.
*   The process is complete when bubbling stops and the liquid develops a characteristic aroma and taste.

#### 7. Filtration and Bottling
*   After fermentation, strain the liquid to remove all solid residues.
*   Allow the liquid to settle for a few days so fine particles can precipitate.
*   Decant or filter the clear liquid again if needed.
*   Store the final product in clean, airtight bottles away from sunlight.

### Summary Table: Key Differences

| Step | Arishta (Decoction) | Asava (Infusion) |
| :--- | :--- | :--- |
| **Herbal Base** | Decoction of dried herbs | Fresh juice or infusion of herbs |
| **Boiling Step** | Yes | No |
| **Fermentation Agent** | Dhataki/Madhuka flowers | Dhataki/Madhuka flowers |
| **Sweetener** | Jaggery/Honey | Jaggery/Honey |
| **Fermentation Period** | 2–8 weeks (1–3 months) | 2–8 weeks (1–3 months) |
| **Final Product** | Filtered, bottled, slightly alcoholic | Filtered, bottled, slightly alcoholic |

### Why This Process?
*   The fermentation naturally produces a small amount of alcohol (up to 12%), which helps extract both water- and alcohol-soluble medicinal compounds, improves shelf life, and enhances therapeutic effects.
*   No artificial preservatives or yeast are used; the process is entirely natural, relying on plant-based fermenting agents.'
  )
ON CONFLICT (slug) DO UPDATE 
SET 
  details = EXCLUDED.details,
  description = EXCLUDED.description;
