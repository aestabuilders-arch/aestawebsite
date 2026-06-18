# Team headshots

Optional. Drop square headshots here and reference them from
`lib/content/team.ts` via each member's `photo` field.

## Convention

- `public/Assets/Team/hari-babu.jpg`
- Reference in `team.ts`:
  ```ts
  photo: { src: '/Assets/Team/hari-babu.jpg', alt: 'Hari Babu, founder and lead architect' }
  ```
- Square (1:1), JPG/WebP, ≥256px. Members render fine without a photo, so add
  these only when real headshots exist.
