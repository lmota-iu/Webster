import { useEffect, useState } from 'react';
import { Layer, Line, Rect } from 'react-konva';

const GUIDE_LINE_SPACCING = 15;
const GUIDE_MAIN_INTERVAL = 5;

type IProps = {
    width: number;
    height: number;
    scale: number;
  };

const Grid = ({width, height, scale}: IProps) => {
  const [lines, setLines] = useState<Object[]>([]);
    console.log("Grid")
  useEffect(() => {
    console.log(width, height, scale);

    // const currentX = 0;
    // const currentY = 0;

    const lines = [];

    // Vertical guide lines
    for (let i = 0; i < width / GUIDE_LINE_SPACCING; i++) {
       lines.push({
        start: {
          x: i * GUIDE_LINE_SPACCING,
          y: 0,
        },
        end: {
          x: i * GUIDE_LINE_SPACCING,
          y: height,
        },
       })        
    }

    // Horizontal guide lines
    for (let i = 0; i < height / GUIDE_LINE_SPACCING; i++) {
        lines.push({
         start: {
           x: 0,
           y: i * GUIDE_LINE_SPACCING,
         },
         end: {
           x: width,
           y: i * GUIDE_LINE_SPACCING,
         },
        })        
     }

    setLines(lines);
  }, []);

  return (
    <Layer>
      {/* <Line points={[0, 100, 300, 100]} stroke="teal" strokeWidth={0.2} /> */}
      {lines.map((line: any, i: number) => (
        <Line
          key={Math.random()}
          points={[
            line.start.x,
            line.start.y,
            line.end.x,
            line.end.y,
          ]}
          stroke="teal"
          strokeWidth={i % GUIDE_MAIN_INTERVAL === 0 ? 0.3 : 0.1}
        />
      ))}
    </Layer>
  );
};

export default Grid;
