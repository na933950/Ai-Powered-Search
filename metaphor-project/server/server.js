const dotenv = require("dotenv");

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });
  
  process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
  });

//Get environment variables in local directory
dotenv.config({ path: `${__dirname}/config.env` });

const app = require(`./app`);

//Run local server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
