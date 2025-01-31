import { faFile as faFileRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CreateCanvas.module.scss";
import { useState } from "react";
import { Dimensions } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  setCanvasGridColor,
  setCanvasSize,
} from "../../../../slices/canvasSlice";
import { Button, ColorPicker, Modal, message } from "antd";
import { RootState } from "../../../../store";
import { setOpenState } from "../../../../slices/modalsSlice";
import {
  clearCanvasHistory,
  initializeCanvasHistory,
} from "../../../../slices/canvasActionToolsSlice";
import { Color } from "antd/es/color-picker";

const CreateCanvas = () => {
  const validationPattern = /^(?:[5-9]|[1-5]\d+|60)$/;
  const initialDimensions = { rows: 0, columns: 0 };
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const classnames = require("classnames");
  const canvasGridColor = useSelector(
    (state: RootState) => state.canvasData.gridColor
  );
  const { createCanvasModal } = useSelector(
    (state: RootState) => state.modalsOpenState
  );
  const [error, setError] = useState({ rows: false, columns: false });
  const [canvasDimensions, setCanvasDimensions] =
    useState<Dimensions>(initialDimensions);
  const presetCanvasSizes: ["5x5", "15x15", "25x25", "60x60"] = [
    "5x5",
    "15x15",
    "25x25",
    "60x60",
  ];
  const errorMessage = "Please enter a number between 5 and 60";

  const handleCreateCanvas = () => {
    dispatch(clearCanvasHistory());
    dispatch(setCanvasSize(canvasDimensions));
    dispatch(
      initializeCanvasHistory(
        Array(canvasDimensions.rows).fill(
          Array(canvasDimensions.columns).fill("white")
        )
      )
    );
    handleClose();
    success();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCanvasDimensions({ ...canvasDimensions, [name]: value });

    if (!validationPattern.test(value)) {
      setError({ ...error, [name]: true });
      return;
    }

    setError({ ...error, [name]: false });
  };

  const handleClickCanvasOption = (rows: number, columns: number) => {
    setCanvasDimensions({ ...canvasDimensions, rows, columns });
  };

  const handleClose = () => {
    dispatch(setOpenState({ createCanvasModal: false }));
    setError({ columns: false, rows: false });
    setCanvasDimensions(initialDimensions);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Your canvas is all set!",
    });
  };

  const handleColorChange = (_value: Color, hex: string) => {
    dispatch(setCanvasGridColor(hex));
  };

  return (
    <>
      {contextHolder}
      <Modal
        mask
        maskClosable
        className={styles.modal}
        open={createCanvasModal}
        onCancel={handleClose}
        footer={null}
      >
        <div>
          <FontAwesomeIcon icon={faFileRegular} className={styles.icon} />
          <span className={styles.titleText}>New Canvas</span>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <label className={styles.label} htmlFor="width">
              Width
            </label>
            <input
              id="width"
              name="columns"
              className={classnames(
                styles.input,
                error.columns && styles.error
              )}
              value={!canvasDimensions.columns ? "" : canvasDimensions.columns}
              onChange={(event) => handleChangeInput(event)}
            />
            {error.columns && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>
          <div className={styles.section}>
            <label className={styles.label} htmlFor="height">
              Height
            </label>
            <input
              id="height"
              name="rows"
              className={classnames(styles.input, error.rows && styles.error)}
              value={!canvasDimensions.rows ? "" : canvasDimensions.rows}
              onChange={(event) => handleChangeInput(event)}
            />
            {error.rows && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.section}>
              <div className={styles.label}>Preset Canvas Sizes</div>
              <div className={styles.presetCanvasesContainer}>
                {presetCanvasSizes.map((size, key) => {
                  const rows = parseInt(size.split("x")[0]);
                  const columns = parseInt(size.split("x")[1]);
                  const isSelected =
                    canvasDimensions.rows === rows &&
                    canvasDimensions.columns === columns;

                  return (
                    <div
                      key={key}
                      className={classnames(
                        styles.canvasSizes,
                        isSelected && styles.selected
                      )}
                      onClick={() => {
                        handleClickCanvasOption(rows, columns);
                      }}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.section}>
              <label className={styles.label} htmlFor="grid color">
                Grid Color
              </label>
              <ColorPicker
                showText
                defaultValue={canvasGridColor}
                value={canvasGridColor}
                onChange={(value, hex) => handleColorChange(value, hex)}
              />
            </div>
          </div>
        </div>
        <div className={styles.createCanvas}>
          <Button
            disabled={
              error.columns ||
              error.rows ||
              !canvasDimensions.rows ||
              !canvasDimensions.columns
            }
            onClick={handleCreateCanvas}
            size="large"
            type="primary"
          >
            Create Canvas
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateCanvas;
