import SearchBox from "./components/SearchBox";
import InfoBox from "./components/InfoBox";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function WeatherApp({ mode, onToggleMode }) {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Seattle",
    country: "US",
    coordLat: 47.6062,
    coordLon: -122.3321,
    temp: 18,
    tempMin: 15,
    tempMax: 21,
    humidity: 74,
    feelsLike: 19,
    pressure: 1012,
    visibility: 10000,
    windSpeed: 4,
    weather: "light rain",
    timestamp: Math.floor(Date.now() / 1000),
    timezoneOffset: 0,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState("");

  const FORECAST_URL =
    (import.meta.env.VITE_WEATHER_FORECAST_API_URL ??
      "https://api.openweathermap.org/data/2.5/forecast").trim();
  const API_KEY = (import.meta.env.VITE_WEATHER_API_KEY ?? "replace-me").trim();

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  useEffect(() => {
    const lat = weatherInfo?.coordLat;
    const lon = weatherInfo?.coordLon;
    if (typeof lat !== "number" || typeof lon !== "number") return undefined;
    if (!FORECAST_URL || !API_KEY || API_KEY === "replace-me") {
      setForecastError(
        "Forecast API not configured. Set VITE_WEATHER_API_KEY in .env and restart."
      );
      setForecast([]);
      setForecastLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    async function loadForecast() {
      setForecastLoading(true);
      setForecastError("");
      setForecast([]);
      try {
        const res = await fetch(
          `${FORECAST_URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(
            lon
          )}&appid=${encodeURIComponent(API_KEY)}&units=metric`,
          { signal: controller.signal }
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message = typeof data?.message === "string" ? data.message : "";
          setForecastError(
            `Forecast request failed (${res.status})${message ? `: ${message}` : ""}.`
          );
          setForecast([]);
          return;
        }

        const items = Array.isArray(data?.list) ? data.list : [];
        const now = typeof weatherInfo?.timestamp === "number" ? weatherInfo.timestamp : 0;
        const nextItems = items
          .filter((item) => typeof item?.dt === "number" && item.dt >= now)
          .slice(0, 8)
          .map((item) => ({
            timestamp: item.dt,
            temp: item?.main?.temp,
            feelsLike: item?.main?.feels_like,
            icon: item?.weather?.[0]?.icon,
            description: item?.weather?.[0]?.description,
            pop: typeof item?.pop === "number" ? item.pop : null,
          }));

        setForecast(nextItems);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setForecastError("Could not load hourly forecast.");
        setForecast([]);
      } finally {
        setForecastLoading(false);
      }
    }

    loadForecast();
    return () => controller.abort();
  }, [weatherInfo?.coordLat, weatherInfo?.coordLon, weatherInfo?.timestamp, weatherInfo?.city]);

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
        </div>

        <div className="app-stack">
          <div className="app-search-row">
            <SearchBox updateInfo={updateInfo} onLoadingChange={setIsFetching} />
            <p className="quick-tip">
              <strong>Pro tip:</strong> add a country code for accuracy (e.g.,
              "Paris, FR").
            </p>
          </div>

          <InfoBox
            info={weatherInfo}
            loading={isFetching}
            forecast={forecast}
            forecastLoading={forecastLoading}
            forecastError={forecastError}
          />
        </div>
      </div>
    </div>
  );
}
