import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

interface SearchData {
  USER_ID: string;
  USER_IMAGE: string;
  USER_NAME: string;
  USER_NICKNAME: string;
}

const SearchBar = () => {
  const BASE_URL = "http://localhost:4000";

  const [searchInput, setSearchInput] = useState("");

  // 검색된 데이터
  const [searchData, setSearchData] = useState<SearchData[]>();

  // 검색 input 초기화
  const allEraseInput = () => {
    setSearchInput("");
  };

  // 회원&해시태그 데이터 요청
  const fetchSearchData = async () => {
    const sendSearchData = {
      memberNick: searchInput,
    };
    if (sendSearchData.memberNick === "") {
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/api/main/findUser`,
        sendSearchData
      );
      const data = res.data;

      await setSearchData(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // 인풋값이 바뀔때만 검색 요청
  useEffect(() => {
    fetchSearchData();
  }, [searchInput]);

  
  console.log("검색 인풋 : ", searchInput);
  console.log("검색된 데이터 : ", searchData);

  return (
    <div className="search">
      <div className="searchBox">
        <input
          onChange={(event) => setSearchInput(event.target.value)}
          value={searchInput}
          type="text"
          placeholder="검색"
        />
        {searchInput.trim() !== "" ? (
          <i className="fa-solid fa-xmark" onClick={allEraseInput}></i>
        ) : null}
      </div>
      {searchInput.trim() !== "" ? (
        <div className="searchList">
          {searchData && searchData.length > 0 ? (
            searchData.map((item) => (
              <Link to={`/profile/${item.USER_ID}`} key={item.USER_ID}>
                <div className="searchList_column">
                  <img
                    src={`http://localhost:4000/profileImg/${item.USER_IMAGE}`}
                    alt="프로필 이미지"
                  />
                  <div className="searchList_column_row">
                    <span>{item.USER_NICKNAME}</span>
                    <span>{item.USER_NAME}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
