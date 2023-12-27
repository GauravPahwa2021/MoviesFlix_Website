import express from 'express';
import { getBookingByID, newBooking, deleteBooking } from '../controllers/booking-controller';

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking);
bookingRouter.get("/:id", getBookingByID);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;