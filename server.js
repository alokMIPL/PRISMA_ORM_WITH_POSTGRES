import "dotenv/config";
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes File Import
import router from './routes/index.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));