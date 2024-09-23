const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 },
    { id: 5, name: 'Product 5', price: 50 },
    { id: 6, name: 'Product 6', price: 60 },
    { id: 7, name: 'Product 7', price: 70 },
    { id: 8, name: 'Product 8', price: 80 },
    { id: 9, name: 'Product 9', price: 90 },
    { id: 10, name: 'Product 10', price: 100 },
    { id: 11, name: 'Product 11', price: 110 },
    { id: 12, name: 'Product 12', price: 120 },
    // Add more products if needed...
];

app.get("/products", (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10;

  const totalPage = Math.ceil(products.length / limit);


  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;


  const display = products.slice(startIndex, endIndex);

  const response = {
    totalPage,
    data: display,
    page,
    limit
  }
  res.json(response)
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});