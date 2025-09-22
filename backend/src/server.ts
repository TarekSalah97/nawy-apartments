import { createApp } from "./app";
import { config } from "./config/env";
import { connectMongo } from "./db/mongoose";
import { runApartmentSeed } from "./seed/apartmentSeeder";

async function boot() {
  await connectMongo();
  await runApartmentSeed();

  const app = createApp();
  app.listen(config.port, "0.0.0.0", () => {
  console.log(`API listening on http://0.0.0.0:${config.port}`);
});
  
}

boot().catch((e) => {
  console.error(e);
  process.exit(1);
});
