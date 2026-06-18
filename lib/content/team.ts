// Team content — boutique / senior-only positioning.
//
// AESTA's edge is NOT headcount; it is that every project is led by senior,
// NIT-credentialed people with no junior hand-offs. So we present ROLE COVERAGE
// and CREDENTIALS, not inflated staff numbers. Keep this honest: add real
// members below as they are confirmed, leave `name` undefined for roles we
// describe but don't name publicly, and only add a `photo` once a real
// headshot exists in /public/Assets/Team/.

export type TeamMember = {
  /** Omit for roles described without a public name (e.g. site engineer). */
  name?: string;
  role: string;
  /** Short credential line, e.g. "B.Arch, NIT Trichy". */
  credential?: string;
  bio: string;
  /** Optional headshot in /public/Assets/Team/. Renders only when present. */
  photo?: { src: string; alt: string };
};

export type RoleCoverage = {
  role: string;
  detail: string;
};

// The one-line argument for the boutique model, used above the team grid.
export const TEAM_PRINCIPLE =
  'A deliberately small, senior team. The people who design your home are the people accountable for building it — no junior hand-offs, no anonymous site contractor.';

// Disciplines covered in-house. This is the honest substitute for a headcount
// stat: it proves we cover the full design-build chain ourselves.
export const ROLE_COVERAGE: RoleCoverage[] = [
  {
    role: 'Architecture',
    detail: 'NIT Trichy-credentialed architects lead every design — rare in this market.',
  },
  {
    role: 'Civil & structural engineering',
    detail: 'Senior civil engineers size the structure and sign off each milestone in-house.',
  },
  {
    role: 'Project management',
    detail: 'One accountable owner per project — scheduling, procurement and client reporting.',
  },
  {
    role: 'Site supervision',
    detail: 'Daily on-site supervision by experienced engineers, not left to a sub-contractor.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Hari Babu',
    role: 'Founder, lead architect',
    credential: 'B.Arch, NIT Trichy (2011–2016)',
    bio: 'Founded AESTA in 2010 alongside an emerging architectural practice. Splits time between AESTA project oversight, Neram Classes (educational initiative), and architectural research.',
  },
  {
    role: 'Senior civil engineer',
    credential: 'Site supervision lead',
    bio: 'Runs daily site supervision and milestone quality checks across active projects. Full bio shared on request during your consultation.',
  },
];
