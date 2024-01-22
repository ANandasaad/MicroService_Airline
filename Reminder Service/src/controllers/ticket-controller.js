const TicketService = require("../services/email-service");
const create = async (req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    res.json({
      success: true,
      message: "Successfully created notification for email ",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error,
    });
  }
};

module.exports = {
  create,
};
