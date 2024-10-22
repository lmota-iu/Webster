import React, { useEffect } from 'react';
import Konva from 'konva';
import { Box } from '@chakra-ui/react';
import { Stage, Layer, Transformer } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';
import TextObject from '../objects/TextObject/TextObject';
import { KonvaEventObject } from 'konva/lib/Node';
import ImageObject from '../objects/ImageObject/ImageObject';
import ShapeObject from '../objects/ShapeObject/ShapeObject';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject, StageObjectType, StageTextObjectData } from '~/types/stage-object';
import useTransformer from '~/hooks/use-transformer';
import useObjectSelect from '~/hooks/use-object-select';
import { loadGoogleFontsDefaultVariants } from '~/utils/load-google-fonts-default-variants';
import useHotkeySetup from '~/hooks/use-hotkey-setup';
import useStageResize from '~/hooks/use-stage-resize';
import { setSize } from '~/store/slices/frame-slice';
import { useDispatch } from 'react-redux';
import Grid from './Grid';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Frame = ({ stageRef }: IProps) => {
  const dispatch = useDispatch();

  const { stageObjects, resetAll, replaceAll } = useStageObject();
  const { transformer: imageTransformer, onTransformerEnd: onImageTransformerEnd } = useTransformer({ stageRef });
  const { transformer: textTransformer, onTransformerEnd: onTextTransformerEnd } = useTransformer({ stageRef });
  const { transformer: multiTransformer, onTransformerEnd: onMultiTransformerEnd } = useTransformer({ stageRef });

  const transformers = { imageTransformer, textTransformer, multiTransformer };

  const { onObjectSelect, resetObjectSelect } = useObjectSelect(transformers);

  useHotkeySetup(transformers);

  const { width, height, scale, stage } = useAppSelector((state) => state.frame);
  const { boxWidth, boxHeight, handleZoom, handleDragMoveStage } = useStageResize({ stageRef });
  // const { handleZoom, handleDragMoveStage } = useStageResize({ stageRef });

  useEffect(() => {
    const fontsToLoad = stageObjects
      .filter((obj) => obj.data.type === StageObjectType.TEXT && obj.data.webFont)
      .map((obj) => obj.data.fontFamily);

    if (fontsToLoad.length) loadGoogleFontsDefaultVariants(fontsToLoad);

    resetObjectSelect();
  }, []);

  useEffect(() => {
    const content = stage.content;
    resetObjectSelect();
    if (JSON.stringify(content) === JSON.stringify(stageObjects)) {
      return;
    }
    if (content === null || content === undefined || content === '""' || !content.length) {
      resetAll();
      return;
    }

    replaceAll(content as StageObject[]);
  }, [stage.id, stage.content]);

  // resize stage
  useEffect(() => {
    const parentElem: HTMLElement | null = document.querySelector('#frame-box');
    if (parentElem) {
      console.log('resize', parentElem.offsetWidth, parentElem.offsetHeight);
      dispatch(
        setSize({
          width: parentElem.offsetWidth,
          height: parentElem.offsetHeight,
        }),
      );
    }
  }, [scale]);

  const checkDeselect = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      resetObjectSelect();
    }
  };

  const sortStageObject = () => {
    return stageObjects.sort((obj1, obj2) => {
      if (obj1.data.z_index === obj2.data.z_index) {
        if (obj1.data.z_index < 0) {
          return obj2.data.updatedAt - obj1.data.updatedAt;
        }
        return obj1.data.updatedAt - obj2.data.updatedAt;
      }
      return obj1.data.z_index - obj2.data.z_index;
    });
  };

  const renderStageObject = (obj: StageObject) => {
    const data = obj.data;
    switch (data.type) {
      case StageObjectType.IMAGE:
        return <ImageObject onSelect={onObjectSelect} obj={obj} />;
      case StageObjectType.TEXT:
        return <TextObject onSelect={onObjectSelect} shapeProps={obj as StageTextObjectData} />;
      case StageObjectType.SHAPE:
        return <ShapeObject onSelect={onObjectSelect} obj={obj} />;
      default:
        return null;
    }
  };

  return (
    <Box className="box-frame" overflow="hidden" maxW={boxWidth * 2} maxH={boxHeight * 2}>
      <Stage
        width={width * scale}
        height={height * scale}
        style={{ backgroundColor: 'white' }}
        scaleX={scale}
        scaleY={scale}
        draggable={true}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onWheel={handleZoom}
        onDragMove={handleDragMoveStage}
      >
        <Grid width={width} height={height} scale={scale} />
        <Layer>
          {sortStageObject().map((obj) => (
            <React.Fragment key={obj.id}>{renderStageObject(obj)}</React.Fragment>
          ))}
          <Transformer ref={imageTransformer} onTransformEnd={onImageTransformerEnd} ignoreStroke={true} />
          <Transformer
            ref={textTransformer}
            onTransformEnd={onTextTransformerEnd}
            rotationSnaps={[0, 90, 180, 270]}
            rotateEnabled={true}
            enabledAnchors={['middle-left', 'middle-right']}
            boundBoxFunc={(_oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
          />
          <Transformer
            ref={multiTransformer}
            onTransformEnd={onMultiTransformerEnd}
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            boundBoxFunc={(_oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
            ignoreStroke={true}
          />
        </Layer>
      </Stage>
    </Box>
  );
};

export default Frame;
