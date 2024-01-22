const sender = require("../config/emailConfig");

const TicketRepository = require("../repository/ticket-repository");
const repo = new TicketRepository();
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = await sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    console.log(response.response);
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (ticketId, status) => {
  try {
    const response = await repo.update(ticketId, status);
    return response;
  } catch (error) {
    throw { error };
  }
};

const fetchPendingEmail = async (timestamp) => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
    throw { error };
  }
};

const createNotification = async (data) => {
  console.log(data);
  try {
    const response = await repo.create({
      subject: data.subject,
      content: data.content,
      recepientEmail: data.recipientEmail,
      notificationTime: data.notificationTime,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw { error };
  }
};

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;

  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;

    case "SEND_BASIC_MAIL":
      await sendBasicEmail(data);
      break;
    default:
      console.log("No valid event received");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmail,
  createNotification,
  updateTicket,
  subscribeEvents,
};
