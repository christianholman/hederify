import { Ed25519PublicKey, Ed25519PrivateKey } from "@hashgraph/sdk";
import * as nacl from "tweetnacl";

const signMessage = (privKey: Ed25519PrivateKey, msg: Uint8Array) => {
  return nacl.sign.detached(msg, privKey._keyData);
};

const verifyMessage = (msg: Uint8Array, sig: Uint8Array, pubKey: Ed25519PublicKey) => {
  return nacl.sign.detached.verify(msg, sig, pubKey.toBytes());
}

const byte2hex = (bytes: Uint8Array): String => {
  return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2,"0"), "");
}

const hex2byte = (hexString: String): Uint8Array => {
  let result = [];
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return new Uint8Array(result);
}

// https://stackoverflow.com/a/18729931
const str2byte = (str: String): Uint8Array => {
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 
                0x80 | (charcode & 0x3f));
    }
    else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12), 
                0x80 | ((charcode>>6) & 0x3f), 
                0x80 | (charcode & 0x3f));
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                            | (str.charCodeAt(i) & 0x3ff));
                            utf8.push(0xf0 | (charcode >>18), 
                                      0x80 | ((charcode>>12) & 0x3f), 
                                      0x80 | ((charcode>>6) & 0x3f), 
                                      0x80 | (charcode & 0x3f));
    }
  }
  return new Uint8Array(utf8);
}

export {
  signMessage,
  verifyMessage,
  byte2hex,
  hex2byte,
  str2byte,
}
