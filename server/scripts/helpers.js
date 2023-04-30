const secp = require("ethereum-cryptography/secp256k1"); // for crypto
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils"); // get hexa from string
const { keccak256 } = require("ethereum-cryptography/keccak"); // for hash

function verifySignature(r,s, messageHash, publicKey) {
    let signature = new secp.secp256k1.Signature(r, s);
    return secp.secp256k1.verify(signature, messageHash, publicKey);
}

function hashMessage(message){
    return keccak256(utf8ToBytes(message));
}

const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));

var message = "0x";
var messageHash = hashMessage(message);

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);

// Lets sign a message

const signature = secp.secp256k1.sign(messageHash, privateKey);
console.log("Signature:", signature);

//what is the datatype?
console.log("r is a:", typeof signature.r);

// console.log("Signature compact:", signature.toCompactHex());

// Lets check if it really was signed 

const isValid = verifySignature(signature.r, signature.s, messageHash, publicKey);
console.log("Signature is valid", isValid);

// Lets verify this new signature too
console.log("New Signature is valid:", verifySignature(97057625583338849092025000485687431676374160955800005300071587767035996497962n, 3114868452147820883301826813245039803837111009248762343699541193970835181103n, messageHash, '03068d0835777738cde881a4e0e2533f4a300fa97c348a32bb4b2aabb2ef038759'));

// Export for use
module.exports = {
    verifySignature,
    hashMessage,
 }

// Totally for testing purposes only

/*
Account A
Private Key: 47e9c4999fc5878f64d3e69af334fb0a85d27ce153e477416dbc6a7aaf59cdec
Public Key: 03cc87352ea592eecf86b58c712a00c54eb7fe4afaac3897b26f6f15e9d2a18451
Valid signature: 

Account B
Private Key: ffaaf835dcef17deeef2c8a212163dd94ee07343cc7280459ead1043db254abb
Public Key: 02b29c2bd4126a809c0d642fbb2785cc1df225a70f94f5a1d126e1723f76d7e7f9
Valid signature: 

Account C
Private Key: 4117b55083c252a8a48dbf97318b9b2faaa4acae7994e7cf5b90d54c7e626f00
Public Key: 02e3e3ffb9f95dfc0847c1eacde9d09d1cd2da01ef3e17bfcb4997bc13ee78def8
Valid signature: 

Private Key: 9e93a9be48095ff4a17bcb8fe25277364707ea3b9f90fceed0ade4786cbfda34
Public Key: 03068d0835777738cde881a4e0e2533f4a300fa97c348a32bb4b2aabb2ef038759
Signature: Signature {
  r: 97057625583338849092025000485687431676374160955800005300071587767035996497962n,
  s: 3114868452147820883301826813245039803837111009248762343699541193970835181103n,
  recovery: 0
}

*/