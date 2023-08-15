import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Blocks from './components/Blocks';
import Transactions from './components/Transactions';
import SearchBar from './components/SearchBar';
import BlockView from './components/BlockView';
import TransactionView from './components/TransactionView';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blocks, setBlocks] = useState([]);
  const [blockCount, setBlockCount] = useState(0);
  const [search, setSearch] = useState('');
  const [searchedBlock, setSearchedBlock] = useState('');
  const [searchedTxn, setSearchedTxn] = useState('');

  const navigate = useNavigate();

  const aggregateTransactions = () => {
    let transactions = [];
    if (blocks) {
      blocks.forEach((b) => {
        transactions = transactions.concat(b.transactions);
      });
  
      return transactions;
    }
  }

  useEffect(() => {
    async function getBlocks() {
      if (blockCount > 20) {
        return;
      }
      
      let blockNumber = blocks.length > 0 
        ? blocks[blocks.length-1].number -1
        : await alchemy.core.getBlockNumber();
      let latestBlock = await alchemy.core.getBlockWithTransactions(blockNumber);
      setBlocks([...blocks, latestBlock]);
      setBlockCount(blockCount + 1);
    }

    getBlocks();
  }, [blocks]);

  useEffect(() => {
    async function getBlockOrTransaction() {
      try {        
        if (search.startsWith('0x')) {
          let txn = await alchemy.transact.getTransaction(search);
          if (txn) {
            setSearchedTxn(txn);
            setSearchedBlock('');
          } else {
            let block = await alchemy.core.getBlock(search);
            console.log(block)
            if (block) {
              setSearchedBlock(block);
              setSearchedTxn('');
            }
          }
        } else {
          let parsedSearch = parseInt(search);

          if (parsedSearch) {
            let block = await alchemy.core.getBlock(parsedSearch);
            if (block) {
              setSearchedBlock(block);
              setSearchedTxn('');
            } else {
              alert('No block was found with hash:', parsedSearch)
            }
          }
        }
      } catch {
        alert('No transaction or block found with hash:', search)
      }
    }

    getBlockOrTransaction();
  }, [search]);

  useEffect(() => {
    if (searchedTxn) {
      navigate(`/transactions/${search}`);
    }
  }, [searchedTxn]);

  useEffect(() => {
    if (searchedBlock) {
      navigate(`/blocks/${search}`);
    }
  }, [searchedBlock]);

  return <div className="App">
    <NavBar />
    <SearchBar setSearch={setSearch} />
    <Routes>
      <Route path='/' element={<Home blocks={blocks} transactions={aggregateTransactions()} />} />  
      <Route path='/blocks' element={<Blocks blocks={blocks}  />} />  
      <Route path='/blocks/:search' element={<BlockView alchemy={alchemy} />} />  
      <Route path='/transactions' element={<Transactions transactions={aggregateTransactions().slice(0, 100)} />} />
      <Route path='/transactions/:search' element={<TransactionView alchemy={alchemy} />} />
    </Routes>
  </div>;
}

export default App;
