/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import axios, { AxiosError, AxiosResponse } from "axios";
import ResponseData from "../utils/responseData";
import convertQuery from "../utils/convertQuery";
import { QueryResult } from "../utils/responseData";

interface Props {
  setResponse: (response: QueryResult[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const SearchBar = ({ setResponse, setIsLoading }: Props) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const sluggedQuery = convertQuery(query);
    setIsLoading(true);
    axios
      .get<ResponseData>(
        `http://127.0.0.1:3000/api/searches?search=${sluggedQuery}`
      )
      .then((res: AxiosResponse<ResponseData>) => {
        //@ts-ignore
        setResponse(res.data.data.results);
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.colContainer}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyPress}
          ></input>
          <button className={styles.button} onClick={handleSearch}>
            <BsSearch></BsSearch>
          </button>
        </div>
        <p className={styles.credit}>Powered by Metaphor and OpenAI</p>
      </div>
    </div>
  );
};

export default SearchBar;
