import { Synthesis } from "../utils/synthesisData";
import styles from "./SynthesisData.module.css";

interface Props {
  synthesisData: Synthesis;
}

const SynthesisElement = ({ synthesisData }: Props) => {
  const synthesis = synthesisData.synthesis;
  const searchResults = synthesisData.searchResults;
  return (
    <div className={styles.container}>
      <div className={styles.synthesisContainer}>
        <h2 className={styles.header}>AI Synthesis:</h2>
        <h2 className={styles.synthesis}>{synthesis}</h2>
      </div>
      <div className={styles.citations}>
        <h2 className={styles.header}>Citations:</h2>
        {searchResults.map((res, i) => (
          <div className={styles.citation}>
            <p>{i + 1}.{"\t"}
              <span>
                {res.author && res.author.split(" ").length == 2
                  ? res.author.split(" ").reverse().join(", ")
                  : res.author}
              </span>
              <span className={styles.i}>. {res.title}. </span>
              {res.publishedDate}, {res.url}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SynthesisElement;
