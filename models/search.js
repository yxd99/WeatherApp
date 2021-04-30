const axios = require("axios");
const fs = require("fs");
const { primary } = require("../helpers/color");

class Search {
  history = [];
  dbPath = "./db/history.json";

  constructor() {
    this.readDB();
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: process.env.LANGUAGE_API,
      limit: 5,
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: process.env.LANGUAGE_API,
      units: "metric",
    };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const result = await instance.get();

      return result.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        longitude: place.center[0],
        latitude: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(latitude, longitude) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          ...this.paramsOpenWeather,
          lat: latitude,
          lon: longitude,
        },
      });

      const result = await instance.get();
      const { weather, main } = result.data;

      return {
        description: weather[0].description,
        temperature: main.temp,
        temperature_min: main.temp_min,
        temperature_max: main.temp_max,
      };
    } catch (error) {
      throw error;
    }
  }

  async addHistory({ id, name, latitude, longitude }) {
    const idReplace = this.history.findIndex((place) => place.id == id);
    if (idReplace != -1) {
      this.history.splice(idReplace, 1);
    }
    if (this.history.length == 5) {
      this.history.pop();
    }
    this.history.unshift({
      id,
      name,
      latitude,
      longitude,
    });
    this.saveDB();
  }

  saveDB() {
    const data = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(data));
  }

  readDB() {
    const config = {
      encoding: "utf-8",
    };
    const file = fs.readFileSync(this.dbPath, { ...config });
    this.history = JSON.parse(file)?.history;
    console.log(this.history);
  }

  async showInfo({ name, latitude, longitude }) {
    const infoPlace = await this.weatherPlace(latitude, longitude);

    let result = `\n${primary("Ciudad: ")} ${name}`;
    result += `\n${primary("Latitud: ")} ${latitude}`;
    result += `\n${primary("Longitud: ")} ${longitude}`;
    result += `\n${primary("Clima: ")} ${infoPlace.description}`;
    result += `\n${primary("Temperatura: ")} ${infoPlace.temperature}`;
    result += `\n${primary("Temperatura Minima: ")} ${
      infoPlace.temperature_min
    }`;
    result += `\n${primary("Temperatura Maxima: ")} ${
      infoPlace.temperature_max
    }`;

    return result;
  }
}

module.exports = Search;
