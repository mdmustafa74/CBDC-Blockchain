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
  const [balance, setBalance] = useState(null);
  const [reload] = useState(false);
  //   const [getAllAccount, setAllAccount] = useState([]);
  //   let getAllAccount = [];

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
      const { web3 } = web3Api;
      window.ethereum.on("accountsChanged", async function (accounts) {
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance, "ether"));
      });
    };
    web3Api.contract && loadBalance();
  }, [web3Api, reload]);

  useEffect(() => {
	const getAccount = async () => {
	  const accounts = await web3Api.web3.eth.getAccounts();
	  const balance = await web3Api.web3.eth.getBalance(accounts[0]);
	  setBalance(web3Api.web3.utils.fromWei(balance, "ether"));
	  setAccount(accounts[0]);
	};
	web3Api.web3 && getAccount();
  }, [web3Api.web3, reload]);
  return (
    <div className="container mt-3 row">
      <div className="col col-md-6">
        <h4 className="card-title">Account 1</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No. {account ? account : "Pls connect your wallet!"}</p>
            <p>Balance {balance} ETH</p>
            <p>Auto-Sweep</p>
          </div>
        </div>
        <h4 className="card-title">Account 3</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No.</p>
            <p>Balance </p>
            <p>Auto-Sweep</p>
          </div>
        </div>
      </div>
      <div className="col col-md-6">
        <h4 className="card-title">Account 2</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No.</p>
            <p>Balance </p>
            <p>Auto-Sweep</p>
          </div>
        </div>
        <h4 className="card-title">Account 4</h4>
        <div className="card">
          <div className="card-body">
            <p>Account No.</p>
            <p>Balance </p>
            <p>Auto-Sweep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
