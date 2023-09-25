import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';

const app: express.Application = express();
// const address: string = "localhost:4200";
let port = 8080;

// const corsOption = {
//     origin: `http://${address}`,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOption));
app.use(bodyParser.json());

app.use('/api', routes);

app.get("/", async (req, res) => {
    res.send('Deployed successfully');
});

app.listen(port, function () {
    console.log(`Backend server is listening on port ${port}....`);
});

export default app;
