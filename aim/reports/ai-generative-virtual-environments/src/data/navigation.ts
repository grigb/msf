/**
 * Navigation data for the MSF AI Virtual Environments Reference Site
 * Used by TopNav and Sidebar components
 */

export interface NavItem {
  label: string;
  href: string;
  items?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Main navigation links for TopNav
 */
export const mainNavLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Scope', href: '/scope/' },
  { label: 'Landscape', href: '/landscape/' },
  { label: 'Implementations', href: '/implementations/' },
  { label: 'Standards', href: '/standards/' },
  { label: 'Gaps', href: '/gaps/' },
  { label: 'Coordination', href: '/coordination/' },
  { label: 'Maturity', href: '/maturity/' },
  { label: 'Recommendations', href: '/recommendations/' },
];

/**
 * Sidebar navigation sections
 * Organized by report structure with nested items
 */
export const navigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Scope & Definition', href: '/scope/' },
      { label: 'Current Landscape', href: '/landscape/' },
    ],
  },
  {
    title: 'Implementations',
    items: [
      {
        label: 'Overview',
        href: '/implementations/',
        items: [
          { label: 'World Labs Marble', href: '/implementations/world-labs-marble/' },
          { label: 'Google Genie 3', href: '/implementations/google-genie-3/' },
          { label: 'NVIDIA Cosmos', href: '/implementations/nvidia-cosmos/' },
          { label: 'Meta Horizon', href: '/implementations/meta-horizon/' },
          { label: 'Roblox Cube', href: '/implementations/roblox-cube/' },
          { label: 'Meshy AI', href: '/implementations/meshy-ai/' },
          { label: 'Luma AI', href: '/implementations/luma-ai/' },
          { label: 'Meta WorldGen', href: '/implementations/meta-worldgen/' },
          { label: 'Blockade Labs', href: '/implementations/blockade-labs/' },
          { label: 'Hyper3D Rodin', href: '/implementations/hyper3d-rodin/' },
        ],
      },
    ],
  },
  {
    title: 'Standards & Gaps',
    items: [
      { label: 'Standards Inventory', href: '/standards/' },
      { label: 'Gap Analysis', href: '/gaps/' },
      { label: 'SDO Coordination', href: '/coordination/' },
    ],
  },
  {
    title: 'Assessment',
    items: [
      { label: 'Maturity Assessment', href: '/maturity/' },
      { label: 'Recommendations', href: '/recommendations/' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'Appendices', href: '/appendices/' },
    ],
  },
];

/**
 * Footer links
 */
export const footerLinks: NavItem[] = [
  { label: 'Metaverse Standards Forum', href: 'https://metaverse-standards.org' },
  { label: 'Appendices', href: '/appendices/' },
  { label: 'Methodology', href: '/appendices/methodology/' },
  { label: 'Sources', href: '/appendices/sources/' },
];
