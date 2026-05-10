import { alpha, createTheme } from "@mui/material/styles";

const primaryMain = "#0ea5e9";
const light = {
  ink: "#0f172a",
  muted: "#475569",
  subtle: "#64748b",
  border: "#e2e8f0",
  paper: "#ffffff",
  page: "#f6f7fb",
  input: "#f1f5f9",
  inputHover: "#eef2f7",
  metric: "#f8fafc",
};

const dark = {
  ink: "#e2e8f0",
  muted: "#cbd5e1",
  subtle: "#94a3b8",
  border: "rgba(148, 163, 184, 0.24)",
  paper: "rgba(255, 255, 255, 0.05)",
  page: "#0b1120",
  input: "rgba(255, 255, 255, 0.07)",
  inputHover: "rgba(255, 255, 255, 0.085)",
  metric: "rgba(2, 6, 23, 0.2)",
};

export function getTheme(mode = "light") {
  const t = mode === "dark" ? dark : light;

  return createTheme({
    palette: {
      mode: mode === "dark" ? "dark" : "light",
      primary: { main: primaryMain },
      background: {
        default: t.page,
        paper: t.paper,
      },
      text: {
        primary: t.ink,
        secondary: t.muted,
      },
      divider: t.border,
    },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      '"Space Grotesk","Roboto","SF Pro Display","Segoe UI",system-ui,-apple-system,sans-serif',
    h1: { fontWeight: 650, letterSpacing: "-0.02em" },
    h2: { fontWeight: 650, letterSpacing: "-0.02em" },
    h3: { fontWeight: 650, letterSpacing: "-0.02em" },
    h4: { fontWeight: 650, letterSpacing: "-0.02em" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: t.paper,
          border: `1px solid ${t.border}`,
          boxShadow:
            mode === "dark"
              ? "0 18px 50px rgba(0, 0, 0, 0.45)"
              : "0 14px 34px rgba(15, 23, 42, 0.08)",
          backdropFilter: mode === "dark" ? "blur(14px)" : "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 650,
          letterSpacing: "0.01em",
        },
        containedPrimary: {
          backgroundColor: primaryMain,
          "&:hover": {
            backgroundColor: "#0284c7",
          },
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: t.input,
          border: `1px solid ${t.border}`,
          transition: "box-shadow 160ms ease, border-color 160ms ease",
          "&:hover": {
            backgroundColor: t.inputHover,
          },
          "&.Mui-focused": {
            borderColor: alpha(primaryMain, 0.7),
            boxShadow: `0 0 0 3px ${alpha(primaryMain, 0.16)}`,
            backgroundColor: t.input,
          },
        },
        input: {
          paddingTop: 18,
          paddingBottom: 10,
          color: t.ink,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: t.subtle,
          fontWeight: 550,
          "&.Mui-focused": {
            color: alpha(primaryMain, 0.95),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: alpha(primaryMain, 0.35),
          color: alpha(primaryMain, 0.95),
          backgroundColor: alpha(primaryMain, 0.06),
          fontWeight: 650,
        },
      },
    },
  },
  });
}
