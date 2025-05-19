import express from "express";
import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";


const app = express();
app.use(express.json());   

app.post("/process-video", (req: Request, res: Response) => {
    //Get path of the input video fule from request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    //check of the input file path and output file path are provided
    //if not provided, return a 400 Bad Request response
    //if provided, process the video
    //and return a 200 OK response
    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send("Input and output file paths are required");
    }

    //create a new ffmpeg command 
    ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=-1:360') // 360p
    .on('end', function() {
        console.log('Processing finished successfully');
        res.status(200).send('Processing finished successfully');
    })
    .on('error', function(err: any) {
        console.log('An error occurred: ' + err.message);
        res.status(500).send('An error occurred: ' + err.message);
    })
    .save(outputFilePath);
});


const port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(
        `Video Processing service listening at http://localhost:${port}`);
});
