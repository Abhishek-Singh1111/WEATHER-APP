import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const API_URL =
    import.meta.env.VITE_WEATHER_API_URL ??
    "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY ??
    "85aaeb4443005a19af498c8848230989";

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
        `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (!data.main || !data.weather) {
        setError("No matching city found. Try city + country code.");
        return null;
      }

      const result = {
        city: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].description,
      };

      setError("");
      return result;
    } catch (err) {
      setError("Error fetching weather data. Please retry.");
      return null;
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
      setCity("");
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={city}
          id="city"
          label="Search city"
          variant="filled"
          fullWidth
          required
          InputProps={{
            disableUnderline: true,
            style: {
              color: "#e2e8f0",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 12,
              paddingLeft: 8,
            },
          }}
          InputLabelProps={{
            style: { color: "#cbd5e1" },
          }}
          sx={{
            "& .MuiFilledInput-root": {
              border: "1px solid rgba(148, 163, 184, 0.25)",
              borderRadius: 12,
            },
            "& .MuiFilledInput-root.Mui-focused": {
              borderColor: "rgba(56, 189, 248, 0.7)",
              boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.25)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#7dd3fc",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<SearchRoundedIcon />}
          sx={{
            paddingY: 1.3,
            paddingX: 2.6,
            borderRadius: 12,
            fontWeight: 600,
            letterSpacing: "0.02em",
            textTransform: "none",
          }}
        >
          Search
        </Button>
      </form>

      <p className="search-hint">
        Example: "Lisbon" or "Lisbon, PT". Uses OpenWeather metric units.
      </p>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
