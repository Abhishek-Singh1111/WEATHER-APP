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
    "https://plus.unsplash.com/premium_photo-1669809948017-518b5d800d73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
  const RAIN_URL =
    "https://images.unsplash.com/photo-1472142139238-2096aa90c8b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJhaW58ZW58MHx8MHx8fDA%3D";
  const HOT_URL =
    "https://images.unsplash.com/photo-1447601932606-2b63e2e64331?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
  const COLD_URL =
    "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";

  const condition = info?.weather
    ? info.weather.charAt(0).toUpperCase() + info.weather.slice(1)
    : "N/A";

  const heroImage =
    info.humidity > 80
      ? RAIN_URL
      : info.temp > 27
        ? HOT_URL
        : info.temp < 12
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
              <Typography variant="h5" component="div">
                {info.city}
              </Typography>
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
