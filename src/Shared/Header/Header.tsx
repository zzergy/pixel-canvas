import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import {
  faCodeBranch,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logoFlask from "../../images/logoFlask.png";
import { Link, useNavigate } from "react-router-dom";
import { gallery, homepage } from "../../routes";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setOpenState } from "../../slices/modalsSlice";
import { RootState } from "../../store";
import ProfileDropdown from "../../Pages/ProfileDropdown/ProfileDropdown";

const Header = () => {
  const navigate = useNavigate();
  const { profileDropdown: profileModal } = useSelector(
    (state: RootState) => state.modalsOpenState
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Link to={homepage} style={{ height: 26 }}>
        <img src={logoFlask} alt="logo" height={26} className={styles.logo} />
      </Link>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon
          icon={faImage}
          className={styles.icon}
          onClick={() => navigate(gallery)}
        />
        <FontAwesomeIcon
          icon={faUser}
          className={styles.icon}
          onClick={() =>
            dispatch(setOpenState({ profileDropdown: !profileModal }))
          }
        />

        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
