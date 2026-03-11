const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Weather API proxy is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
