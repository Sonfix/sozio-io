import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Img,
} from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {useAuth} from "../contexts/AuthContext"
import ColorModeSwitcher from "../ColorModeSwitcher"

const Links = [
  {
    desc: "Home",
    lk: "/",
    key: "1"
  },
  {
    desc: "About",
    lk:"/about",
    key: "2"
  }
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('teal.200', 'teal.700'),
    }}
    href={children.lk}>
    {children.desc}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
 
  const { logout, currentUser } = useAuth();

  return (
    <>
      <Box bg={useColorModeValue('teal.400', 'teal.600')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>                
              <Img
                boxSize='50px'
                src={'logo512.png'}
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.key}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {currentUser && 
            <Flex alignItems={'center'}>
              <ColorModeSwitcher />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => logout()}>Ausloggen</MenuItem>
                </MenuList>
              </Menu>
            </Flex>}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}