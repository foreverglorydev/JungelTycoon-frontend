import React, { useEffect, useState } from "react";
import './App.css';

import { NFTStorage, File } from "nft.storage";
import { useWeb3React } from "@web3-react/core";
// import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import myEpicNft from './utils/MyEpicNFT.json';
import JungelTycoon from './utils/JungelTycoon.json';
import Gallery from './utils/Gallery.json';

// const TWITTER_HANDLE = '_buildspace';
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// const OPENSEA_LINK = '';
// const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [btnBusy, setBtnBusy] = useState(false);


  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

    } else {
      console.log("No authorized account found")
    }
  }

  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  // async function IPFSupload(data, file) {    
  const IPFSupload = async (data, file) => {
    try {
      // setIPFSerror(null);
      // setIPFSuploading(true);
      // console.log(process.env.REACT_APP_NFT_STORAGE_KEY);
      // console.log('process.env.REACT_APP_NFT_STORAGE_KEY');
      const client = new NFTStorage({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4YzllNDRCRDQ5MDdBQTI4NGQ4NWRhRkJBNkMyNjI1Y2Y5ZTRhMjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTYwMDc5MzQxMiwibmFtZSI6ImlwZnNfa2V5In0.fgRU-eos35TM8MrCyv-wRlcxTPQEucobj2IzvzYHQ5s'
      });
      const metadata = await client.store({
        name: data.name,
        description: data.description,
        image: new File([file], file.name, { type: file.type })
      });
      console.log(metadata);
      return metadata.url;
    } catch (error) {
      console.error(error);
      // setIPFSerror(error);
    } finally {
      // setIPFSuploading(false);
      console.log('finish');
    }
  }

  const askContractToMintNft = async () => {

    
    ////
                                          // const { ethereum } = window;

                                          // const CONTRACT_ADDRESS = "0xBCa44d867C707080c504F286C35b237D2802b7E5";
                                          // if (ethereum) {
                                          //   const provider = new ethers.providers.Web3Provider(ethereum);
                                          //   const signer = provider.getSigner();
                                          //   console.log("=============================================");
                                          //   console.log(signer);
                                          //   const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
                                            
                                          

                                          //   let chainId = await ethereum.request({ method: 'eth_chainId' });
                                          //   console.log("Connected to chain " + chainId);

                                          //   // String, hex code of the chainId of the Rinkebey test network
                                          //   const rinkebyChainId = "0x4"; 
                                          //   if (chainId !== rinkebyChainId) {
                                          //     alert("You are not connected to the Rinkeby Test Network!");
                                          //   }
                                          //   ////

                                          //   try {
                                          //     setBtnBusy(true);
                                          //     const metadataUrl = await IPFSupload(
                                          //       {
                                          //         name: name,
                                          //         description: description
                                          //       },
                                          //       selectedFile
                                          //     );
                                          //       console.log('---------------------------------------------');
                                          //       console.log(metadataUrl);
                                          //       console.log(currentAccount);

                                          //     // await mintNFT(metadataUrl, "0xF6E47985bEB90bC1D24E9d1a1daAF2b316c3726E", account);
                                          //     // toast.success("Mint Successfull !");

                                          //           let nftTxn = await connectedContract.mint(1);

                                          //           console.log("Mining...please wait.")
                                          //           await nftTxn.wait();
                                                    
                                          //           console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

                                          //     // reset inputs
                                          //     setName("");
                                          //     setDescription("");
                                          //     setSelectedFile(null);
                                          //   } catch (error) {
                                          //     console.error(error);
                                          //     // toast.error(error.message);
                                          //     // toast.error("NFT Minting Failed");
                                          //   } finally {
                                          //     setBtnBusy(false);
                                          //   }
                                          // }
  const { ethereum } = window;
  const JungelTycoon_CONTRACT_ADDRESS = "0x66E93dfE656B905941420f1E3eFc7150fE8e1f6b";

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const connectedContract = new ethers.Contract(JungelTycoon_CONTRACT_ADDRESS, JungelTycoon.abi, signer);
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    const rinkebyChainId = "0x4"; 
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }
    console.log("connectedContract");
    console.log(signer);
    let nftTxn = await connectedContract.mint(100);
    console.log("Mining...please wait.")
    await nftTxn.wait();
    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
  }
}


const askContractToStake = async () => {
  console.log("Stake button pressed");
  const Gallery_CONTRACT_ADDRESS = "0x4440bFea8Aac55EcFdDe69e9B4d830d0Da4a973D";
  // const Gallery_CONTRACT_ADDRESS = "0x4AB38c6667B24D5fE11FE0D71F3BeEb34db80859";
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();


    const connectedContract = new ethers.Contract(Gallery_CONTRACT_ADDRESS, Gallery.abi, signer);
    
  

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4"; 
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
      return;
    }
    ////

    try {
      setBtnBusy(true);
      let tokenIds = [1, 2, 3, 4, 5];
      
            const accounts = await signer.getAddress();  
            // const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(tokenIds);
            console.log(accounts);
            let nftTxn = await connectedContract.addToGallery(accounts, tokenIds);

            console.log("Staking...please wait.");
            await nftTxn.wait();

            console.log(`staked, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
            
      // reset inputs
      setName("");
      setDescription("");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setBtnBusy(false);
    }
  }

}

const askContractToReward = async () => {
  
}

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already conencted :).
  */
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <>
            <br/><br/><br/><br/>
            {/* <font className="cta-text">Name :</font>
              <input
                name="name"
                className="cta-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <font className="cta-text">Description (optional) :</font>
              <input
                className="cta-input"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              /><br/><br/><br/>
            <input
              className="cta-button"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            /> */}
            <br/>
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
            </>
          )}
        </div>

        <div className="body-container">
          <button onClick={askContractToStake} className="cta-button connect-wallet-button">
            Stake
          </button>
        </div>


        <div className="body-container">
          <button onClick={askContractToReward} className="cta-button connect-wallet-button">
            Reward
          </button>
        </div>
        <div className="footer-container">
          {/* <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} /> */}
          {/* <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a> */}
        </div>
      </div>
    </div>
  );
};

export default App;