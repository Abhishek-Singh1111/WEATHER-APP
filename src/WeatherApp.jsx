import SearchBox from "./components/SearchBox";
import InfoBox from "./components/InfoBox";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function WeatherApp({ mode, onToggleMode }) {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Seattle",
    temp: 18,
    tempMin: 15,
    tempMax: 21,
    humidity: 74,
    feelsLike: 19,
    windSpeed: 4,
    weather: "light rain",
    timestamp: Math.floor(Date.now() / 1000),
    timezoneOffset: 0,
  });
  const [isFetching, setIsFetching] = useState(false);

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="app-shell">
      <div className="glass-panel">
        <div className="app-header">
          <div className="header-row">
            <span className="app-eyebrow">Live weather / metric units</span>
            <Tooltip title={mode === "dark" ? "Switch to light" : "Switch to dark"}>
              <IconButton
                className="mode-toggle"
                onClick={onToggleMode}
                aria-label="Toggle dark mode"
                size="small"
              >
                {mode === "dark" ? (
                  <LightModeOutlinedIcon fontSize="small" />
                ) : (
                  <DarkModeOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </div>

          <h1 className="app-title">Weather Desk</h1>
          <p className="app-subtitle">
            A clean snapshot of current conditions. Search any city worldwide to
            refresh the card instantly.
          </p>
        </div>

        <div className="app-grid">
          <div>
            <SearchBox updateInfo={updateInfo} onLoadingChange={setIsFetching} />
            <p className="quick-tip">
              <strong>Pro tip:</strong> add a country code for accuracy (e.g.,
              "Paris, FR").
            </p>
          </div>
          <InfoBox info={weatherInfo} loading={isFetching} />
        </div>
      </div>
    </div>
  );
}
