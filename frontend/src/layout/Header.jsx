import React, { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const inputRef = useRef(null);

  return (
    <header>
      <div className="search-container">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchKey) {
              navigate(`/${searchKey}`);
              setSearchKey("");
              inputRef.current.blur();
            }
          }}
          ref={inputRef}
        />
        <IoIosSearch
          size={"1.5rem"}
          className="search-icon"
          onClick={(e) => {
            e.preventDefault();
            if (searchKey) {
              navigate(`/${searchKey}`);
              setSearchKey("");
            } else {
              inputRef.current.focus();
            }
          }}
        />
      </div>
    </header>
  );
};

export default Header;
