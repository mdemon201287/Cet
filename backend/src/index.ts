import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import agencyRoutes from './routes/agencies';
import categoryRoutes from './routes/categories';

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/BestDevShop';

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define your routes
app.use('/api/agencies', agencyRoutes);
app.use('/api/categories', categoryRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
