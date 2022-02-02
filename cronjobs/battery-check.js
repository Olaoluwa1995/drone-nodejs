const CronJob = require('cron').CronJob;
const DroneService = require('../services/drone-service'); 

var job = new CronJob({
        cronTime: "*/30 * * * * *", // Used every 30 seconds so you can quickly see the result. I wouldn't do this for a real project.
        onTick: function() {
            DroneService.logBatteryLevel();
        },
        start: false, //don't start immediately
        timeZone: 'America/Los_Angeles'
    });

module.exports = job;