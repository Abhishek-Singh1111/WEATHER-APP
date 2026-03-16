import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import OpacityRoundedIcon from "@mui/icons-material/OpacityRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const INIT_URL =
    "https://wallpaperaccess.com/full/3482171.jpg";
  const RAIN_URL =
    "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";
  const CLOUD_URL =
"https://static.vecteezy.com/system/resources/thumbnails/065/872/359/small/sky-is-full-of-clouds-and-stars-photo.jpg" ;
 const HOT_URL ="https://als-gardencenter.com/cdn/shop/articles/iStock-996611730.jpg?v=1655772592"; 
   const COLD_URL =
"https://media.istockphoto.com/id/1548122985/photo/storm-clouds.jpg?s=612x612&w=0&k=20&c=ZiBAD5PNKjcIQwxj1S2onRgLUb5kEX3pjWGM_1v9T3U="  ;
const SNOW_URL =
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80";

  const condition = info?.weather
    ? info.weather.charAt(0).toUpperCase() + info.weather.slice(1)
    : "N/A";

  const description = info?.weather?.toLowerCase() ?? "";
  const iconUrl = info?.icon
    ? `https://openweathermap.org/img/wn/${info.icon}@2x.png`
    : null;

  const heroImage = description.includes("snow")
    ? SNOW_URL
    : description.includes("rain") || description.includes("drizzle")
      ? RAIN_URL
      : description.includes("cloud")
        ? CLOUD_URL
        : info.temp > 27
          ? HOT_URL
          : info.temp < 8
            ? COLD_URL
            : INIT_URL;

  return (
    <div className="cardContainer">
      <Card className="info-card">
        <CardMedia component="div" className="info-hero" image={heroImage} />

        <CardContent className="info-content">
          <div className="info-top">
            <div>
              <p className="info-kicker">Currently</p>
              <div className="city-row">
                <Typography variant="h5" component="div">
                  {info.city}
                </Typography>
                {iconUrl && (
                  <img
                    className="condition-icon"
                    src={iconUrl}
                    alt={condition}
                    loading="lazy"
                  />
                )}
              </div>
              <p className="info-subtitle">{condition}</p>
            </div>
            <Chip
              label={`${Math.round(info.temp)}\u00b0C`}
              className="chip-pill"
              variant="outlined"
              color="primary"
            />
          </div>

          <div className="temp-block">
            <Typography variant="h3" className="temp-main">
              {Math.round(info.temp)}
              <span className="temp-unit">{"\u00b0"}C</span>
            </Typography>
            <Typography className="temp-feels">
              Feels like {Math.round(info.feelsLike)}
              {"\u00b0"}C
            </Typography>
          </div>

          <div className="metric-grid">
            <div className="metric">
              <ArrowDownwardRoundedIcon className="metric-icon" />
              <span className="label">Min temp</span>
              <span className="value">
                {Math.round(info.tempMin)}
                {"\u00b0"}C
              </span>
            </div>
            <div className="metric">
              <ArrowUpwardRoundedIcon className="metric-icon" />
              <span className="label">Max temp</span>
              <span className="value">
                {Math.round(info.tempMax)}
                {"\u00b0"}C
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
              <span className="label">Feels like</span>
              <span className="value">
                {Math.round(info.feelsLike)}
                {"\u00b0"}C
              </span>
            </div>
            <div className="metric">
              <ExploreRoundedIcon className="metric-icon" />
              <span className="label">Condition</span>
              <span className="value">{condition}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
