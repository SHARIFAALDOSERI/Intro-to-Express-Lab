const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => 
{
  res.send('Welcome to the Express server! Try /greetings/YourName'); 
});


app.get('/greetings/:username', (req, res) => 
{
  const { username } = req.params;
  res.send(`Hello there, ${username}!`);
});


app.get('/roll/:number', (req, res) => 
{
  const { number } = req.params;
  const parsed = parseInt(number);

  if (isNaN(parsed)) 
  {
    res.send('You must specify a number.');
  } else 
  {
    const roll = Math.floor(Math.random() * (parsed + 1));
    res.send(`You rolled a ${roll}.`);
  }
});


const collectibles = 
[
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => 
{
  const { index } = req.params;
  const item = collectibles[index];

  if (item)
  {
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  } else 
  {
    res.send("This item is not yet in stock. Check back soon!");
  }
});

const shoes = 
[
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => 
{
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

  let filtered = shoes;

  if (minPrice) 
  {
    filtered = filtered.filter(shoe => shoe.price >= parseFloat(minPrice));
  }

  if (maxPrice) 
  {
    filtered = filtered.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }

  if (type) 
  {
    filtered = filtered.filter(shoe => shoe.type === type);
  }

  res.json(filtered);
});


app.use((req, res) => 
{
  res.status(404).send('Sorry, route not found!');
});

app.listen(PORT, () => 
{
  console.log(`Server running on http://localhost:${PORT}`);
});
