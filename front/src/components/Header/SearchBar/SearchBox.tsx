interface ChildProps {
    searchInput: string | null;
    setSearchInput: (newState: string | null) => void;
}

const SearchBox: React.FC<ChildProps> = ({ searchInput, setSearchInput }) => {
  

  // 검색 input 초기화
  const allEraseInput = () => {
    setSearchInput("");
  };

  return (
    <div className="searchBox">
      <input
        onChange={(event) => setSearchInput(event.target.value)}
        value={searchInput ?? ''}
        type="text"
        placeholder="검색"
      />
      {searchInput?.trim() ? (
        <i className="fa-solid fa-xmark" onClick={allEraseInput}></i>
      ) : null}
    </div>
  );
};

export default SearchBox;
