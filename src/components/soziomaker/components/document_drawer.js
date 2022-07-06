import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    Text,
    HStack
} from '@chakra-ui/react'
import DocumentCard from './document_card';
import { useDocContext } from '../../../contexts/DocumentContext';

export default function DocumentDrawer(props) {

    const { createDocument, deleteDocument } = useDocContext();

    function onClose() {
      props?.onClose()
    }

    function onNew() {
      createDocument();
      onClose();
    }

    function onDeleteDocument(id) {
      deleteDocument(id)
    }

    let cnt = 0;
    return (
        <Drawer
            isOpen={props?.isOpen}
            onClose={() => onClose()}
            placement={"top"}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
            <DrawerHeader>
                Deine Dokumente
                {props?.documents?.title.length && <Input placeholder='Suchst du ein bestimmtes?' w={"250px"} marginLeft={"25px"}/>}
            </DrawerHeader>

          <DrawerBody>
            <HStack>
              {props?.data?.length && 
              props?.data.map(doc => {
                      return (
                        <DocumentCard key={cnt} data={doc} id={cnt++} onClick={onClose} deleteDocument={onDeleteDocument}/>
                      )
                  })              
              }
              {!props?.data?.length && <Text>Noch ist nichts hier. Lege doch schnell ein neues Dokument an!</Text>}
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='teal' mr={3} onClick={() => onNew()}>Neu</Button>
            <Button variant='outline'  onClick={onClose}>
              Abbrechen
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
}