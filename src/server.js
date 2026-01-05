import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import serviceRoutes from './routes/service.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
