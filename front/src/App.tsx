// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import MyPage from './pages/MyPage/MyPage';
import Profile from './components/Profile/Profile';
import UserUpdate from './pages/UserUpdate/UserUpdate';

// Components
import Follower from './components/Follower/Follower';
import PostModal from './components/PostModal/PostModal';
// import PostTabs from './components/MyPageTabs/PostTabs.js';
// import SavedTabs from './components/MyPageTabs/SavedTabs.js';
// import LikedTabs from './components/MyPageTabs/LikedTabs.js';


import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });

  useEffect(() => {
    // 로그인 여부를 확인하고 상태를 업데이트
    setIsLoggedIn(localStorage.getItem("userId") !== null);
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div className="App">
        <Routes>
          {/* pages */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" />: <Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={isLoggedIn ? <MyPage /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/userupdate" element={isLoggedIn ? <UserUpdate /> : <Navigate to="/login" />} />
          {/* components */}
          <Route path="/follower" element={<Follower />} />
          <Route path="/post/:id" element={<PostModal />} />
          {/* <Route path="/follower" element={<PostTabs />} />
          <Route path="/follower" element={<SavedTabs />} />
        <Route path="/follower" element={<LikedTabs />} /> */}
        <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
