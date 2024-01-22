const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const BookingRepository = require("../repository/booking-repository");
const axios = require("axios");
const { ServiceError } = require("../utils/errors");
class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

      const flight = await axios.get(getFlightRequestURL);
      const flightData = flight.data.data;
      const priceOfFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient number of seats available"
        );
      }
      const totalCost = priceOfFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const updatedBooking = await this.updateBooking(booking.id, {
        status: "Booked",
      });

      

      return updatedBooking;
    } catch (error) {
      if (error.name === "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async updateBooking(bookingId, data) {
    try {
      const update = await this.bookingRepository.update(bookingId, data);
      return update;
    } catch (error) {
      if (error.name === "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}
module.exports = BookingService;
