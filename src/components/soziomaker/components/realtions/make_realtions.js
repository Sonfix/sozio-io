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
    Divider,
 } from '@chakra-ui/react'
import React from "react";
import VotingElement from './voting_element';

import { useDocContext } from "../../../../contexts/DocumentContext"

export default function MakeRelations(props) {

    const { currentDocument, updateDocument } = useDocContext();

    function save() {
        close();
    }

    function close() {
        props?.onClose();
    }

    const head = () => {
        return (                        
            currentDocument.getDataByKey("rw_data").Childs.map(child => {
                return (<Th key={child.id} textAlign={"center"}>
                    <chakra.span>
                        {child.name}
                    </chakra.span>
                </Th>)
            })
        )
    }

    const getChildIdByIndex = (idx) => {
        return currentDocument.getDataByKey("rw_data").Childs[idx].id
    }

    const getRelationByChildId = (id) => {
        for (let index = 0; index < currentDocument.getDataByKey("rw_data").Relations.length; index++) {
            const element = currentDocument.getDataByKey("rw_data").Relations[index];
            if (element.ChildId === id) {
                return element;
            }
        }
        
        return null;
    }

    const setRealtion = (rel, childId, state) => {
        let aff = rel.affected.indexOf(childId);
        let ave = rel.aversion.indexOf(childId);
        if (state === "Neutral") {
            if (aff > -1)
                rel.affected.splice(aff, 1)
            if (ave > -1)
                rel.aversion.splice(ave, 1)
        }
        else if (state === "Zuneigung") {
            if (aff === -1)
                rel.affected.push(childId)
            if (ave > -1)
                rel.aversion.splice(ave, 1)
        }
        else if (state === "Abneigung") {
            if (aff > -1)
                rel.affected.splice(aff, 1)
            if (ave === -1)
                rel.aversion.push(childId)
        }
        return rel
    }

    const updateRelation = (rel, existing) => {
        if (!existing) {
            currentDocument.getDataByKey("rw_data").Relations.push(rel);  
        }
        else {
            currentDocument.getDataByKey("rw_data").Relations.forEach(r => {
                if (r.ChildId === rel.ChildId) {
                    r.affected = [...rel.affected]
                    r.aversion = [...rel.aversion]
                }
            });    
        }
        updateDocument(currentDocument);
    }

    // col is the destination child, row the source
    const onVotingElementClicked = (col, row, selected) => {
        let dest = getChildIdByIndex(col);
        let source = getChildIdByIndex(row);
        
        let relation
        let exists = false;
        currentDocument.getDataByKey("rw_data").Relations.forEach(rel => {
            if (rel.ChildId === source) {
                relation = rel
                exists = true
            }
        });

        if (!relation)
         relation = {
             ChildId: source,
             affected: [],
             aversion: []

         }
         
        relation = setRealtion(relation, dest, selected);
        updateRelation(relation, exists);
    }

    const createVotingRow = (row) => {
        let col = 0;
        return (
            currentDocument.getDataByKey("rw_data").Childs.map(child => {
                
                // get relation data from childs row
                let source = getChildIdByIndex(row);
                let relData = getRelationByChildId(source);

                let selected = "Neutral"
                if (relData) {
                    if (relData.affected.indexOf(child.id) > -1)
                        selected = "Zuneigung"
                    if (relData.aversion.indexOf(child.id) > -1)
                        selected = "Abneigung"
                }

                if (row !== col++)
                    return (
                        <VotingElement col={col - 1} row={row} callback={onVotingElementClicked} selected={selected} key={`${row}${col*10}`}/>
                    )
                else
                    return (
                        <Td><Divider m={"0 auto"} borderColor={"grey"} borderBottomStyle={"dashed"} w={"60%"} /></Td>
                    )
            })  
        );
    }

    const body = () => {
        let cnt = 0;
        return (
            currentDocument.getDataByKey("rw_data").Childs.map(child => {
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
                <Table m={"0 auto"} size={"md"}>
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
            </ModalBody>
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