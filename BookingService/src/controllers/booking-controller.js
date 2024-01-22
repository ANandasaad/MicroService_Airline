const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();
const {createChannel,publishMessage}=require("../utils/messageQueue")
class BookingController {
   constructor(){
   
   }

   async sendMessageToQueue(req,res){

    try {
      const channel= await createChannel()
      const payload={
        data:{
          subject:'This is a notification from queue',
          content:'Some queue will subscribe this',
          recipientEmail:'anandkushwaha70@gmail.com',
          notificationTime:'2024-01-09T07:04:56'
        },
        service:"CREATE_TICKET"
      }
      publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload))
      return res.json({
       message:"Successfully published the event"
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
        data: {},
        err: error,
      });
    }
  
   }
  async  create(req, res, next) {
      try {
        
        const response = await bookingService.createBooking(req.body);
    
        res.json({
          success: true,
          message: "Booking created successfully",
          data: response,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error.message,
          data: {},
          err: error,
        });
      }
    };
    

}

// const create = async (req, res, next) => {
//   try {
//     const response = await bookingService.createBooking(req.body);

//     res.json({
//       success: true,
//       message: "Booking created successfully",
//       data: response,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       data: {},
//       err: error,
//     });
//   }
// };

module.exports =BookingController
