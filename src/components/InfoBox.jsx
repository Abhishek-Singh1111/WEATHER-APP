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
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import CompressRoundedIcon from "@mui/icons-material/CompressRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import "./InfoBox.css";
import { formatLocalDateTime, heroVariantFromOpenWeather } from "../utils/weather";
import { useEffect, useState } from "react";

export default function InfoBox({
  info,
  loading,
  forecast = [],
  forecastLoading = false,
  forecastError = "",
}) {
  const [heroOk, setHeroOk] = useState(true);
  const INIT_URL = "https://wallpaperaccess.com/full/3482171.jpg";
  const RAIN_URL = "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";
  const CLOUD_URL = "https://t4.ftcdn.net/jpg/06/28/52/09/360_F_628520967_SslB1PbLm3xb2lDIrV31w9zmPbyM19Qe.jpg";
  const HOT_URL = "https://media.istockphoto.com/id/1323823418/photo/low-angle-view-thermometer-on-blue-sky-with-sun-shining.jpg?s=2048x2048&w=is&k=20&c=vs-wMhpIBhtgOfVrwVCGOIqto--JCLnYkunCXaq0F7c=";
  const COLD_URL = "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?auto=format&fit=crop&w=1600&q=80";
  const SNOW_URL = "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80";
  const THUNDER_URL = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80";
  const MIST_URL = "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=1600&q=80";

  const condition = info?.weather
    ? info.weather.charAt(0).toUpperCase() + info.weather.slice(1)
    : "N/A";

  const description = info?.weather?.toLowerCase() ?? "";
  const iconUrl = info?.icon
    ? `https://openweathermap.org/img/wn/${info.icon}@2x.png`
    : null;

  const tempValue = typeof info?.temp === "number" ? info.temp : 0;
  const feelsLikeValue =
    typeof info?.feelsLike === "number" ? Math.round(info.feelsLike) : null;
  const minValue = typeof info?.tempMin === "number" ? Math.round(info.tempMin) : null;
  const maxValue = typeof info?.tempMax === "number" ? Math.round(info.tempMax) : null;
  const pressureValue =
    typeof info?.pressure === "number" ? Math.round(info.pressure) : null;
  const visibilityKm =
    typeof info?.visibility === "number"
      ? Math.max(0, Math.round((info.visibility / 1000) * 10) / 10)
      : null;
  const heroVariant = heroVariantFromOpenWeather({
    icon: info?.icon,
    description,
    temp: tempValue,
    feelsLike: typeof info?.feelsLike === "number" ? info.feelsLike : undefined,
  });

  const heroImageUrl =
    heroVariant === "snow"
      ? SNOW_URL
      : heroVariant === "thunder"
        ? THUNDER_URL
      : heroVariant === "rain"
        ? RAIN_URL
        : heroVariant === "mist"
          ? MIST_URL
        : heroVariant === "cloud"
          ? CLOUD_URL
          : heroVariant === "hot"
            ? HOT_URL
      : heroVariant === "cold"
        ? COLD_URL
        : INIT_URL;

  const updatedAt = formatLocalDateTime(info?.timestamp, info?.timezoneOffset);
  const [localNow, setLocalNow] = useState(() =>
    formatLocalDateTime(Math.floor(Date.now() / 1000), info?.timezoneOffset)
  );

  useEffect(() => {
    setHeroOk(true);
  }, [heroImageUrl]);

  useEffect(() => {
    if (typeof info?.timezoneOffset !== "number") {
      setLocalNow(null);
      return undefined;
    }

    const tick = () =>
      setLocalNow(
        formatLocalDateTime(Math.floor(Date.now() / 1000), info.timezoneOffset)
      );

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [info?.timezoneOffset]);

  const hourly = Array.isArray(forecast) ? forecast : [];

  return (
    <div className="weather-layout">
      <Card className={`hero-card${loading ? " is-loading" : ""}`}>
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
              {localNow && (
                <p className="info-datetime">
                  <span className="info-datetime-label">
                    Local time {localNow.tz ? `(${localNow.tz})` : ""}
                  </span>
                  <span className="info-datetime-value">
                    {localNow.date} {" | "} {localNow.time}
                  </span>
                </p>
              )}
              {updatedAt && (
                <p className="info-updated">
                  Updated {updatedAt.time} {updatedAt.tz ? `(${updatedAt.tz})` : ""}
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
      </Card>

      <div className="bottom-grid">
        <Card className="panel-card current-card">
          <CardContent className="panel-content">
            <div className="panel-head">
              <p className="panel-title">Current details</p>
              <p className="panel-subtitle">What it feels like right now</p>
            </div>

            <div className="temp-block temp-block--compact">
              <Typography variant="h3" className="temp-main">
                {Math.round(tempValue)}
                <span className="temp-unit">{"\u00b0"}C</span>
              </Typography>
              <Typography className="temp-feels">
                {condition}
              </Typography>
            </div>

            <div className="metric-grid metric-grid--details">
              <div className="metric">
                <ThermostatRoundedIcon className="metric-icon" />
                <span className="label">Feels like</span>
                <span className="value">
                  {feelsLikeValue === null ? "N/A" : `${feelsLikeValue}\u00b0C`}
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
              <div className="metric">
                <CompressRoundedIcon className="metric-icon" />
                <span className="label">Pressure</span>
                <span className="value">
                  {pressureValue === null ? "N/A" : `${pressureValue} hPa`}
                </span>
              </div>
              <div className="metric">
                <VisibilityRoundedIcon className="metric-icon" />
                <span className="label">Visibility</span>
                <span className="value">
                  {visibilityKm === null ? "N/A" : `${visibilityKm} km`}
                </span>
              </div>
              <div className="metric">
                <ArrowDownwardRoundedIcon className="metric-icon" />
                <span className="label">Min / Max</span>
                <span className="value">
                  {minValue === null || maxValue === null ? "N/A" : `${minValue}\u00b0 / ${maxValue}\u00b0`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="panel-card forecast-card">
          <CardContent className="panel-content">
            <div className="forecast-head">
              <div>
                <p className="forecast-title">Hourly forecast</p>
                <p className="forecast-subtitle">Next hours | 3-hour steps</p>
              </div>
              {forecastLoading && (
                <div className="forecast-loading" aria-label="Loading hourly forecast">
                  <CircularProgress size={16} color="inherit" />
                </div>
              )}
            </div>

            {forecastError ? (
              <p className="forecast-error" role="status" aria-live="polite">
                {forecastError}
              </p>
            ) : forecastLoading && !hourly.length ? (
              <div className="forecast-list forecast-list--skeleton" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div className="forecast-item forecast-item--skeleton" key={idx}>
                    <div className="forecast-time">
                      <span className="skeleton skeleton--line" />
                      <span className="skeleton skeleton--subline" />
                    </div>
                    <div className="forecast-mid">
                      <span className="skeleton skeleton--icon" />
                    </div>
                    <div className="forecast-right">
                      <span className="skeleton skeleton--temp" />
                      <span className="skeleton skeleton--subline" />
                    </div>
                  </div>
                ))}
              </div>
            ) : hourly.length ? (
              <div className="forecast-list" role="list" aria-label="Hourly forecast">
                {hourly.map((item) => {
                  const itemLocal = formatLocalDateTime(
                    item?.timestamp,
                    info?.timezoneOffset
                  );
                  const showDate = localNow?.date && itemLocal?.date !== localNow.date;
                  const pop =
                    typeof item?.pop === "number"
                      ? `${Math.round(item.pop * 100)}%`
                      : null;
                  const icon = typeof item?.icon === "string" ? item.icon : "";
                  const temp =
                    typeof item?.temp === "number" ? `${Math.round(item.temp)}\u00b0` : "—";

                  return (
                    <div className="forecast-item" role="listitem" key={item.timestamp}>
                      <div className="forecast-time">
                        <span className="forecast-time-main">
                          {itemLocal?.time ?? "—"}
                        </span>
                        <span className="forecast-time-sub">
                          {showDate ? itemLocal.date : item?.description ?? ""}
                        </span>
                      </div>
                      <div className="forecast-mid">
                        {icon ? (
                          <img
                            className="forecast-icon"
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt={item?.description ?? "Forecast"}
                            loading="lazy"
                          />
                        ) : (
                          <span className="forecast-icon-fallback" aria-hidden="true" />
                        )}
                      </div>
                      <div className="forecast-right">
                        <span className="forecast-temp">{temp}</span>
                        <span className="forecast-pop">{pop ?? ""}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="forecast-empty" role="status" aria-live="polite">
                No hourly forecast available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
