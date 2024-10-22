// import React from 'react';
// import Konva from 'konva';
import { Box, Button, Icon, Divider, VStack } from '@chakra-ui/react';
import { CAD_TOOLBAR_BTNS } from '~/consts/components';
import { useAppSelector } from '~/hooks/use-app-selector';
import { cadToolsActions } from '~/store/slices/cad-tools-slice';
import { useDispatch } from 'react-redux';
import '~/styles/components/cad-toobar.css';

type ToolButton = {
  name: string;
  icon: any;
  title: string;
};

// type IProps = {
//   stageRef: React.RefObject<Konva.Stage> | null;
// };
// const CADToolbar = ({ stageRef }: IProps) => {
const CADToolbar = () => {
  const dispatch = useDispatch();
  const { toolSelected } = useAppSelector((state) => state.cadTools);

  function handleClick(toolName: string): void {
    console.log('tool selected ->', toolName);
    dispatch(cadToolsActions.setTool(toolName));
  }

  function addBorderRadius(iSection: number, iBtn: number): string {
    if (iSection === 0 && iBtn === 0) {
      console.log(iSection, iBtn);
      return '5 0 0 5';
    }
    if (iSection === 0 && iBtn === 1) {
      console.log(iSection, iBtn);
      return '0 5 5 0';
    }
    return '0';
  }

  return (
    <Box className="cad-toolbar">
      {CAD_TOOLBAR_BTNS.map((section: ToolButton[], iSection: number) => {
        return (
          <div key={`wrapper-${iSection}`} style={{ display: 'inline-flex' }}>
            <VStack spacing={0}>
              {section.map((btn: ToolButton, iBtn: number) => (
                <Button
                  bg="white"
                  key={`${btn.name}`}
                  onClick={() => handleClick(btn.name)}
                  isActive={toolSelected === btn.name}
                  borderRadius={addBorderRadius(iSection, iBtn)}
                >
                  <Icon as={btn.icon} />
                </Button>
              ))}
            </VStack>
            {iSection < section.length - 1 && <Divider orientation="vertical" color={'gray.300'} />}
          </div>
        );
      })}
    </Box>
  );
};

export default CADToolbar;

{
  /* <VStack spacing={0}>
        <Button bg="white" borderRadius="5 0 0 5" >
          <Icon as={LuMousePointer2} />
        </Button>
        <Button  borderRadius="0 5 5 0">
          <Icon as={SlCursorMove} />
        </Button>
      </VStack>
      <Divider orientation='vertical'height={"80px"}/>
      <VStack spacing={0}>
        <Button borderRadius="5 0 0 5">
          <Icon as={Wall} />
        </Button>
        <Button  borderRadius="0 5 5 0">
          <Icon as={Area} />
        </Button>
      </VStack> */
}
