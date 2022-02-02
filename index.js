const app = require('./app');
const database = require('./config/database');
const { port } = require('./config');
const { BatteryCheckJob } = require('./cronjobs');

const startServer = async () => {
  await database.connect();
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    BatteryCheckJob.start();
    console.log(`Bot listenenig on port ${port}`);
  });
};

startServer();