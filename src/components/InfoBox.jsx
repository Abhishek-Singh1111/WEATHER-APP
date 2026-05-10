import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import OpacityRoundedIcon from "@mui/icons-material/OpacityRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import "./InfoBox.css";
import { formatLocalDateTime, normalizeCondition } from "../utils/weather";
import { useEffect, useState } from "react";

export default function InfoBox({ info, loading }) {
  const [heroOk, setHeroOk] = useState(true);
  const INIT_URL = "https://images.unsplash.com/photo-1502209524168-aca6643e8f86?auto=format&fit=crop&w=1600&q=80";
  const RAIN_URL = "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1600&q=80";
  const CLOUD_URL = "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1600&q=80";
  const HOT_URL = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80";
  const COLD_URL = "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?auto=format&fit=crop&w=1600&q=80";
  const SNOW_URL = "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80";

  const condition = info?.weather
    ? info.weather.charAt(0).toUpperCase() + info.weather.slice(1)
    : "N/A";

  const description = info?.weather?.toLowerCase() ?? "";
  const conditionKey = normalizeCondition(description);
  const iconUrl = info?.icon
    ? `https://openweathermap.org/img/wn/${info.icon}@2x.png`
    : null;

  const tempValue = typeof info?.temp === "number" ? info.temp : 0;
  const feelsLikeValue =
    typeof info?.feelsLike === "number" ? Math.round(info.feelsLike) : null;
  const minValue = typeof info?.tempMin === "number" ? Math.round(info.tempMin) : null;
  const maxValue = typeof info?.tempMax === "number" ? Math.round(info.tempMax) : null;
  const heroVariant = conditionKey === "sun"
    ? tempValue > 30
      ? "hot"
      : tempValue < 8
        ? "cold"
        : "clear"
    : conditionKey;

  const heroImageUrl =
    heroVariant === "snow"
      ? SNOW_URL
      : heroVariant === "rain"
        ? RAIN_URL
        : heroVariant === "cloud"
          ? CLOUD_URL
          : heroVariant === "hot"
            ? HOT_URL
      : heroVariant === "cold"
        ? COLD_URL
        : INIT_URL;

  const local = formatLocalDateTime(info?.timestamp, info?.timezoneOffset);

  useEffect(() => {
    setHeroOk(true);
  }, [heroImageUrl]);

  return (
    <div className="cardContainer">
      <Card className={`info-card${loading ? " is-loading" : ""}`}>
        <div className={`info-hero-wrap hero--${heroVariant}`}>
          {heroOk ? (
            <CardMedia
              component="img"
              className="info-hero-img"
              image={heroImageUrl}
              alt="Weather background"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setHeroOk(false)}
            />
          ) : (
            <div className="info-hero-fallback" aria-hidden="true" />
          )}
          <div className="info-hero-overlay" />
          <div className={`hero-fx hero-fx--${heroVariant}`} aria-hidden="true" />
          <div className="info-hero-inner">
            <div className="hero-left">
              <p className="info-kicker">Currently</p>
              <Typography variant="h5" component="div" className="hero-city">
                {info.city}
              </Typography>
              <p className="info-subtitle">{condition}</p>
              {local && (
                <p className="info-datetime">
                  {local.date} · {local.time}
                </p>
              )}
            </div>

            <div className="hero-right">
              {loading && (
                <div className="hero-loading" aria-label="Loading weather">
                  <CircularProgress size={18} color="inherit" />
                </div>
              )}
              {iconUrl && (
                <img
                  className="condition-icon"
                  src={iconUrl}
                  alt={condition}
                  loading="lazy"
                />
              )}
              <Chip
                label={`${Math.round(tempValue)}\u00b0C`}
                variant="outlined"
                color="primary"
              />
            </div>
          </div>
        </div>

        <CardContent className="info-content">
          <div className="temp-block">
            <Typography variant="h3" className="temp-main">
              {Math.round(tempValue)}
              <span className="temp-unit">{"\u00b0"}C</span>
            </Typography>
            <Typography className="temp-feels">
              Feels like{" "}
              {feelsLikeValue === null ? "N/A" : `${feelsLikeValue}\u00b0C`}
            </Typography>
          </div>

          <div className="metric-grid">
            <div className="metric">
              <ArrowDownwardRoundedIcon className="metric-icon" />
              <span className="label">Min temp</span>
              <span className="value">
                {minValue === null ? "N/A" : `${minValue}\u00b0C`}
              </span>
            </div>
            <div className="metric">
              <ArrowUpwardRoundedIcon className="metric-icon" />
              <span className="label">Max temp</span>
              <span className="value">
                {maxValue === null ? "N/A" : `${maxValue}\u00b0C`}
              </span>
            </div>
            <div className="metric">
              <OpacityRoundedIcon className="metric-icon" />
              <span className="label">Humidity</span>
              <span className="value">
                {info.humidity ? `${info.humidity}%` : "N/A"}
              </span>
            </div>
            <div className="metric">
              <AirRoundedIcon className="metric-icon" />
              <span className="label">Wind</span>
              <span className="value">
                {typeof info.windSpeed === "number"
                  ? `${Math.round(info.windSpeed)} m/s`
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
