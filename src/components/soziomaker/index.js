import {
  Box,
  Text,
  VStack,
  Stack,
  Flex,
  Container
} from '@chakra-ui/react';
import Navbar from '../landing_page/navbar'
import Add_Child_Modal from './add_child_modal';

export default function SozioMaker() {
  return (
    <Box>
      <Navbar />
    
      <Container maxW="container.xl" paddingStart={0} paddingEnd={0} marginStart={0} marginEnd={0} maxWidth={"full"}>
        <Flex
          h="100vh"
        >
          <Stack w={"25%"} h={"full"} bg={"gray.200"} >
            <Add_Child_Modal onClose={(data) => console.log(data)} />
          </Stack>
          <Stack w={"full"} h={"full"} p={10}>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
