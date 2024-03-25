import React, { ChangeEventHandler } from "react";
import "./search-box.css";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  className = "",
  placeholder = "",
  onChangeHandler,
}) => (
  <>
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  </>
);

export default SearchBox;
