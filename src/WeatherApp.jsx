import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Seattle",
    temp: 18,
    tempMin: 15,
    tempMax: 21,
    humidity: 74,
    feelsLike: 19,
    weather: "light rain",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="app-shell">
      <div className="glass-panel">
        <div className="app-header">
          <span className="app-eyebrow">Live weather / metric units</span>
          <h1 className="app-title">Weather Desk</h1>
          <p className="app-subtitle">
            A clean snapshot of current conditions. Search any city worldwide
            to refresh the cards instantly.
          </p>
        </div>

        <div className="app-grid">
          <div>
            <SearchBox updateInfo={updateInfo} />
            <p className="quick-tip">
              <strong>Pro tip:</strong> add a country code for accuracy (e.g.,
              "Paris, FR").
            </p>
          </div>
          <InfoBox info={weatherInfo} />
        </div>
      </div>
    </div>
  );
}
