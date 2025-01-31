import { useDispatch, useSelector } from "react-redux";
import Header from "../../Shared/Header/Header";
import Canvas from "../Canvas/Canvas";
import LeftNav from "../LeftNav/LeftNav";
import styles from "./CanvasPage.module.scss";
import { RootState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import useUndoRedo from "../../hooks/useUndoRedo";
import { setOpenState } from "../../slices/modalsSlice";

const CanvasPage = () => {
  const dispatch = useDispatch();
  const { present } = useUndoRedo();
  const { clearCanvasModal } = useSelector(
    (state: RootState) => state.modalsOpenState
  );
  const canvasParameters = useSelector((state: RootState) => state.canvasData);
  const { drawingColor } = canvasParameters;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <LeftNav />

        {!present ? (
          <div className={styles.emptyCanvas}>
            <FontAwesomeIcon icon={faHeartCrack} className={styles.heart} />
            <div className={styles.emptyText}>
              Oops! No canvas found! &nbsp;{" "}
              <p
                onClick={() =>
                  dispatch(setOpenState({ createCanvasModal: true }))
                }
                className={styles.link}
              >
                Create one here.
              </p>
            </div>
          </div>
        ) : (
          <Canvas drawingColor={drawingColor} canvasGrid={present} />
        )}
      </div>
    </div>
  );
};

export default CanvasPage;
