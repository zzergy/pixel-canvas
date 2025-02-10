import useUndoRedo from "../../hooks/useUndoRedo";
import ColorPicker from "./ColorPicker/ColorPicker";
import FileMenu from "./FileMenu/FileMenu";
import styles from "./LeftNav.module.scss";
import ToolButton from "./ToolButton/ToolButton";
import {
  faEraser,
  faFillDrip,
  faRotateLeft,
  faRotateRight,
  faHand,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerCanvasDragMode,
  triggerColorFillMode,
  triggerDrawingMode,
  triggerEraseMode,
} from "../../slices/canvasActionToolsSlice";
import { RootState } from "../../store";
import { useEffect } from "react";
import Pencil from "./Pencil/Pencil";
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";

const LeftNav = () => {
  const classnames = require("classnames");
  const { present: hasCanvas } = useUndoRedo();
  const dispatch = useDispatch();
  const { isEraseMode, isColorFillMode, isCanvasDragMode, isDrawingMode } =
    useSelector((state: RootState) => state.canvasActionTools);
  const { canvasHistory, undoAction, redoAction } = useUndoRedo();

  const handleEraserClick = () => {
    dispatch(triggerEraseMode(!isEraseMode));
  };

  const handleUndoRedoClick = (action: "undo" | "redo") => {
    action === "undo" ? undoAction() : redoAction();
  };

  const handleColorfillClick = () => {
    dispatch(triggerColorFillMode(!isColorFillMode));
  };

  const handleDragClick = () => {
    dispatch(triggerCanvasDragMode(!isCanvasDragMode));
  };

  const handlePencilClick = () => {
    dispatch(triggerDrawingMode(!isDrawingMode));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key?.toLowerCase();

      if (!key) return;

      if (event.ctrlKey && event.shiftKey && key === "Z") {
        handleUndoRedoClick("redo");
      } else if (event.ctrlKey && key === "z") {
        handleUndoRedoClick("undo");
      } else if (key === "p") {
        handlePencilClick();
      } else if (key === "h") {
        handleDragClick();
      } else if (key === "g") {
        handleColorfillClick();
      } else if (key === "e") {
        handleEraserClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      //Cleanup
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isEraseMode,
    isColorFillMode,
    isCanvasDragMode,
    isDrawingMode,
    useUndoRedo,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <FileMenu />

        {hasCanvas && (
          <>
            <ToolButton
              icon={faRotateLeft}
              onClick={() => {
                handleUndoRedoClick("undo");
              }}
              isDisabled={
                canvasHistory.length === 1 || hasCanvas === canvasHistory[0]
              }
              tooltipText="Undo"
            />
            <ToolButton
              icon={faRotateRight}
              onClick={() => {
                handleUndoRedoClick("redo");
              }}
              isDisabled={hasCanvas === canvasHistory[canvasHistory.length - 1]}
              tooltipText="Redo"
            />
            <Pencil />
            <ToolButton
              icon={faHand}
              onClick={handleDragClick}
              isActive={isCanvasDragMode}
              tooltipText="Move Canvas"
            />
            <ColorPicker />
            <ToolButton
              icon={faEraser}
              onClick={handleEraserClick}
              isActive={isEraseMode}
              isDisabled={canvasHistory.length === 1}
              tooltipText="Eraser"
            />
            <ToolButton
              icon={faFillDrip}
              onClick={handleColorfillClick}
              isActive={isColorFillMode}
              isDisabled={!hasCanvas}
              tooltipText="Bucket Tool"
            />
          </>
        )}
      </div>

      <div className={styles.sourceLinks}>
        <Tooltip title="Source code" placement="right" arrow={false}>
          <a
            target="_blank"
            href="https://github.com/zzergy/pixel-craft-studio"
            className={styles.icon}
          >
            <FontAwesomeIcon className={styles.sources} icon={faCodeBranch} />
          </a>
        </Tooltip>
        <Tooltip title="My GitHub Account 👩‍💻" placement="right" arrow={false}>
          <a
            target="_blank"
            href="https://github.com/zzergy"
            className={styles.icon}
          >
            <FontAwesomeIcon
              icon={faGithubAlt}
              className={classnames(styles.sources, styles.medium)}
            />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default LeftNav;
