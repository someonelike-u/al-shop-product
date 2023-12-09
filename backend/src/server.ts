import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product-route';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.info('Start server');
});

// Postman tests: https://app.getpostman.com/join-team?invite_code=efa4dcbdd345a4281cdca53bae34e101
