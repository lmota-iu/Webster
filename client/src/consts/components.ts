import {
  HiOutlineArrowsExpand,
  HiOutlineCloudUpload,
  HiOutlineCube,
  HiOutlineDownload,
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlineTranslate,
  // drawing tool icons
} from 'react-icons/hi';
import { LuMousePointer2 } from 'react-icons/lu';
import { PiWallLight } from 'react-icons/pi';


export const TOOLBAR_TABS = [
  { icon: HiOutlineArrowsExpand, title: 'Resize' },
  { icon: HiOutlineDownload, title: 'Export' },
  { icon: HiOutlinePhotograph, title: 'Images' },
  { icon: HiOutlineCloudUpload, title: 'Upload' },
  { icon: HiOutlineTranslate, title: 'Text' },
  { icon: HiOutlineCube, title: 'Shapes' },
  { icon: HiOutlineInformationCircle, title: 'Hotkeys' },
];

export const DRAWINGTOOLBAR_TABS = [
  { icon: LuMousePointer2, title: 'Select', name: 'select' },
  { icon: PiWallLight, title: 'Draw wall', name: 'wall' },
];

export const NAVBAR_HEIGHT = 56;
export const EDITING_TOOLBAR_HEIGHT = 50;
export const DRAWING_TOOLBAR_HEIGHT = 20;
export const FRAME_CONTAINER_PADDING = 3;
export const LOGO_FONT = '"Reem Kufi Fun", sans-serif';
