/**
 * Material UI theme configuration for the frontend app.
 *
 * Centralizes color palette and typography overrides so components
 * can consume a consistent design system via `ThemeProvider`.
 *
 * @module frontend/theme
 */
import { indigo, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      // light: ""
      // dark: ""
      contrastText: "#ffffff",
    },
    secondary: {
      main: indigo[500], // ff9800
      // light: ""
      // dark: ""
      // contrastText:  ""
    },
    background: {
      default: "#ffe0b2", // "#f9fafb",
      paper: "#fff3e0",
    },
    text: {
      primary: "#111827", // Main text color (headings, body)
      secondary: "#6b7280", // Secondary text (captions, hints)
      disabled: "#9ca3af", // Disabled text
    },
  },
});

export default theme;
