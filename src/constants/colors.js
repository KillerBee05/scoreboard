// Scoreboard color constants
// Following ARCHITECTURE.md: Use these instead of raw hex codes

// Team color presets (NBA-inspired)
export const TEAM_COLORS = {
  red: '#E31837',      // Bulls/Rockets red
  blue: '#1D428A',     // Sixers/Mavs blue
  green: '#007A33',    // Celtics green
  yellow: '#FFC72C',   // Lakers gold/yellow
  orange: '#E56020',   // Suns orange
  purple: '#5A2D82',   // Kings purple
  black: '#000000',    // Nets black
  white: '#FFFFFF',    // Spurs white
};

// Default team colors
export const DEFAULT_HOME_COLOR = TEAM_COLORS.red;
export const DEFAULT_VISITOR_COLOR = TEAM_COLORS.blue;

// Scoreboard theme (for the actual scoreboard display)
export const SCOREBOARD = {
  background: '#1A1A1A',    // Dark gray background
  text: '#FFFFFF',          // White text
  textDim: '#888888',       // Dimmed text for labels
  border: '#333333',        // Subtle borders
};

// App screens theme
export const SCREEN = {
  background: '#FFFFFF',    // White background for all screens
  text: '#1A1A1A',          // Dark text
  textDim: '#888888',       // Dimmed text
};

// Button colors
export const BUTTONS = {
  primary: '#E56020',       // Basketball orange - main action buttons
  danger: '#D94A4A',        // Reset/delete buttons
  success: '#4AD97A',       // Confirm buttons
  disabled: '#555555',      // Disabled state
};

// Basketball theme
export const BASKETBALL = {
  primary: '#E56020',       // Basketball orange
};
