import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import { ModalTypes } from "../../types";
import { setOpenState } from "../../slices/modalsSlice";

interface ConfirmModalProps {
  open: boolean;
  modalName: ModalTypes;
  title: string;
  content?: ReactElement;
  cancel?: boolean;
  confirmButton: { text: string; action: () => void };
}

const ConfirmModal = ({
  open,
  modalName,
  title,
  content,
  cancel = true,
  confirmButton,
}: ConfirmModalProps) => {
  const dispatch = useDispatch();

  const handleClose = (modalName: ModalTypes) => {
    dispatch(setOpenState({ [modalName]: false }));
  };

  const confirmAction = () => {
    confirmButton.action();
    handleClose(modalName);
  };

  return (
    <>
      <Modal
        mask
        maskClosable
        title={title}
        open={open}
        onCancel={() => handleClose(modalName)}
        footer={() => (
          <>
            {cancel && (
              <Button size="small" onClick={() => handleClose(modalName)}>
                Cancel
              </Button>
            )}
            <Button size="small" type="primary" onClick={confirmAction}>
              {confirmButton.text}
            </Button>
          </>
        )}
      >
        {content}
      </Modal>
    </>
  );
};

export default ConfirmModal;
