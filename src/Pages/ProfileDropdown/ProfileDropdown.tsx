import { Popover } from "antd";
import styles from "./ProfileDropdown.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setOpenState } from "../../slices/modalsSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const { profileDropdown } = useSelector(
    (state: RootState) => state.modalsOpenState
  );

  return (
    <Popover
      trigger="click"
      open={profileDropdown}
      onOpenChange={(open) => dispatch(setOpenState({ profileDropdown: open }))}
      arrow={false}
      placement="bottomRight"
      overlayStyle={{ top: "40px", right: "6px" }}
      content={
        <div className={styles.list}>
          <div className={styles.listItem}>Manage Profile</div>
          <div className={styles.listItem}>Login/Logout</div>
        </div>
      }
    ></Popover>
  );
};

export default ProfileDropdown;
