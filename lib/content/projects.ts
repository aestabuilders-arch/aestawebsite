export type ProjectSlug =
  | 'padmavathy-apartments'
  | 'thuvar-bungalow'
  | 'saravanan-residence'
  | 'pushparaj-sustainable-housing';

export type ProjectStatus = 'completed' | 'ongoing' | 'coming-soon';

export type ProjectType =
  | 'Apartment'
  | 'Bungalow'
  | 'Residence'
  | 'Sustainable Housing';

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type ProjectThreeView = {
  design: ProjectImage;
  render: ProjectImage;
  site: ProjectImage;
};

export type ProjectGalleryItem = ProjectImage & {
  category?: 'design' | 'render' | 'construction' | 'site' | 'interior';
};

export type ProjectFacts = {
  builtUpSqft?: number;
  plotSqft?: number;
  floors?: string;
  completionYear?: number;
  scope?: string;
};

export type ProjectSolution = {
  title: string;
  body: string;
};

export type ProjectFAQ = {
  question: string;
  answer: string;
};

export type ProjectTestimonial = {
  quote: string;
  author: string;
  authorRole?: string;
};

export type ProjectContent = {
  slug: ProjectSlug;
  name: string;
  tagline: string;
  status: ProjectStatus;
  type: ProjectType;
  location: string;
  city: string;
  citySlug?: string;
  facts: ProjectFacts;
  cover: ProjectImage | null;
  brief?: string;
  siteContext?: string[];
  approach?: string[];
  solutions?: ProjectSolution[];
  threeView?: ProjectThreeView;
  gallery?: ProjectGalleryItem[];
  outcome?: string;
  testimonial?: ProjectTestimonial;
  faqs?: ProjectFAQ[];
  seo?: { title?: string; description?: string };
};

const PADMA_BASE = '/Assets/Projects/Padmavathy_Apartments/Elevation_Design';

