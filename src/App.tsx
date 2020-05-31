import React, { useState, useEffect } from 'react';
import './assets/css/main.css';
import { Ed25519PrivateKey, Ed25519PublicKey } from "@hashgraph/sdk";
import { signMessage, str2byte, byte2hex, verifyMessage, hex2byte } from "./lib/utils";

function App() {
  
  // Signing state
  const [privKey, setPrivKey] = useState("");
  const [message, setMessage] = useState("");
  
  const [signResult, setSignResult] = useState({
    message: String,
    positive: Boolean,
  });

  // Verification state
  const [vPubKey, setVPubKey] = useState("");
  const [vMessage, setVMessage] = useState("");
  const [vSig, setVSig] = useState("");

  const [verifyResult, setVerifyResult] = useState({
    message: String,
    positive: Boolean,
  });

  return (
    <div className="App">
      <div className="grid mx-auto grid-cols-1 md:grid-cols-2 max-w-5xl">
        <div className="bg-white space-y-8 p-6 mt-2 md:my-6">
          <h3 className="text-xl pb-2 text-gray-900 font-semibold border-blue-600 border-b-2">Sign message</h3>
          <div className="space-y-2">
            <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} className="p-2 w-full focus:outline-none border border-gray-300 focus:border-blue-600"></textarea>
            <input type="password"  placeholder="Private key" value={privKey} onChange={e => setPrivKey(e.target.value)} className="p-2 w-full focus:outline-none border border-gray-300 focus:border-blue-600" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-row justify-between items-center">
              <h2 className="font-bold text-lg text-gray-900 focus:outline-none">Signature</h2>
              <button className="font-bold text-xs text-gray-500 focus:outline-none">COPY</button>
            </div>
            <div className={`p-4 ${signResult.positive ? "bg-green-600" : "bg-red-600"} text-white text-sm rounded shadow-inner`}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sunt aspernatur vero aliquid laudantium quisquam. Expedita, voluptatibus asperiores facere, eos dolorum tempora voluptates nesciunt quia totam sed, ea magnam eveniet?
              </p> 
            </div>
          </div>

          <button 
            onClick={() => {
              try {
                let parsedPrivKey = Ed25519PrivateKey.fromString(privKey);
                let sig = signMessage(parsedPrivKey, str2byte(message));
                console.log(message);
                console.log(str2byte(message));
                console.log(byte2hex(sig));
              } catch (e) {
                console.error(e);
              }
            }} 
            className="w-full rounded shadow-lg bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 cursor-pointer focus:outline-none">
            Sign message
          </button>
        </div>
        <div className="bg-white space-y-8 p-6 mt-2 md:my-6">
          <h3 className="text-xl pb-2 text-gray-900 font-semibold border-teal-600 border-b-2">Verify message</h3>
          <div className="space-y-2">
            <input type="text" value={vPubKey} onChange={e => setVPubKey(e.target.value)} placeholder="Public key..." className="p-2 w-full focus:outline-none border border-gray-300 focus:border-teal-600" />
            <textarea placeholder="Message..." value={vMessage} onChange={e => setVMessage(e.target.value)} className="p-2 w-full focus:outline-none border border-gray-300 focus:border-teal-600"></textarea>
            <textarea placeholder="Signature..." value={vSig} onChange={e => setVSig(e.target.value)}className="p-2 w-full focus:outline-none border border-gray-300 focus:border-teal-600"></textarea>
          </div>
          <button 
            onClick={() => {
              try {
                let parsedPubKey = Ed25519PublicKey.fromString(vPubKey);
                console.log(verifyMessage(str2byte(vMessage), hex2byte(vSig), parsedPubKey));
              } catch (e) {
                console.error(e);
              }
            }} 
            className="w-full rounded shadow-lg bg-teal-600 hover:bg-teal-500 text-white font-medium p-3 cursor-pointer focus:outline-none">
            Verify message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
