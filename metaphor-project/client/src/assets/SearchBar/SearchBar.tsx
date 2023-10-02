/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import axios, { AxiosError, AxiosResponse } from "axios";
import ResponseData from "../utils/searchData";
import convertQuery from "../utils/convertQuery";
import { QueryResult } from "../utils/searchData";
import { Synthesis } from "../utils/synthesisData";
import SynthesisData from "../utils/synthesisData";

interface Props {
  setSearches: (response: QueryResult[]) => void;
  setSynthesis: (response: Synthesis) => void;
  setIsLoading: (isLoading: boolean) => void;
  scroll: () => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const SearchBar = ({
  setSearches,
  setIsLoading,
  setSynthesis,
  scroll,
  isSearching,
  setIsSearching,
}: Props) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const sluggedQuery = convertQuery(query);
    setIsLoading(true);
    if (isSearching) {
      axios
        .get<ResponseData>(
          `http://127.0.0.1:3000/api/searches?search=${sluggedQuery}`
        )
        .then((res: AxiosResponse<ResponseData>) => {
          setSearches(res.data.data.results);
          setIsLoading(false);
          setTimeout(scroll, 100);
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    } else {
      axios
        .get<SynthesisData>(
          `http://127.0.0.1:3000/api/synthesis?search=${sluggedQuery}`
        )
        .then((res: AxiosResponse<SynthesisData>) => {
          console.log(res.data.data);
          setSynthesis(res.data.data);
          setIsLoading(false);
          setTimeout(scroll, 100);
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    }
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
          <div
            className={styles.searchSwitch}
            style={
              isSearching
                ? { backgroundPosition: "100%" }
                : { backgroundPosition: "0%" }
            }
          >
            <div
              className={styles.option}
              onClick={() => {
                setIsSearching(true);
              }}
              style={isSearching ? { color: "white" } : { color: "gray" }}
            >
              <p>Search</p>
            </div>
            <div
              className={styles.option}
              onClick={() => {
                setIsSearching(false);
              }}
              style={isSearching ? { color: "gray" } : { color: "white" }}
            >
              Synthesize
            </div>
          </div>
        </div>
        <p className={styles.credit}>Powered by Metaphor and OpenAI</p>
      </div>
    </div>
  );
};

export default SearchBar;
