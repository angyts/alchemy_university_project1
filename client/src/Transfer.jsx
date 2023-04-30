import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [r, setR] = useState("");
  const [s, setS] = useState("");
  const [message, setMessage] = useState("0x");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        r,
        s,
        message
      });
      setBalance(balance);
      alert("Your signature is valid and the funds has been transferred!");
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
          required
          type="number" 
          step="1"
          min="1"
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
          required
        ></input>
      </label>

      <label><h2>I presumed you have obtained your signature offline</h2></label>

      <label>
        Signature "r"
        <input
          placeholder="The first part of the signature"
          value={r}
          onChange={setValue(setR)}
          required
        ></input>
      </label>

      <label>
        Signature "s"
        <input
          placeholder="The second part of the signature"
          value={s}
          onChange={setValue(setS)}
          required
        ></input>
      </label>

      <label>
        The message in the signature
        <input
          placeholder="0x"
          value={message}
          onChange={setValue(setMessage)}
        ></input>
      </label>      

      <input type="submit" className="button" value="I confirm the transfer" />
    </form>
  );
}

export default Transfer;
