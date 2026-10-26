import { config } from "./env.config.js";

export const corsOption = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: config.http.client_host,
  // methods: ["get", "post"],
};
