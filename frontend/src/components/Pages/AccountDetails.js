import React from "react";
import "./Pages.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../utils/load-contract";

const AccountDetails = () => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  const [account1, setAccount1] = useState(null);
  const [account2, setAccount2] = useState(null);
  const [account3, setAccount3] = useState(null);
  const [account4, setAccount4] = useState(null);
  const [reload] = useState(false);
//   const [balance, setBalance] = useState(null);

  const [balance1, setBalance1] = useState(null);
  const [balance2, setBalance2] = useState(null);
  const [balance3, setBalance3] = useState(null);
  const [balance4, setBalance4] = useState(null);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Funder", provider);
      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_accounts" });

        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        alert("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
    //   const { web3 } = web3Api;
      window.ethereum.on("accountsChanged", async function (accounts) {
        // const balance = await web3.eth.getBalance(accounts[0]);
        // setBalance(web3.utils.fromWei(balance, "ether"));
      });
    };
    web3Api.contract && loadBalance();
  }, [web3Api, reload]);

  useEffect(() => {
	const getAccount = async () => {
	  const accounts = await web3Api.web3.eth.getAccounts();
	  let address1 = [
        { account1: "0xebc4950af93AfA374b0B2e1348942e2f3c4Cb3D5" },
        { account2: "0xA4176524B8791329690f7e1E63465A6EE1741e51" },
        { account3: "0x98cA03F92A6f465f71094780cc83769f78F69d6c" },
        { account4: "0x549D11D2dDB69EeB9ac961f35B7627b4fCD80DD5" },
      ];
      const balance1 = await web3Api.web3.eth.getBalance(address1[0].account1);
      setBalance1(web3Api.web3.utils.fromWei(balance1, "ether"));
	  const balance2 = await web3Api.web3.eth.getBalance(address1[1].account2);
      setBalance2(web3Api.web3.utils.fromWei(balance2, "ether"));
	  const balance3 = await web3Api.web3.eth.getBalance(address1[2].account3);
      setBalance3(web3Api.web3.utils.fromWei(balance3, "ether"));
	  const balance4 = await web3Api.web3.eth.getBalance(address1[3].account4);
      setBalance4(web3Api.web3.utils.fromWei(balance4, "ether"));

	//   const balance = await web3Api.web3.eth.getBalance(accounts[0]);
	//   setBalance(web3Api.web3.utils.fromWei(balance, "ether"));
	  setAccount(accounts[0]);
	  setAccount1(address1[0].account1);
	  setAccount2(address1[1].account2);
	  setAccount3(address1[2].account3);
	  setAccount4(address1[3].account4);
	};
	web3Api.web3 && getAccount();
  }, [web3Api.web3, reload]);
  return (
    <div className="container mt-10 row">
      <div className="col col-md-6">
        <h4 className="card-title">Account 1</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No. {account1 ? account1 : "Pls connect your wallet!"}</p>
            <p>Balance {balance1} ETH</p>
            <p>Auto-Sweep</p>
          </div>
        </div>
        <h4 className="card-title">Account 3</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No: {account3}</p>
            <p>Balance {balance3} ETH</p>
            <p>Auto-Sweep</p>
          </div>
        </div>
      </div>
      <div className="col col-md-6">
        <h4 className="card-title">Account 2</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No: {account2}</p>
            <p>Balance {balance2} ETH</p>
            <p>Auto-Sweep</p>
          </div>
        </div>
        <h4 className="card-title">Account 4</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No: {account4}</p>
            <p>Balance {balance4} ETH</p>
            <p>Auto-Sweep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
