import express from 'express';
import { addMovie, getMovie, getMovieByID } from '../controllers/movie-controller';

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/", getMovie);
movieRouter.get("/:id", getMovieByID);

export default movieRouter; 