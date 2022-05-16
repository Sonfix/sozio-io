import {
  Box,
  Text,
  VStack,
  Stack,
  Flex,
  Container,
  Button,
  Heading,
  Center,
  Divider
} from '@chakra-ui/react';
import Navbar from '../landing_page/navbar'
import Add_Child_Modal from './add_child_modal';
import { useState } from 'react'

export default function SozioMaker() {
  const [ modal, showModal ] = useState(false)

  function onModalClose(data) {
    showModal(false)
    console.log(data)
  }

  function onShowModal() {
    showModal(true)
  }

  return (
    <Box>
      <Navbar />    
      <Container maxW="container.xl" paddingStart={0} paddingEnd={0} marginStart={0} marginEnd={0} maxWidth={"full"}>
        <Flex
          h="93vh"
        >
          <Stack w={"25%"} h={"full"} bg={"gray.200"} >
            <Center>
              <Heading marginTop={"5px"}>Kinder</Heading>
            </Center>
            <Center>
              <Divider borderColor={"gray.500"} orientation='horizontal' m={"0 auto"} w={"90%"}/>
            </Center>
            {/* <Button onClick={() => onShowModal()}>Test</Button> */}
            <Flex
              flexDir={"row"}
              justifyContent={"space-between"}
            >

            </Flex>
          </Stack>
          <Stack w={"full"} h={"full"} p={10}>
          </Stack>
        </Flex>
      </Container>
      
      {modal && <Add_Child_Modal onClose={(data) => onModalClose(data)} isOpen={modal}/> }
    </Box>
  );
}
