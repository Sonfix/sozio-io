import { 
    Table,
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    chakra,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    IconButton,
    Tooltip,
    Divider,
    ButtonGroup
 } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useRef } from "react";
import VotingElement from './voting_element';

import { useDocContext } from "../../../contexts/DocumentContext"

export default function MakeRelations(props) {

    const { currentDocument } = useDocContext();

    function save() {

    }

    function close() {
        props?.onClose();
    }

    const head = () => {
        return (                        
            currentDocument.rw_data.Childs.map(child => {
                return (<Th key={child.id} textAlign={"center"}>
                    <chakra.span >
                        {child.name}
                    </chakra.span>
                </Th>)
            })
        )
    }

    const createVotingRow = (idx) => {
        let col = 0;
        return (
            currentDocument.rw_data.Childs.map(child => {
                if (idx != col++)
                    return (
                        <VotingElement col={col} row={idx}/>
                    )
                else
                    return (
                        <Td><Divider borderColor={"grey"} borderBottomStyle={"dashed"}/></Td>
                    )
            })  
        );
    }

    const body = () => {
        let cnt = 0;
        return (
            currentDocument.rw_data.Childs.map(child => {
                return (
                <Tr key={child.id}>
                    <Td textAlign={"center"}>
                        <chakra.span >
                            {child.name}
                        </chakra.span>
                    </Td>
                    {createVotingRow(cnt++)}
                </Tr>)
            })
        )
    }

    return (
      <>
 
        <Modal
          isOpen={props?.isOpen}
          onClose={() => close(null)}
        >
          <ModalOverlay />
          <ModalContent
           w={"60vw"}
           maxW={"75vw"}
          >
            <ModalHeader>Es wird zeit die Kinder in Beziehung zu setzen</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

            </ModalBody>
            <Table m={"0 auto"}>
                <Thead>
                    <Tr>
                        <Th></Th>
                        {head()}
                    </Tr>
                </Thead>
                <Tbody>
                    {body()}
                </Tbody>
            </Table>
            <ModalFooter>
              <Button colorScheme='teal' mr={3} onClick={() => save()}>
                Speichern
              </Button>
              <Button onClick={() => close(null)}>Abbrechen</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}