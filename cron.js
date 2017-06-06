var CronJob = require('cron').CronJob
var kue = require('kue'),queue = kue.createQueue()
var nodemailer = require("nodemailer");
require('dotenv').config()
let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
        user: process.env.HELLO,
        pass: process.env.WORLD
    }
});


new CronJob('00 17 11 6 5 *', function() {
    var job = queue.create('email',{
      from:`Fuck <anjing@gmail.com>`,
      to: `stedyyulius@gmail.com`,
      subject: `Welcome Jing!`,
      text: 'WELCOME JING!!',
      html: `Welcome to Storyoverflow please go here to get started\nwww.storyoverflow-grayfox.heroku-app.com`
    }).save(function(err){
      if(!err)
      console.log((job.data));
    })
    
    queue.process('email', function(job, done){
      transporter.sendMail(job.data, (error, info) => {
          if (error) {
              return console.log(error);
          }
          else{
            console.log('success!')
          }        
      });
      done()
    });    
}, null,
  true, /* Start the job right now */
  'Asia/Jakarta' /* Time zone of this job. */
);











