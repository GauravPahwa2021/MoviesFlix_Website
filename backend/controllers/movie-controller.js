import Movie from '../models/Movie';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';

export const addMovie = async (req, res, next) => {

    let extractedToken = req.headers.authorization.split(" ")[1];  // Bearer Token
    if (!extractedToken || extractedToken.trim() === "") {
        return req.status(404).json({ message: "Token not found" });
    }

    let adminID;

    // verify that token first
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        }
        else {
            adminID = decrypted.id;
            return;
        }
    });

    // create new movie
    const { title, discription, releaseDate, posterUrl, featured, actors } = req.body;
    if (!title || title.trim() === "" ||
        !discription || discription.trim() === "" ||
        !posterUrl || posterUrl.trim() === "") {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    let movie;
    try {
        movie = new Movie({ title, discription, releaseDate: new Date(`${releaseDate}`), posterUrl, actors, featured, admin: adminID });

        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminID);
        session.startTransaction();
        await movie.save({ session });
        adminUser.addedMovies.push(movie);
        await adminUser.save({ session });
        await session.commitTransaction();

    }
    catch (err) {
        return console.log(err);
    }

    if (!movie) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(201).json({ movie });

};

export const getMovie = async (req, res, next) => {

    let movies;
    try {
        movies = await Movie.find();
    }
    catch (err) {
        return console.log(err);
    }

    if (!movies) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ movies });
};

export const getMovieByID = async (req, res, next) => {

    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);
    }
    catch (err) {
        return console.log(err);
    }

    if (!movie) {
        return res.status(404).json({ message: "Invalid Movie ID" });
    }
    return res.status(200).json({ movie });
};