import {
  Box,
  Stack,
  Flex,
  Container,
  Heading,
  Center,
  Divider,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import Navbar from '../navbar'
import AddChildModal from './components/add_child_modal';
import { useState } from 'react'
import DocumentDrawer from './components/document_drawer';
import { useDocContext } from '../../contexts/DocumentContext';
import ChildCard from "./components/child_card"
import MakeRelations from './components/make_realtions';

export default function SozioMaker() {
  const [ modal, showModal ] = useState(false)
  const [ makeRelations, showmakeRelations ] = useState(false)
  const [ openDrawer, setOpenDrawer ] = useState(false)
  const { getDocuments, currentDocument, updateDocument } = useDocContext();

  function onModalClose(data) {
    showModal(false)
    console.log(currentDocument)
    if (data) {
      data.id = currentDocument.rw_data.Childs.length + 1
      currentDocument.rw_data.Childs.push(data)
      updateDocument(currentDocument);
    }
  }

  function onShowModal() {
    showModal(true)
  }

  function onClick(e) {
    console.log(e)
    onOpenModalRelation();
  }

  function onDocumentDrawerClose() {
    setOpenDrawer(false)
  }

  function onOpenDrawerClick() {
    setOpenDrawer(true)
  }

  function onOpenModalRelation() {
    showmakeRelations(true)
  }

  function onRelationClose() {
    showmakeRelations(false)
  }

  return (
      <Box>
        <Navbar />    
        <Container maxW="container.xl" paddingStart={0} paddingEnd={0} marginStart={0} marginEnd={0} maxWidth={"full"}>

          <Flex
            h="93vh"
          >
            <Stack w={"25%"} h={"full"} bg={useColorModeValue('gray.200', 'gray.800')} minW={"300px"}>
              <Center>
                <Heading marginTop={"5px"} onClick={() => onOpenDrawerClick()}>Kinder</Heading>
              </Center>
              <Center>
                <Divider borderColor={"gray.500"} orientation='horizontal' m={"0 auto"} w={"90%"}/>
              </Center>
              <Stack overflow={"auto"}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    margin: '2px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                    margin: '2px',
                    boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: "teal",
                    borderRadius: '50px',
                  },
                }}>
                {currentDocument?.rw_data?.Childs?.map(child => {
                  return (
                    <Center key={child.id}>
                      <ChildCard 
                        key={child.id} 
                        data={child}
                        onClick={onClick}
                      />
                    </Center>
                  )
                })}
              </Stack>
            </Stack>
            <Stack w={"full"} h={"full"}>
            <IconButton 
                aria-label='Kind hinzufügen' 
                icon={<AddIcon />} 
                borderRadius={"100px"}
                w={"25px"} 
                colorScheme={"teal"}
                onClick={() => onShowModal()}
                boxShadow={'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}
                zIndex={"2"}  
                position={"fixed"}
                m={"25px"}
                top={"90%"}
              />
            </Stack>
          </Flex>
        </Container>
        
        {modal && <AddChildModal onClose={(data) => onModalClose(data)} isOpen={modal}/>}
        {makeRelations && <MakeRelations onClose={() => onRelationClose()} isOpen={makeRelations} />}
        {(openDrawer || !currentDocument ) && <DocumentDrawer isOpen={(openDrawer || !currentDocument )} onClose={onDocumentDrawerClose} data={getDocuments()}/>}
      </Box>
  );
}
