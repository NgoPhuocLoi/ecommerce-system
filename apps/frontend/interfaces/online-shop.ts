export interface Page {
  id: number;
  name: string;
  layout: string;
  position?: number;
  link?: string;
  showInNavigation?: boolean;
  themeId?: number;
}
