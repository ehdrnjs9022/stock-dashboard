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
import Mypage from './pages/mypage/Mypage';
import Delete from './pages/myPage/Delete';
import Password from './pages/myPage/Password';
import Board from './pages/board/Board';
import BoardDetails from './pages/board/BoardDetails';
import BoardWrite from './pages/board/boardWrite';
import BoardUpdate from './pages/board/BoardUpdate';
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/domestic" element={<Domestic />}></Route>
          <Route path="/overseas" element={<OverSeas />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/board/write" element={<BoardWrite />}></Route>
          <Route path="/board/:boardNo" element={<BoardDetails />}></Route>
          <Route
            path="/board/update/:boardNo"
            element={<BoardUpdate />}
          ></Route>

          <Route path="/crypto" element={<Crypto />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/mypage/delete" element={<Delete />}></Route>
          <Route path="/mypage/password" element={<Password />}></Route>
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
