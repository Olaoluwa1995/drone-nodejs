const CronJob = require('cron').CronJob;
const DroneService = require('../services/drone-service'); 

var job = new CronJob({
        cronTime: "*/30 * * * * *", //every five minutes
        onTick: function() {
            DroneService.logBatteryLevel();
        },
        start: false, //don't start immediately
        timeZone: 'America/Los_Angeles'
    });
    
job.start()