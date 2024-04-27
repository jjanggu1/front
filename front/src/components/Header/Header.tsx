import "./Header.css";
import CreatePost from "../CreatePost/CreatePost";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import Service from "./Service/Service";

function Header() {
  let isCreatePostVisible = useSelector(
    (state: RootState) => state.createPostVisible
  );

  return (
    <div className="header">
      <div className="header_content">
        <Logo />
        <SearchBar />
        <Service />
      </div>
      {isCreatePostVisible && <CreatePost />}
    </div>
  );
}

export default Header;
