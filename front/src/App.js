// Pages
import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login.js';
import Join from './pages/Join/Join.js';
import MyPage from './pages/MyPage/MyPage.js';
import UserUpdate from './pages/UserUpdate/UserUpdate.js';

// Components
import Follower from './components/Follower/Follower.js';
// import PostTabs from './components/MyPageTabs/PostTabs.js';
// import SavedTabs from './components/MyPageTabs/SavedTabs.js';
// import LikedTabs from './components/MyPageTabs/LikedTabs.js';


import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userupdate" element={<UserUpdate />} />
          {/* components */}
          <Route path="/follower" element={<Follower />} />
          {/* <Route path="/follower" element={<PostTabs />} />
          <Route path="/follower" element={<SavedTabs />} />
          <Route path="/follower" element={<LikedTabs />} /> */}
        </Routes>
    </div>
  );
}

export default App;
