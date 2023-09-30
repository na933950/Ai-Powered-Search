import styles from "./Header.module.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface Props {
    responseExists: boolean
}

const Header = ({ responseExists }: Props) => {
  const [text] = useTypewriter({
    words: [
      "Teach me how to solve a Rubik's cube",
      "Explain the phyics of pole vaulting!",
      "Peer reviewed papers about internet accessibility",
    ],
    loop: 0,
    delaySpeed: 1000,
    typeSpeed: 50,
    deleteSpeed: 40,
  });

  return (
    <div className={styles.container}>
      {responseExists ? null :<h1 className={styles.title}>AI Powered Search...</h1>}
      {responseExists ? null : <p className={styles.queries}>
        <span>{text}</span> <Cursor cursorColor="white" />
      </p>}
    </div>
  );
};

export default Header;
