import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URL, MONGODB_PASSWORD } = process.env;
const mongoKey = encodeURIComponent(MONGODB_PASSWORD);


const mongoDbUrl = MONGODB_URL || `mongodb+srv://adriencr:${mongoKey}@cluster0.cvewvo0.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'pollution',
});

const db = mongoose.connection;

db.on('error', function() {
  console.error('MongoDB connection error for dbUrl=' + mongoDbUrl);
});

db.once('open', function() {
  console.log('Connected correctly to MongoDB database');
});

export default { db };

