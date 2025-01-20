import { Button } from "antd";
import logo from "../../../images/logoFlask.png";
import styles from "./HomepageNav.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { homepage, signup, signin } from "../../../routes";

const HomepageNav = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Link to={homepage}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h4 className={styles.title}>Pixelcraft Studio</h4>
        </div>
      </Link>

      <div className={styles.buttons}>
        <Button
          className={styles.signInButton}
          onClick={() => navigate(signup)}
          type="text"
        >
          Sign Up
        </Button>
        <Button
          className={styles.signInButton}
          onClick={() => navigate(signin)}
          type="primary"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default HomepageNav;
