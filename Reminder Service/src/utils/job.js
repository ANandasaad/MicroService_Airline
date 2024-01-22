const cron = require("node-cron");
const { fetchPendingEmail } = require("../services/email-service");
const sender = require("../config/emailConfig");
const emailService = require("../services/email-service");
const setupJobs = async () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("running a task every 24 hours");
    const response = await fetchPendingEmail();
    response.forEach((email) => {
      sender.sendMail(
        {
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
