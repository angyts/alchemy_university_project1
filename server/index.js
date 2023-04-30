const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
var helpers = require("./scripts/helpers") 

app.use(cors());
app.use(express.json());

const balances = {
  "03cc87352ea592eecf86b58c712a00c54eb7fe4afaac3897b26f6f15e9d2a18451": 100,
  "02b29c2bd4126a809c0d642fbb2785cc1df225a70f94f5a1d126e1723f76d7e7f9": 50,
  "02e3e3ffb9f95dfc0847c1eacde9d09d1cd2da01ef3e17bfcb4997bc13ee78def8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
