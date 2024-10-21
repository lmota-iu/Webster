// import { HStack, Icon, IconButton, Spacer, ButtonGroup, Button, Tooltip } from '@chakra-ui/react';
import { Button } from 'flowbite-react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import { DRAWINGTOOLBAR_TABS, DRAWING_TOOLBAR_HEIGHT } from '~/consts/components';
import { KeyType } from '~/consts/keys';
import { useAppSelector } from '~/hooks/use-app-selector';
import useHistory from '~/hooks/use-history';
import useStageResize from '~/hooks/use-stage-resize';
import { stageObjectSelector } from '~/store/slices/stage-object-slice';
import { StageObjectType } from '~/types/stage-object';
import { selectedObjectActions } from '~/store/slices/drawing-tools-slice';
import '../../../styles/components/drawingtoolbar.css';

const DrawingToolBar = () => {
  const dispatch = useDispatch();
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);
  const { selected } = useAppSelector((state) => state.selected);
  const { toolSelected } = useAppSelector((state) => state.tool);
  // console.log(stageObjects)
  // console.log(selected)

  const handleOnClick = (toolName: string) => {
    console.log('tool selected ->', toolName);
    dispatch(selectedObjectActions.setTool(toolName));
  };

  return (
    <div className="floating-toolbar flex flex-wrap gap-2">
      <Button.Group>
        {DRAWINGTOOLBAR_TABS.map((tool, i) => (
          <Button
            key={`drawing-tool-${i}`}
            aria-label={tool.title}
            style={{ flexGrow: 1 }}
            color="gray"
            onClick={() => handleOnClick(tool.name)}
          >
            <tool.icon />
          </Button>
        ))}
      </Button.Group>
    </div>
  );
};

export default DrawingToolBar;
