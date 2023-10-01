import SearchBar from "./assets/SearchBar";
import styles from "./App.module.css";
import { useState } from "react";
import { QueryResult } from "./assets/utils/responseData";
import SiteList from "./assets/SiteList";
import Header from "./assets/Header";
import { BeatLoader } from "react-spinners";

function App() {
  const [response, setResponse] = useState<QueryResult[]>();
  const [isLoading, setIsLoading] = useState(false);
  const scroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <Header responseExists={false}></Header>
        <SearchBar setResponse={setResponse} setIsLoading={setIsLoading} scroll={scroll}/>
        {isLoading ? (
          <BeatLoader className={styles.loader} color="#36d7b7" />
        ) : null}
      </div>
      {response ? <SiteList queryResults={response} /> : null}
    </div>
  );
}

export default App;
