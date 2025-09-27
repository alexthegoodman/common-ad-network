export const DIGITAL_PRODUCT_CATEGORIES = [
  'Developer Tools',
  'SaaS & Web Apps', 
  'Mobile Apps',
  'Design & Creative Tools',
  'Productivity & Organization',
  'Marketing & Sales Tools',
  'Analytics & Data',
  'AI & Machine Learning',
  'No-Code/Low-Code Platforms',
  'E-commerce & Online Stores',
  'Educational & Learning Platforms',
  'Communication & Collaboration',
  'Security & Privacy Tools',
  'Finance & Accounting',
  'Content Management',
  'API Services & Integrations',
  'Gaming & Entertainment',
  'Health & Fitness Apps',
  'Social Media & Community',
  'Other Digital Products'
] as const;

export type Category = typeof DIGITAL_PRODUCT_CATEGORIES[number];

export const getCategoryOptions = () => {
  return DIGITAL_PRODUCT_CATEGORIES.map(category => ({
    value: category,
    label: category
  }));
};