export interface MenuItem {
  type?: string;
  label: string;
  icon?: string;
  url?: string;
  target?: string;
  children?: MenuItem[];
}

export interface MenuConfig {
  title: string;
  columns: number;
  scrollable: boolean;
  theme: "minimal" | "glass" | "bold";
  position: "bottom-right" | "bottom-left";
  items: MenuItem[];
}

export const DEFAULT_MENU_CONFIG: MenuConfig = {
  title: "Menu",
  columns: 2,
  scrollable: false,
  theme: "minimal",
  position: "bottom-right",
  items: [
    { type: "link", label: "Home", icon: "🏠", url: "#home" },
    { type: "link", label: "About", icon: "ℹ️", url: "#about" },
    { type: "link", label: "Contact", icon: "✉️", url: "#contact" },
    {
      type: "link",
      label: "More",
      icon: "📂",
      children: [
        { type: "link", label: "Blog", icon: "📝", url: "#blog" },
        { type: "link", label: "FAQ", icon: "❓", url: "#faq" },
      ],
    },
  ],
};

export const SAMPLE_CONFIGS: { label: string; config: MenuConfig }[] = [
  {
    label: "Shop",
    config: {
      title: "Shop",
      columns: 2,
      scrollable: false,
      theme: "minimal",
      position: "bottom-right",
      items: [
        { type: "link", label: "Home", icon: "⌂", url: "#home" },
        { type: "link", label: "Search", icon: "⌕", url: "#search" },
        {
          type: "link",
          label: "Categories",
          icon: "▦",
          children: [
            { type: "link", label: "Electronics", icon: "💻", url: "#electronics" },
            { type: "link", label: "Clothing", icon: "👕", url: "#clothing" },
            { type: "link", label: "Home & Garden", icon: "🏡", url: "#home-garden" },
            { type: "link", label: "Sports", icon: "⚽", url: "#sports" },
          ],
        },
        { type: "link", label: "Cart", icon: "🛒", url: "#cart" },
        { type: "link", label: "Orders", icon: "📦", url: "#orders" },
        { type: "link", label: "Account", icon: "👤", url: "#account" },
        { type: "link", label: "Help", icon: "❓", url: "#help" },
        { type: "link", label: "Settings", icon: "⚙", url: "#settings" },
      ],
    },
  },
  {
    label: "App",
    config: {
      title: "App",
      columns: 3,
      scrollable: true,
      theme: "bold",
      position: "bottom-right",
      items: [
        { type: "link", label: "Dashboard", icon: "📊", url: "#dashboard" },
        { type: "link", label: "Messages", icon: "💬", url: "#messages" },
        {
          type: "link",
          label: "Projects",
          icon: "📁",
          children: [
            { type: "link", label: "Active", icon: "🟢", url: "#active" },
            { type: "link", label: "Archived", icon: "📂", url: "#archived" },
            { type: "link", label: "Starred", icon: "⭐", url: "#starred" },
          ],
        },
        { type: "link", label: "Calendar", icon: "📅", url: "#calendar" },
        {
          type: "link",
          label: "Team",
          icon: "👥",
          children: [
            { type: "link", label: "Members", icon: "🧑‍💼", url: "#members" },
            { type: "link", label: "Invite", icon: "✉️", url: "#invite" },
            { type: "link", label: "Roles", icon: "🔑", url: "#roles" },
          ],
        },
        { type: "link", label: "Files", icon: "🗂", url: "#files" },
        { type: "link", label: "Analytics", icon: "📈", url: "#analytics" },
        { type: "link", label: "Settings", icon: "⚙", url: "#settings" },
      ],
    },
  },
];
