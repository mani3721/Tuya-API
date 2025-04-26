import express from 'express';
import cors from 'cors';
import deviceRoute from './Routes/DeviceRoute.js'


const app = express();
app.use(cors());
app.use(express.json());

app.use("/device", deviceRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});