import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';
import EditableText from './tools/EditableText/EditableText';
import { KonvaEventObject } from 'konva/lib/Node';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

export type TTextInitialProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
} & Konva.TextConfig;

const initialTexts: TTextInitialProps[] = [
  {
    x: 50,
    y: 50,
    width: 300,
    height: 100,
    text: 'Click to resize. Double click to edit.',
  },
];

const Frame = ({ stageRef }: IProps) => {
  const [scale, setScale] = useState(1);
  const { width, height } = useAppSelector((state) => state.frame);

  useEffect(() => {
    const containerCenterPaddings = 40;
    const toolbar = document.querySelector('#toolbar') as HTMLElement;
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (toolbar && navbar) {
      const wScale = (window.innerWidth - toolbar.offsetWidth - containerCenterPaddings) / width;
      const hScale = (window.innerHeight - navbar.offsetHeight - containerCenterPaddings) / height;
      if (wScale < hScale) {
        setScale(wScale);
      } else {
        setScale(hScale);
      }
    }
  }, [width, height]);

  const [texts, setTexts] = useState(initialTexts);
  const [selectedId, selectShape] = useState<string | null>(null);

  const checkDeselect = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={width * scale}
      height={height * scale}
      style={{ backgroundColor: 'white' }}
      scaleX={scale}
      scaleY={scale}
      ref={stageRef}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <Text text="Some text" />
        {texts.map((item, i) => (
          <EditableText
            key={i}
            shapeProps={item}
            isSelected={`text${i}` === selectedId}
            onSelect={() => {
              selectShape(`text${i}`);
            }}
            onChange={(newAttrs: Konva.TextConfig) => {
              const newTexts = texts.slice();
              newTexts[i] = newAttrs as TTextInitialProps;
              setTexts(newTexts);
              console.log(texts);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Frame;
