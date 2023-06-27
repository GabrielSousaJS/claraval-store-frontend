import "./styles.css";

import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

type Props = {
  onSearch: Function;
};

export default function SearchBar({ onSearch }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(event: any) {
    event.prevetDefault();
    onSearch(text);
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          type="text"
          placeholder="Nome do produto"
          className="base-inputs"
          onChange={handleChange}
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
