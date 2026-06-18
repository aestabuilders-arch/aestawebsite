# Equipment & infrastructure photos

Drop real photos of AESTA's owned plant and equipment here, then reference them
from `lib/content/equipment.ts` via each category's `images` array.

## Convention

- One sub-folder per category slug, e.g.:
  - `public/Assets/Equipment/earthwork-excavation/`
  - `public/Assets/Equipment/concrete-batching/`
- Reference in `equipment.ts`:
  ```ts
  images: [
    {
      src: '/Assets/Equipment/earthwork-excavation/jcb-on-site.jpg',
      alt: 'AESTA-owned backhoe loader on a Pudukkottai site',
    },
  ];
  ```
- Landscape ~4:3, JPG/WebP, ideally ≥1000px wide. The first image in the array
  is used as the category card cover. Categories with no `images` render a clean
  placeholder, so the page works before photos are added.

Use genuine photos of your own yard / machinery — real images are what make the
"we own this" claim persuasive.
