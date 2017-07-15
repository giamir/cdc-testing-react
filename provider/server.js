import express from 'express';

const app = express();

const dataStore = [
  {
    id: 1,
    name: 'product 1'
  },
  {
    id: 2,
    name: 'product 2'
  }
];

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

// API
app.get('/products', (req, res) => {
  res.json(dataStore);
});

export default app;
