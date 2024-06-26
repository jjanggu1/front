import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import SearchList from "./SearchList";

interface SearchData {
  USER_ID: string;
  USER_IMAGE: string;
  USER_NAME: string;
  USER_NICKNAME: string;
}

const SearchBar = () => {
  const BASE_URL = "http://localhost:4000";

  const [searchInput, setSearchInput] = useState<string | null>(null);

  // 검색된 데이터
  const [searchData, setSearchData] = useState<SearchData[]>();

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
    <div className="searchBar">
      <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
      {searchInput?.trim() ? <SearchList searchData={searchData} /> : null}
    </div>
  );
};

export default SearchBar;
