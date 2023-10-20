import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login.js';
import MyPage from './pages/MyPage/MyPage.js';
import UserUpdate from './pages/UserUpdate/UserUpdate.js';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userupdate" element={<UserUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
