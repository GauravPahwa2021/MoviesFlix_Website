import Movie from '../models/Movie';


export const addMovie = async (req, res, next) => {

    let extractedToken = req.headers.authorization.split(" ")[1];  // Bearer Token
    if (!extractedToken || extractedToken.trim() === "") {
        return req.status(404).json({ message: "Token not found" });
    }
    console.log(extractedToken);

};