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
    data: response.data,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is started", process.env.PORT);
});
