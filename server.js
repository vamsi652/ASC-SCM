const express = require('express');
const app = express();
const PORT = 3000; 

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
const tasksRouter = require('./routes/tasks');

app.use(express.json());
app.use('/api', tasksRouter);

