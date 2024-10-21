import Konva from 'konva';
import { Sidebar, Drawer } from 'flowbite-react';
import { ReactNode, useState } from 'react';
import Export from '~/pages/Studio/tools/Export';
import ImageUpload from '~/pages/Studio/tools/ImageUpload/ImageUpload';
import Images from '~/pages/Studio/tools/Images/Images';
import Resize from '~/pages/Studio/tools/Resize';
import Shapes from '~/pages/Studio/tools/Shapes/Shapes';
import Texts from '~/pages/Studio/tools/Text/Texts';
import HotkeysList from '~/pages/Studio/tools/Hotkeys/Hotkeys';
import { TOOLBAR_TABS } from '~/consts/components';

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
};

const Toolbar = ({ stageRef }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sidebarOpt, setSidebarOpt] = useState<string>();
  const handleClose = () => setIsOpen(false);

  function handleClick(optName: string) {
    setIsOpen(true);
    setSidebarOpt(optName);
  }

  function renderSideBarOptions(): ReactNode {
    switch (sidebarOpt) {
      case 'Export':
        return <Export stageRef={stageRef} />;
      case 'ImageUpload':
        return <ImageUpload />;
      case 'Images':
        return <Images />;
      case 'Resize':
        return <Resize />;
      case 'Shapes':
        return <Shapes />;
      case 'Texts':
        return <Texts />;
      case 'HotkeysList':
        return <HotkeysList />;
      default:
        return null;
    }
  }

  return (
    <>
      <Sidebar
        aria-label="Default sidebar example"
        style={{
          maxWidth: '35px',
          padding: '0',
        }}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {TOOLBAR_TABS.map((tab, i) => (
              <Sidebar.Item
                key={i}
                /*icon={tab.icon}*/ onClick={() => {
                  handleClick(tab.title);
                }}
              >
                {/* {tab.title} */}
                <tab.icon />
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Drawer open={isOpen} onClose={handleClose}>
        {renderSideBarOptions()}
      </Drawer>
    </>
  );
};

{
  /* <TabPanels minW="350px" maxW="350px" bgColor="white" overflowY="auto">
        <TabPanel>
          <Resize />
        </TabPanel>
        <TabPanel>
          <Export stageRef={stageRef} />
        </TabPanel>
        <TabPanel p="0" h="100%" overflow="hidden">
          <Images />
        </TabPanel>
        <TabPanel>
          <ImageUpload />
        </TabPanel>
        <TabPanel p="0" h="100%" overflow="hidden">
          <Texts />
        </TabPanel>
        <TabPanel>
          <Shapes />
        </TabPanel>
        <TabPanel>
          <HotkeysList />
        </TabPanel>
      </TabPanels> */
}

export default Toolbar;
