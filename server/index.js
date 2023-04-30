const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
var helpers = require("./scripts/helpers") 

app.use(cors());
app.use(express.json());

const balances = {
  "03068d0835777738cde881a4e0e2533f4a300fa97c348a32bb4b2aabb2ef038759": 100,
  "02b29c2bd4126a809c0d642fbb2785cc1df225a70f94f5a1d126e1723f76d7e7f9": 50,
  "02e3e3ffb9f95dfc0847c1eacde9d09d1cd2da01ef3e17bfcb4997bc13ee78def8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

/* The old function
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
*/

app.post("/send", (req, res) => {
  const { r, s, message, sender, recipient, amount } = req.body;
  //console.log(r, s, message, sender, recipient, amount );
  console.log(typeof r);
  let messageHash = helpers.hashMessage(message);
  let isValid = false;
  try {
    isValid = helpers.verifySignature( BigInt(r.slice(0, -1)), BigInt(s.slice(0, -1)), messageHash, sender);
     }
     catch {
     }
  if (isValid) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  res.status(400).send({ message: "Signature invalid!" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
