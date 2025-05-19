import express from "express";
import ffmpeg from "fluent-ffmpeg";


const app = express();
const port = 3000;

app.post("/process-video", (req, res) => {
    //Get path of the input video fule from request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send("Input and output file paths are required");
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") // conver 360p
        .on("end", () => {

        })
        .on("error" , (err) => {
            console.log(`An error occurred: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        });
        .save(outputFilePath);

app.listen(port,() =>{
    console.log(
        `Video Processing service listening at http://localhost:${port}`);
});
