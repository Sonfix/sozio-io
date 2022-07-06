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
import { AddIcon, LinkIcon } from '@chakra-ui/icons'
import Navbar from '../navbar'
import AddChildModal from './components/add_child_modal';
import { useState } from 'react'
import DocumentDrawer from './components/document_drawer';
import { useDocContext } from '../../contexts/DocumentContext';
import ChildCard from "./components/child_card"
import MakeRelations from './components/realtions/make_realtions';
import { FaWindowRestore } from 'react-icons/fa';
import SozioGramm from './components/graphical';
import CurrentDocumentCard from "./components/current_document_card"
import ExportModalSelect from "./components/export/export_modal_select"
import ExportHandler from './components/export/export_handler';

export default function SozioMaker() {
  const [ modal, showModal ] = useState(false)
  const [ modalData, setModalData ] = useState( );
  const [ makeRelations, showmakeRelations ] = useState(false)
  const [ openDrawer, setOpenDrawer ] = useState(false)
  const [ openExport, setOpenExport ] = useState(false)

  const { getDocuments, currentDocument, updateDocument } = useDocContext();


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function onModalClose(data) {
    showModal(false)

    if (data) {
      if (data.id === -1) {
        data.id = currentDocument.getDataByKey("rw_data").Childs.length + 1
        data.color = getRandomColor();
        currentDocument.getDataByKey("rw_data").Childs.push(data)
      }
      else {
        currentDocument.getDataByKey("rw_data").Childs.forEach(child => {
          if (child.id === data.id) {
           child.name = data.name;
           child.age = data.age;
           child.gender = data.gender;
           if (!child.color)
            child.color = getRandomColor()
          }
        });
      }
      updateDocument(currentDocument);
    }
  }

  function onShowModal() {
    showModal(true)
  }

  function onClick(child) {
    console.log("Card clicked")
    setModalData(child)
    showModal(true)
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

  function setSVGData(svg) {
    if (!currentDocument  || !currentDocument.getDataByKey("rw_data"))
      return;
    currentDocument.getDataByKey("rw_data").svg = svg.outerHTML;
    updateDocument(currentDocument)
  }

  function startSaving() {
    setOpenExport(true)
  }

  function onExportTypeSelected(type, ref) {
    if (!type)
      setOpenExport(false)
    // hand data to export handler
    console.log(currentDocument)
    ExportHandler(currentDocument, type, onSavingDone);
  }

  function onSavingDone(error) {
    console.log("Done")
    if (error > 1) {
      console.log(error)
    }
    setOpenExport(false)
  }

  function onChildDelete(child) {
    // getting index of child
      const getChildIndex = (doc, id) => {
        for (let index = 0; index < doc.getDataByKey("rw_data").Childs.length; index++) {
            const element = doc.getDataByKey("rw_data").Childs[index];
            if (element.id === id) {
                return index;
            }
        }
        
        return -1;
    }
    const index = getChildIndex(currentDocument, child)
    if (index >= 0) {
        let oData = currentDocument.getDataByKey("rw_data");
        oData.Childs.splice(index)
        currentDocument.updateData("rw_data", oData)
    }
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
                <Heading marginTop={"5px"} onClick={() => console.log(currentDocument)}>Kinder</Heading>
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
                {currentDocument?.getDataByKey("rw_data")?.Childs?.map(child => {
                  return (
                    <Center key={child.id}>
                      <ChildCard 
                        key={child.id} 
                        data={child}
                        onClick={() => onClick(child)}
                        DeleteClicked={onChildDelete}
                      />
                    </Center>
                  )
                })}
              </Stack>
            </Stack>
            <Box w={"full"} h={"full"}>
            {currentDocument && <CurrentDocumentCard data={currentDocument} onClick={startSaving}/>}
            <SozioGramm data={currentDocument} setSVGData={setSVGData}/>
              <Stack
                top={"80%"}
                zIndex={"2"}
                position={"fixed"}
                m={"25px"}
              >
              <IconButton 
                  aria-label='Dokumenten ablage' 
                  icon={<FaWindowRestore />} 
                  borderRadius={"100px"}
                  size={"sm"} 
                  colorScheme={"teal"}
                  onClick={() => onOpenDrawerClick()}
                  boxShadow={'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}
                />
              <IconButton 
                  aria-label='Soziomatrix' 
                  icon={<LinkIcon />} 
                  borderRadius={"100px"}
                  size={"sm"} 
                  colorScheme={"teal"}
                  onClick={() => onOpenModalRelation()}
                  boxShadow={'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}
                />
              <IconButton 
                  aria-label='Kind hinzufügen' 
                  icon={<AddIcon />} 
                  borderRadius={"100px"}
                  size={"lg"} 
                  colorScheme={"teal"}
                  onClick={() => onShowModal()}
                  boxShadow={'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}
                />
              </Stack>
            </Box>
          </Flex>
        </Container>
        
        {modal && <AddChildModal onClose={(data) => onModalClose(data)} isOpen={modal} data={modalData} />}
        {makeRelations && <MakeRelations onClose={() => onRelationClose()} isOpen={makeRelations} />}
        {(openDrawer || !currentDocument ) && <DocumentDrawer isOpen={(openDrawer || !currentDocument )} onClose={onDocumentDrawerClose} data={getDocuments()}/>}
        {openExport && <ExportModalSelect isOpen={openExport} onClose={onExportTypeSelected} />}
        
      </Box>
  );
}
