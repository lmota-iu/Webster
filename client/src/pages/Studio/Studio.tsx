import { Flex, Center, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import Frame from './Frame/Frame';
import Navbar from './Navbar/Navbar';
import Toolbar from './Toolbar';
import EditingToolbar from './EditingToolbar/EditingToolbar';
import { NAVBAR_HEIGHT, EDITING_TOOLBAR_HEIGHT, FRAME_CONTAINER_PADDING } from '~/consts/components';
import CADToolbar from './CADToolbar/CADToolbar';
import { useAppSelector } from '~/hooks/use-app-selector';

const Studio = () => {
  const stageRef = React.useRef<Konva.Stage>(null);

  const [navbarHeight, setNavbarHeight] = useState(NAVBAR_HEIGHT);
  const [editingToolbarHeight, setEditingToolbarHeight] = useState(EDITING_TOOLBAR_HEIGHT);
  const [frameToolClass, setFrameToolClass] = useState<string | null>(null);

  const { toolSelected } = useAppSelector((state) => state.cadTools);

  useEffect(() => {
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    const editingToolbar = document.querySelector('#editing_toolbar') as HTMLElement;
    if (editingToolbar) {
      setEditingToolbarHeight(editingToolbar.offsetHeight);
    }
  }, []);

  useEffect(() : void => {
    setFrameToolClass(toolSelected ? `selected-tool-${toolSelected}` : "selected-tool-select")
  }, [toolSelected]);

  return (
    <Box maxH="100vh">
      <Navbar />
      <Flex h={`calc(100vh - ${navbarHeight}px)`} w="100%">
        <Toolbar stageRef={stageRef} />

        <Box flexGrow="1" ml={'53'}>
          <EditingToolbar />
          <Center
            className={`${frameToolClass}`}
            id="frame-container"
            h={`calc(100vh - ${navbarHeight}px - ${editingToolbarHeight}px)`}
            bgColor="gray.200"
            padding={`${FRAME_CONTAINER_PADDING}px`}
          >
            <Frame stageRef={stageRef} />
          </Center>
          <CADToolbar />
          {/* <CADToolbar stageRef={stageRef} /> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Studio;
