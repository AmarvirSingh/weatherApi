import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import axios from "axios";
const app = express();
app.use(
  cors({
    origin: ["https://amar-weather-app.vercel.app"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "Your app is up" });
});
//app.get();
app.post("/getWeather", async (req, res) => {
  const { location } = req.body;

  const options = {
    method: "GET",
    url: `${process.env.WEATHER_API}/${location}/EN`,
    headers: {
      "x-rapidapi-key": `${process.env.API_KEY}`,
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  //  console.log(location);
  const response = await axios.request(options);
  res.json({
    location: response.data.name,
    temp: response.data.main.temp,
    minTemp: response.data.main.temp_min,
    maxTemp: response.data.main.temp_max,
    feelsLike: response.data.main.feels_like,
    icon: response.data.weather[0].icon,
    weather: response.data.weather[0].main,
    description: response.data.weather[0].description,
    country: response.data.sys.country,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is started", process.env.PORT);
});
