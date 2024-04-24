import "./Join.css";
import { Link } from "react-router-dom";

function JoinHeader() {

  return (
    <>
      <div className="join_main_logo">
        <span>
          <Link to="/">memories</Link>
        </span>
      </div>
      <div className="join_main_googlejoin">
        <a href="/">
          <i className="fa-brands fa-google"></i>
          Google로 로그인
        </a>
      </div>
    </>
  );
}

export default JoinHeader;
