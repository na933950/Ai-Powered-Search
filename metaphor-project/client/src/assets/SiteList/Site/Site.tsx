import { QueryResult } from "../../utils/responseData";
import React from "react";
import styles from './Site.module.css';

const Site = ({
  title,
  url,
  publishedDate,
  author,
  content,
  relevance,
}: QueryResult) => {
  return (
    <div className={styles.container}>
      <div className={styles.headingRow}>
        <a className={styles.title} href={url} target="blank">{title}</a>
        <p>{publishedDate}</p>
      </div>
      <div className={styles.contentRow}>
        <p className={styles.content}>{content.slice(0, 500).slice(0, content.indexOf("↬")) + "..."}</p>
        <p>{author}</p>
      </div>
      <div className={styles.gptAnalysis}>
        {relevance}
      </div>
    </div>
  );
};

export default Site;
