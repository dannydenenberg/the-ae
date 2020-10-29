import mongoose from "mongoose";

const startDB = () => {
  const { NODE_ENV, DB_SERVER, DB_NAME } = process.env;
  let URI = `${DB_SERVER}/${DB_NAME}`;

  if (NODE_ENV === "development") URI = `mongodb://localhost:27017/${DB_NAME}`;

  /** Start Database **/
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) console.log("🌽 there was an error in database connection");
      else console.log("🎉 db started");
    }
  );
};

export default startDB;
