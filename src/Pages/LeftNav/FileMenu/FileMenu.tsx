import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { useRef, useState } from "react";
import styles from "./FileMenu.module.scss";
import { faFile as faFileRegular } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenState } from "../../../slices/modalsSlice";
import CreateCanvas from "./CreateCanvas/CreateCanvas";
import { RootState } from "../../../store";
import { ModalTypes } from "../../../types";
import ConfirmModal from "../../../Shared/ConfirmModal/ConfirmModal";
import { clearCanvas, deleteCanvas } from "../../../slices/canvasSlice";
import useUndoRedo from "../../../hooks/useUndoRedo";

const FileMenu = () => {
  const classnames = require("classnames");
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  const { clearUndoRedoHistory, addToHistory, present } = useUndoRedo();

  const [open, setOpen] = useState<boolean>(false);
  const { rows, columns, baseColor } = useSelector(
    (state: RootState) => state.canvasData
  );
  const { clearCanvasModal, deleteCanvasModal } = useSelector(
    (state: RootState) => state.modalsOpenState
  );

  const handleOpenModal = (modal: any) => {
    setOpen(!open);
    dispatch(setOpenState({ [modal]: true }));
  };

  const isThereADrawingOnTheCanvas = present?.some((row) =>
    row.some((pixel) => pixel !== baseColor)
  );

  const data = [
    { title: "New", modalName: ModalTypes.create, visible: true },
    {
      title: "Clear",
      modalName: ModalTypes.clear,
      visible: present && isThereADrawingOnTheCanvas,
    },
    { title: "Delete Canvas", modalName: ModalTypes.delete, visible: present },
  ];

  const handleClearCanvas = () => {
    dispatch(clearCanvas({ rows, columns }));
    addToHistory(Array(rows).fill(Array(columns).fill(baseColor)));
  };

  const handleDeleteCanvas = () => {
    dispatch(deleteCanvas());
    clearUndoRedoHistory();
  };

  return (
    <>
      <Popover
        ref={popoverRef}
        trigger="click"
        open={open}
        arrow={false}
        onOpenChange={(open) => setOpen(open)}
        placement="right"
        className={styles.fileMenu}
        content={
          <div className={styles.list}>
            {data.map(
              (item, key) =>
                item.visible && (
                  <div
                    key={key}
                    className={classnames(
                      styles.listItem,
                      item.title === "Delete Canvas" && styles.warning
                    )}
                    onClick={() => handleOpenModal(item.modalName)}
                  >
                    {item.title}
                  </div>
                )
            )}
          </div>
        }
      >
        <FontAwesomeIcon
          icon={faFileRegular}
          className={classnames(styles.icon, styles.selectable)}
        />
      </Popover>

      <CreateCanvas />
      <ConfirmModal
        open={clearCanvasModal!}
        modalName={ModalTypes.clear}
        title="Clear Canvas?"
        content={<p>This action cannot be reversed.</p>}
        confirmButton={{
          text: "Yes",
          action: handleClearCanvas,
        }}
      />
      <ConfirmModal
        open={deleteCanvasModal!}
        modalName={ModalTypes.delete}
        title="Are you sure you want to delete your canvas?"
        content={<p>This action cannot be reversed.</p>}
        confirmButton={{
          text: "Delete",
          action: handleDeleteCanvas,
        }}
      />
    </>
  );
};

export default FileMenu;
