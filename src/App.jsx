import WeatherApp from "./WeatherApp";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getTheme } from "./theme";

function App() {
  const [mode, setMode] = useState(() => {
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("weatherdesk-theme", mode);
    if (mode === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherApp
        mode={mode}
        onToggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      />
    </ThemeProvider>
  );
}

export default App;
