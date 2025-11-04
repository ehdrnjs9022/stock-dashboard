import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MainLayout from './layouts/MainLayout';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import FindId from './pages/findid/FindId';
import FindPw from './pages/findpPw/FIndPw';
import Search from './pages/search/Search';
import Domestic from './pages/domestic/Domestic';
import OverSeas from './pages/overseas/Overseas';
import Crypto from './pages/crypto/Crypto';
import Kospi from './pages/market/Kospi';
import Nasdaq from './pages/market/Nasdaq';
import Btc from './pages/market/Btc';
import Kosdaq from './pages/market/Kosdaq';
import DowJones from './pages/market/DowJones';
import Sp500 from './pages/market/Sp500';
import Eth from './pages/market/Eth';
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/domestic" element={<Domestic />}></Route>
          <Route path="/overseas" element={<OverSeas />}></Route>
          <Route path="/crypto" element={<Crypto />}></Route>
          <Route path="/market/kospi" element={<Kospi />}></Route>
          <Route path="/market/Kosdaq" element={<Kosdaq />}></Route>
          <Route path="/market/nasdaq" element={<Nasdaq />}></Route>
          <Route path="/market/sp500" element={<Sp500 />}></Route>
          <Route path="/market/dowjones" element={<DowJones />}></Route>
          <Route path="/market/btc" element={<Btc />}></Route>
          <Route path="/market/eth" element={<Eth />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/findId" element={<FindId />}></Route>
        <Route path="/findPw" element={<FindPw />}></Route>
      </Routes>
    </>
  );
}

export default App;
