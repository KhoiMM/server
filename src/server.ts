import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';

const app: express.Application = express();
// const address: string = "bucket-khoimm.s3-website-us-east-1.amazonaws.com";
let port = 8080;

// const corsOption = {
//     origin: `http://${address}`,
//     optionsSuccessStatus: 200
// };

app.use(bodyParser.json());

app.use(cors({
    "allowedHeaders": [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization', 'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods'
    ],
    "methods": 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    "preflightContinue": true,
    "origin": '*',
  }));

// app.use(cors(corsOption));

app.use('/api', routes);

app.get("/", async (req, res) => {
    res.send('Deployed successfully');
});

app.listen(port, function () {
    console.log(`Backend server is listening on port ${port}....`);
});

export default app;
