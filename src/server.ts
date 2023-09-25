import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';

const app: express.Application = express();
const address: string = "localhost:4200";
let port = 3000;

const corsOption = {
    origin: `http://${address}`,
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(bodyParser.json());

app.use('/api', cors(corsOption), routes);

app.use('/', (req, res) => {
    res.send('Deploy successfully');
});

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
