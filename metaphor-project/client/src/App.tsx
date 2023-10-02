import SearchBar from "./assets/SearchBar";
import styles from "./App.module.css";
import { useState } from "react";
import { QueryResult } from "./assets/utils/searchData";
import SiteList from "./assets/SiteList";
import Header from "./assets/Header";
import { BeatLoader } from "react-spinners";
import { Synthesis } from "./assets/utils/synthesisData";
import SynthesisElement from "./assets/SynthesisElement";

function App() {
  const [searches, setSearches] = useState<QueryResult[]>();
  const [synthesis, setSynthesis] = useState<Synthesis>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const scroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <Header responseExists={false}></Header>
        <SearchBar
          setSearches={setSearches}
          setIsLoading={setIsLoading}
          setSynthesis={setSynthesis}
          scroll={scroll}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        {isLoading ? (
          <BeatLoader className={styles.loader} color="#36d7b7" />
        ) : null}
      </div>
      {searches && isSearching ? <SiteList queryResults={searches} /> : null}
      {synthesis && !isSearching ? <SynthesisElement synthesisData={synthesis}/> : null}
    </div>
  );
}

export default App;
