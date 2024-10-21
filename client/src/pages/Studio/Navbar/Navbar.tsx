import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuList, Spacer, HStack, Text, VStack } from '@chakra-ui/react';
import { Avatar, Dropdown, Navbar as NavBar } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGO_FONT } from '~/consts/components';
import { useAppSelector } from '~/hooks/use-app-selector';
import { logout } from '~/store/slices/auth-slice';
import CanvasCreate from '../canvas-actions/CanvasCreate';
import { useEffect } from 'react';
import CanvasesView from '../canvas-actions/CanvasesView';
import CanvasUpdate from '../canvas-actions/CanvasUpdate';
import { useLazyGetCanvasQuery } from '~/store/api/canvas-slice';
import { resetStage, setStage } from '~/store/slices/frame-slice';

function Navbar() {
  const dispatch = useDispatch();
  const { stage } = useAppSelector((state) => state.frame);
  const { isLoggedIn, username, email } = useAppSelector((state) => state.auth);
  const { id, name } = stage;
  const [getStage] = useLazyGetCanvasQuery();

  useEffect(() => {
    if (!isLoggedIn || !id) {
      dispatch(resetStage());
      return;
    }

    getStage(id)
      .unwrap()
      .then((stage) => dispatch(setStage({ ...stage })))
      .catch((err) => console.error(err));
  }, [isLoggedIn, id]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  function getInitials(): string {
    if (!username) return '';
    console.log(username);

    return username?.charAt(0).toUpperCase();
    // const [firstName, lastName] = username?.split(' ')
    // console.log(firstName, lastName)
    // return `${firstName?.charAt(0)} ${lastName?.charAt(0)}`
  }

  const render = 'old';
  return render === 'old' ? (
    <Flex bgGradient="linear(to-r, pink.500, purple.500)" py="2" align="center" id="navbar">
      <Box>
        <Heading
          fontSize="28px"
          fontWeight="400"
          userSelect="none"
          color="white"
          ml="20px"
          mb="0"
          fontFamily={LOGO_FONT}
        >
          Webster
        </Heading>
      </Box>
      <Spacer />
      <HStack sx={{ pr: 4 }} spacing={4}>
        {isLoggedIn ? (
          <>
            <Box>
              <Text display="inline" fontSize="15px" fontWeight="500" color="white" pr="2">
                {id && name ? 'Current Canvas:' : 'No canvas selected'}
              </Text>
              {id && name && (
                <Text display="inline" fontSize="16px" fontWeight="600" color="white">
                  {name}
                </Text>
              )}
            </Box>
            <Box>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Canvas Actions
                </MenuButton>
                <MenuList>
                  <VStack spacing={4} sx={{ px: 4 }}>
                    <CanvasCreate />
                    {id && <CanvasUpdate />}
                    <CanvasesView />
                  </VStack>
                </MenuList>
              </Menu>
            </Box>
            <Button colorScheme="gray" mr="4" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button colorScheme="gray" mr="4" as={Link} to="/auth/sign-in">
            Login
          </Button>
        )}
      </HStack>
    </Flex>
  ) : (
    <NavBar fluid rounded={true}>
      {/* LOGO */}
      <NavBar.Brand href="/">
        <img src="/LOGOTIPO_SEM_MARGENS.svg" className="h-6 mr-3 sm:h-9" alt="Imagem Urbana Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ACE</span>
      </NavBar.Brand>

      {/* NAVBAR ACTIONS */}
      {isLoggedIn ? (
        <>
          <div className="flex md:order-2">
            <Dropdown arrowIcon={true} inline label={'Canvas actions'}>
              <CanvasCreate />
              {id && <CanvasUpdate />}
              <CanvasesView />
            </Dropdown>
            <NavBar.Toggle />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  placeholderInitials={getInitials()}
                  rounded
                  alt="User settings"
                  // img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{username}</span>
                <span className="block truncate text-sm font-medium">{email}</span>
              </Dropdown.Header>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <NavBar.Toggle />
          </div>
        </>
      ) : (
        <NavBar.Link href="/auth/sign-in">Login</NavBar.Link>
      )}
    </NavBar>
  );

  // return (

  // );
}

export default Navbar;
