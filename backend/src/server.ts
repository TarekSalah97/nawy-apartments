import { createApp } from "./app";
import { config } from "./config/env";
import { connectMongo } from "./db/mongoose";
import { runApartmentSeed } from "./seed/apartmentSeeder";

async function boot() {
  await connectMongo();
  await runApartmentSeed();

  const app = createApp();
  app.listen(config.port, () => {
    console.log(`API listening on http://localhost:${config.port}`);
  });
}

boot().catch((e) => {
  console.error(e);
  process.exit(1);
});
