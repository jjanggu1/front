import React from "react";
import { Link } from "react-router-dom";

interface SearchData {
  USER_ID: string;
  USER_IMAGE: string;
  USER_NAME: string;
  USER_NICKNAME: string;
}
interface SearchListProps {
  searchData: SearchData[] | undefined;
}

const SearchList: React.FC<SearchListProps> = ({ searchData }) => {
  return (
    <div className="searchList">
      {searchData && searchData.length > 0 ? (
        searchData.map((item: SearchData) => (
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
  );
};

export default SearchList;
