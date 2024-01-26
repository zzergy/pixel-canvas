import styles from './Canvas.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setPixelsGrid } from "../../slices/canvasSlice";
import { addToCanvasHistory } from '../../slices/canvasActionToolsSlice';
import useUndoRedo from '../../hooks/useUndoRedo';
interface CanvasProps {
    drawingColor: string
}

const Canvas = ({ drawingColor }: CanvasProps) => {
    const canvasParameters = useSelector((state: RootState) => state.canvasParameters)
    const { isEraseMode } = useSelector((state: RootState) => state.canvasActionTools)
    const dispatch = useDispatch()
    const { gridColor, pixelsGrid } = canvasParameters
    const { present, addToHistory } = useUndoRedo()


    const drawPixel = (x: number, y: number, color: string) => {
        const updatedPixels = [...pixelsGrid.map(row => [...row])];
        updatedPixels[x][y] = color;
        dispatch(setPixelsGrid(updatedPixels))
        addToHistory(updatedPixels)

    }

    const handleClick = (currentXIndex: number, currentYIndex: number) => {
        drawPixel(currentXIndex, currentYIndex, isEraseMode ? 'white' : drawingColor)
    }

    return <div className={styles.container}>
        {present.map((rows: string[], xIndex: number) => (
            <div className={styles.canvasRow}>
                {rows.map((pixelColor: string, yIndex: number) => (
                    <div
                        // key={yIndex}
                        className={styles.canvasColumn}
                        style={{ background: pixelColor, borderColor: gridColor }}
                        onClick={() => handleClick(xIndex, yIndex)}>
                    </div>
                ))}
            </div>
        ))
        }
    </div >
}

export default Canvas
