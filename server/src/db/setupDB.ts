import mongoose from "mongoose";

type SetupOpts = {
  host?: string;
  port?: number;
  db: string;
};

export default async function mongoSetup({ host = "localhost", port = 27017, db }: SetupOpts): Promise<void> {
  console.log("runnging db setup");
  console.log(`Environment is:  ${process.env.NODE_ENV}`);
  try {
    const dbURI: string = `mongodb://${host}:${port}/${db}`;
    await mongoose.connect(dbURI);
    console.log(`DB: ${db} is now connected`);
  } catch (e) {
    throw e;
  }
};
