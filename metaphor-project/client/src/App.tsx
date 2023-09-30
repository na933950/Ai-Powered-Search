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

  return (
    <div className={styles.container}>
      {response ? <Header responseExists={true} /> : <Header responseExists={false}/>}
      <SearchBar setResponse={setResponse} setIsLoading={setIsLoading}/>
      {isLoading ? <BeatLoader className={styles.loader} color="#36d7b7" /> : null}
      {response ? <SiteList queryResults={response} /> : null}
    </div>
  );
}

export default App;
