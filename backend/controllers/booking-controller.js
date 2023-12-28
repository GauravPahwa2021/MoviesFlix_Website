import mongoose from 'mongoose';
import Booking from '../models/Bookings';
import Movie from '../models/Movie';
import User from '../models/User';

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }
    catch (err) {
        return console.log(err);
    }
    if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found with given ID" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    let booking;
    try {
        booking = new Booking({ movie, date: new Date(`${date}`), seatNumber, user });

        const session = await mongoose.startSession();
        session.startTransaction();
        existingMovie.bookings.push(booking);
        existingUser.bookings.push(booking);
        await existingMovie.save({ session });
        await existingUser.save({ session });
        await booking.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to create booking" });
    }
    return res.status(201).json({ booking });
};

export const getBookingByID = async (req, res, next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Booking.findByID(id);
    }
    catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Booking.findByIdAndDelete(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({ session });
        await booking.movie.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to delete booking" });
    }
    return res.status(200).json({ message: "Booking successfully deleted" });
};