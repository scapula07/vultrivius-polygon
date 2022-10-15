import logo from './logo.svg';
import './App.css';
import {Routes,Route,BrowserRouter as Router } from "react-router-dom"
import Home from './pages/Home';
import Layout from './Layout/layout';
import Item from './pages/Item';
import CreateNft from './pages/CreateNft';
import Staking from './pages/StakingPool';
import CreateStake from './pages/CreateStake';
import Profile from './pages/Profile';
import Created from './pages/Profile/created';
import UserCollections from './pages/Profile/collections';
import Transactions from './pages/Profile/transactions';
import Owned from './pages/Profile/owned';
function App() {
  return (
    <div className="App">
      <Layout>
         <Routes>
            <Route exact path="/"  element={<Home />}/>
            <Route exact path="/item/:name"  element={<Item  />}/>
            <Route exact path="/list"  element={<CreateNft  />}/>
            <Route exact path="/stake"  element={<Staking  />}/>
            <Route exact path="/createpool"  element={<CreateStake  />}/>
            <Route exact path="/profile"  element={< Profile   />}>
              <Route exact path="created"  element={<Created  />}/>
              <Route exact path="collections"  element={<UserCollections  />}/>
              <Route exact path="transactions"  element={<Transactions  />}/>
              <Route exact path="owned"  element={<Owned  />}/>
            </Route>
          </Routes>
      </Layout>
      
    </div>
  );
}

export default App;
