// Options for "What are you planning?" on the quick enquiry form. Labels live
// in the `leads.types` i18n namespace; content files reference these keys to
// preselect the right option per page.
export const PROJECT_TYPES = [
  'house',
  'commercial',
  'renovation',
  'design',
  'structural',
  'interiors',
  'other',
] as const;

export type ProjectTypeKey = (typeof PROJECT_TYPES)[number];
