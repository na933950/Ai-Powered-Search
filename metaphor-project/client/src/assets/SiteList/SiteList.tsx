import { QueryResult } from "../utils/searchData";
import Site from "./Site";
import styles from "./SiteList.module.css";

interface Props {
  queryResults: QueryResult[];
}

const SiteList = ({ queryResults }: Props) => {
  return (
    <div className={styles.container}>
      {queryResults.map((el) => (
        <Site {...el} />
      ))}
    </div>
  );
};

export default SiteList;