export const PROJECTS: ProjectContent[] = [
  {
    slug: 'padmavathy-apartments',
    name: 'Padmavathy Apartments',
    tagline: 'A small-footprint apartment building designed around how a family actually lives.',
    status: 'completed',
    type: 'Apartment',
    location: 'North Second Street, Pudukkottai',
    city: 'Pudukkottai',
    citySlug: 'pudukkottai',
    facts: {
      floors: 'G+2',
      scope: 'Architecture, structure, construction',
    },
    cover: {
      src: `${PADMA_BASE}/mod_new2.jpg`,
      alt: 'Padmavathy Apartments — rendered front elevation, evening view',
    },
    brief:
      'Padmavathy Apartments is a compact urban apartment building on a narrow plot in central Pudukkottai. The brief asked for generous daylight, cross-ventilation, and a quiet street-facing facade — all on a footprint where every metre had to earn its place. We took the project from elevation design through rendered visualisation to as-built completion.',
    siteContext: [
      'Narrow plot with limited setbacks, bordered by existing structures on two sides.',
      'Hot-summer climate with strong west-afternoon sun on the primary facade.',
      'Dense street frontage limited the size and placement of openings without compromising privacy.',
      'Need to keep the apartment block neighbourly in scale despite a G+2 programme.',
    ],
    approach: [
      'Stepped massing on the upper floor to reduce visual bulk from the street.',
      'Deep horizontal shading bands sized for the latitude — read as design language, not add-ons.',
      'A central light-and-vent core to bring daylight to interior rooms without giving up privacy.',
      'A muted, warm palette — limestone, terracotta, off-white — that ages gracefully on Pudukkottai dust.',
      'Construction sequenced so structural milestones aligned with the family’s budget release.',
    ],
    solutions: [
      {
        title: 'Facade as climate response',
        body: 'The horizontal shading we drew at design stage carried straight through render and build. It is what keeps the west facade comfortable through April–June without leaning on AC.',
      },
      {
        title: 'Daylight without exposure',
        body: 'A skylit central stair pulls daylight deep into the plan, so even the inner rooms read bright. Street-facing windows stay narrow and high — light in, line-of-sight out.',
      },
      {
        title: 'One contractor, three phases',
        body: 'AESTA ran design, structural detailing, and on-site construction in-house. The owner had one accountable team — drawings, specs, and site decisions reconciled at the same desk.',
      },
    ],
    threeView: {
      design: {
        src: `${PADMA_BASE}/Elevation-Design-2.jpg`,
        alt: 'Padmavathy Apartments — elevation drawing showing facade composition and shading bands',
        caption:
          'Elevation drawing. The horizontal bands you see here are the climate response — sized to shade the facade through the hot months.',
      },
      render: {
        src: `${PADMA_BASE}/mod_new2.jpg`,
        alt: 'Padmavathy Apartments — rendered front elevation, dusk lighting',
        caption:
          'Rendered visualisation given to the client at the design-approval stage. Same proportions, finishes, and shading you will see on site today.',
      },
      site: {
        src: `${PADMA_BASE}/Construct_1.jpeg`,
        alt: 'Padmavathy Apartments — completed building photographed on site',
        caption:
          'As built. Structural sequencing kept the facade lines clean — no on-site improvisations, because the design and the spec already had the answers.',
      },
    },
    gallery: [
      {
        src: `${PADMA_BASE}/Elevation-Design-1.jpg`,
        alt: 'Padmavathy Apartments — alternate elevation study',
        category: 'design',
        caption: 'Earlier elevation study exploring window proportions.',
      },
      {
        src: `${PADMA_BASE}/mod_new1.jpg`,
        alt: 'Padmavathy Apartments — secondary rendered view',
        category: 'render',
        caption: 'Secondary render exploring the daytime read.',
      },
      {
        src: `${PADMA_BASE}/Construct_2.jpeg`,
        alt: 'Padmavathy Apartments — site photo, side view',
        category: 'construction',
        caption: 'Side view on site, after final finish coat.',
      },
    ],
    outcome:
      'Built on time, on the agreed structural spec, and recognisably the building we drew. The owner moved in and AESTA still maintains a design office in the building today — we live with our own work.',
    faqs: [
      {
        question: 'What was the biggest constraint at Padmavathy Apartments?',
        answer:
          'The plot. Narrow frontage, limited setbacks, and a hot west-facing primary facade. Almost every design decision — massing, openings, the shading bands — was a response to those three pressures.',
      },
      {
        question: 'How was the design carried into construction without drift?',
        answer:
          'AESTA ran design, structural detailing, and site execution as one team. The render the owner approved is the building that stands today — no value-engineering surprises, no improvised facade decisions on site.',
      },
      {
        question: 'How does the building handle Pudukkottai’s summers?',
        answer:
          'Through facade geometry, not equipment. The horizontal shading bands cut direct sun on the west elevation through April–June; a central daylight core ventilates the deep plan; the pale, warm palette reflects rather than absorbs heat.',
      },
      {
        question: 'Is this an AESTA-built project?',
        answer:
          'Yes. AESTA designed and constructed Padmavathy Apartments, and our own studio sits inside the building.',
      },
    ],
    seo: {
      title: 'Padmavathy Apartments — Pudukkottai apartment design & build | AESTA',
      description:
        'Case study: a small-footprint G+2 apartment building in central Pudukkottai. Elevation design, rendered visualisation, and as-built construction by AESTA Architects & Builders.',
    },
  },
  {
    slug: 'thuvar-bungalow',
    name: 'Thuvar Bungalow',
    tagline: 'A standalone family bungalow — case study in preparation.',
    status: 'coming-soon',
    type: 'Bungalow',
    location: 'Pudukkottai region, Tamil Nadu',
    city: 'Pudukkottai',
    citySlug: 'pudukkottai',
    facts: {
      scope: 'Architecture and construction',
    },
    cover: null,
    seo: {
      title: 'Thuvar Bungalow — case study in preparation | AESTA',
      description:
        'AESTA-designed standalone family bungalow in the Pudukkottai region. Full case study with drawings, renders, and site photos publishing soon.',
    },
  },
  {
    slug: 'saravanan-residence',
    name: 'Saravanan Residence',
    tagline: 'A private home for the Saravanan family — case study in preparation.',
    status: 'coming-soon',
    type: 'Residence',
    location: 'Pudukkottai region, Tamil Nadu',
    city: 'Pudukkottai',
    citySlug: 'pudukkottai',
    facts: {
      scope: 'Architecture and construction',
    },
    cover: null,
    seo: {
      title: 'Saravanan Residence — case study in preparation | AESTA',
      description:
        'A private home designed and built by AESTA. Full case study with site context, design drawings, and finished photos publishing soon.',
    },
  },
  {
    slug: 'pushparaj-sustainable-housing',
    name: 'Pushparaj Sustainable Housing',
    tagline: 'A residence built around climate, daylight, and material restraint — case study in preparation.',
    status: 'coming-soon',
    type: 'Sustainable Housing',
    location: 'Pudukkottai region, Tamil Nadu',
    city: 'Pudukkottai',
    citySlug: 'pudukkottai',
    facts: {
      scope: 'Sustainable design and construction',
    },
    cover: null,
    seo: {
      title: 'Pushparaj Sustainable Housing — case study in preparation | AESTA',
      description:
        'A residence designed by AESTA around passive cooling, daylight, and material restraint. Full case study publishing soon.',
    },
  },
];

export function getProject(slug: string): ProjectContent | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByStatus(status: ProjectStatus): ProjectContent[] {
  return PROJECTS.filter((p) => p.status === status);
}

export function getCompletedProjects(): ProjectContent[] {
  return getProjectsByStatus('completed');
}

export function getProjectSlugs(): ProjectSlug[] {
  return PROJECTS.map((p) => p.slug);
}
