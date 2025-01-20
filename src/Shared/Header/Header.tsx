import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch, faUser } from "@fortawesome/free-solid-svg-icons";
import logoFlask from "../../images/logoFlask.png";
import { Link, useNavigate } from "react-router-dom";
import { homepage, profile } from "../../routes";
import { Tooltip } from "antd";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Link to={homepage} style={{ height: 26 }}>
        <img src={logoFlask} alt="logo" height={26} className={styles.logo} />
      </Link>
      <div className={styles.iconContainer}>
        <Tooltip title="Source code" placement="bottomRight" arrow={false}>
          <a
            href="https://github.com/zzergy/pixel-craft-studio"
            className={styles.icon}
          >
            <FontAwesomeIcon icon={faCodeBranch} />
          </a>
        </Tooltip>
        <Tooltip
          title="My GitHub Account 👩‍💻"
          placement="bottomRight"
          arrow={false}
        >
          <a href="https://github.com/zzergy" className={styles.icon}>
            <FontAwesomeIcon icon={faGithubAlt} className={styles.medium} />
          </a>
        </Tooltip>

        <Tooltip title="Profile" placement="bottomRight" arrow={false}>
          <FontAwesomeIcon
            icon={faUser}
            className={styles.icon}
            onClick={() => navigate(profile)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
