const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const start = new Date();
  
  await delay(10000);  // Wait for 10 seconds
  
  const end = new Date();
  console.log((end - start)/1000);  // Prints the difference in milliseconds (should be around 10000)
}

let requestCount = 0;
let firstTime;


const timeoutLimit = 1000;

const ratelimit = 5;



app.get("test", (req, res) => {
  const { userid } = req.body;
  const currentTme = new Date();


  if (!firstTime) {
    firstTime = currentTme;
  }

  if (currentTme - firstTime < timeoutLimit) {
    requestCount++;

   if (requestCount > ratelimit) {
      // If the limit is exceeded, send a rate limit error
      return res.status(429).json({ error: "Rate limit hit" });
    }
  } else {
     firstTime = currentTme;
    requestCount = 1; // Count this request
  }
  res.json({ message: "Request successful" });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

