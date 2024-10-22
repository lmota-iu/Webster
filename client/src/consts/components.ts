import {
  HiOutlineArrowsExpand,
  HiOutlineCloudUpload,
  HiOutlineCube,
  HiOutlineDownload,
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlineTranslate,
} from 'react-icons/hi';
import { LuMousePointer2 } from 'react-icons/lu';
import { SlCursorMove } from 'react-icons/sl';
import { Area, Wall } from '~/utils/custom-icons';

export const TOOLBAR_TABS = [
  { icon: HiOutlineArrowsExpand, title: 'Resize' },
  { icon: HiOutlineDownload, title: 'Export' },
  { icon: HiOutlinePhotograph, title: 'Images' },
  { icon: HiOutlineCloudUpload, title: 'Upload' },
  { icon: HiOutlineTranslate, title: 'Text' },
  // { icon: HiOutlineCube, title: 'Shapes' },
  { icon: HiOutlineCube, title: 'Draw' },
  { icon: HiOutlineInformationCircle, title: 'Hotkeys' },
];

export const CAD_TOOLBAR_BTNS = [
  [
    { icon: LuMousePointer2, name: 'select', title: 'Wall' },
    { icon: SlCursorMove, name: 'pan', title: 'Pan' },
  ],
  [
    { icon: Wall, name: 'wall', title: 'Wall' },
    { icon: Area, name: 'area', title: 'Area' },
  ],
];

export const NAVBAR_HEIGHT = 56;
export const EDITING_TOOLBAR_HEIGHT = 50;
export const FRAME_CONTAINER_PADDING = 5;
export const LOGO_FONT = '"Reem Kufi Fun", sans-serif';
