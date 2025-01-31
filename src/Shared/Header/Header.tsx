import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch, faUser } from "@fortawesome/free-solid-svg-icons";
import logoFlask from "../../images/logoFlask.png";
import { Link } from "react-router-dom";
import { homepage } from "../../routes";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setOpenState } from "../../slices/modalsSlice";
import { RootState } from "../../store";
import ProfileDropdown from "../../Pages/ProfileDropdown/ProfileDropdown";

const Header = () => {
  const { profileModal } = useSelector(
    (state: RootState) => state.modalsOpenState
  );
  const dispatch = useDispatch();

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

        <FontAwesomeIcon
          icon={faUser}
          className={styles.icon}
          onClick={() =>
            dispatch(setOpenState({ profileModal: !profileModal }))
          }
        />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
