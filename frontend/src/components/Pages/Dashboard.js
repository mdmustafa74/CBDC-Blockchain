import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../utils/load-contract";

const Dashboard = (props) => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [reload, shouldReload] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const reloadEffect = () => shouldReload(!reload);
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Funder", provider);
      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
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

  const handleChange = async (e) => {
    setSendAmount(e.target.value);
  };

  const handleAddress = (el) => {
    setReceiverAddress(el.target.value);
  };

  const transferFund = async () => {
    const { web3, contract } = web3Api;
    console.log(receiverAddress);
    await contract.transfer({
      from: account,
      value: web3.utils.toWei(sendAmount, "ether"),
    });
    reloadEffect();
  };

  const withdrawFund = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmout = web3.utils.toWei(sendAmount, "ether");
    await contract.withdraw(withdrawAmout, {
      from: account,
    });
    reloadEffect();
  };

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
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">{props.title}</div>
          <div className="card-body body-style">
            <form>
              <div className="mb-3">
                <label htmlFor="receiverAddress" className="form-label">
                  Receiver address
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleAddress}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sendAmount" className="form-label">
                  Enter Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-success "
                onClick={transferFund}
              >
                Transfer
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-primary "
                onClick={withdrawFund}
              >
                Withdraw
              </button>
            </form>
            <h5 className="card-title">Balance: {balance} ETH </h5>
            <p className="card-text">
              Account :{" "}
              {account
                ? account
                : " Wallet not connected, Pls connect your wallet!"}
            </p>
          </div>
          <div className="card-footer text-muted text-center footer-style">
            Blockchain
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
