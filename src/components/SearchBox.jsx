import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo, onLoadingChange }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL =
    (import.meta.env.VITE_WEATHER_API_URL ??
      "https://api.openweathermap.org/data/2.5/weather").trim();
  const API_KEY = (import.meta.env.VITE_WEATHER_API_KEY ?? "replace-me").trim();

  const getWeatherInfo = async () => {
    if (!city.trim()) {
      setError("Enter a city to search");
      return null;
    }

    if (!API_URL || !API_KEY || API_KEY === "replace-me") {
      setError(
        "API configuration missing. Set VITE_WEATHER_API_URL and VITE_WEATHER_API_KEY in .env, then restart dev server."
      );
      return null;
    }

    try {
      const res = await fetch(
        `${API_URL}?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(
          API_KEY
        )}&units=metric`
      );
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        const message =
          typeof data?.message === "string" ? ` (${data.message})` : "";
        setError(
          `API key rejected${message}. Double-check VITE_WEATHER_API_KEY in .env and restart the dev server. If you just created the key, wait a bit and try again.`
        );
        return null;
      }

      if (!res.ok) {
        const message = typeof data?.message === "string" ? data.message : "";
        if (res.status === 404) {
          setError('Not found. Search a city (e.g. "Nuuk, GL"), not a country.');
        } else {
          setError(
            `Request failed (${res.status})${message ? `: ${message}` : ""}.`
          );
        }
        return null;
      }

      if (!data.main || !data.weather) {
        setError("No matching city found. Try city + country code.");
        return null;
      }

      const result = {
        city: data.name,
        country: data.sys?.country,
        coordLat: data.coord?.lat,
        coordLon: data.coord?.lon,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
        visibility: data.visibility,
        windSpeed: data.wind?.speed,
        weather: data.weather[0].description,
        icon: data.weather[0].icon,
        timestamp: data.dt,
        timezoneOffset: data.timezone,
      };

      setError("");
      return result;
    } catch {
      setError("Error fetching weather data. Please retry.");
      return null;
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    onLoadingChange?.(true);
    try {
      const newInfo = await getWeatherInfo();
      if (newInfo) {
        updateInfo(newInfo);
        setCity("");
      }
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={city}
          id="city"
          label="City"
          placeholder='e.g. "Paris, FR"'
          variant="filled"
          fullWidth
          required
          autoComplete="off"
          inputMode="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RoomOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: city ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="Clear search"
                  onClick={() => setCity("")}
                  edge="end"
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          endIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SearchRoundedIcon />
            )
          }
          sx={{
            paddingY: 1.3,
            paddingX: 2.6,
            minWidth: 140,
          }}
        >
          {loading ? "Searching" : "Search"}
        </Button>
      </form>
      <Collapse in={Boolean(error)}>
        <Alert
          className="error-alert"
          severity="error"
          variant="outlined"
          role="alert"
          aria-live="polite"
        >
          {error}
        </Alert>
      </Collapse>
    </div>
  );
}
