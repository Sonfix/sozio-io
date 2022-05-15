import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure
  } from '@chakra-ui/react'
  import React, { useRef } from "react";


export default function Add_Child_Modal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const name = useRef();
    const age = useRef();
    const gender = useRef();

    function save() {
        const obj = {
            name: name,
            age: age,
            gender: gender
        }
        onClose(obj)
    }

    function Close(data) {
        props?.onClose(data);
        onClose()
    }

    return (
      <>
 
        <Modal
          initialFocusRef={props?.initialRef}
          finalFocusRef={props?.finalRef}
          isOpen={isOpen}
          onClose={() => save()}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bitte gib die Daten des Kindes ein</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input inputRef={name} placeholder='Name' />
                </FormControl>
  
                <FormControl mt={4}>
                    <FormLabel>Alter</FormLabel>
                    <Input inputRef={age} placeholder='Alter' />
                </FormControl>
  
                <FormControl mt={4}>
                    <FormLabel>Geschlecht</FormLabel>
                    <Input inputRef={gender} placeholder='Geschlecht' />
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='teal' mr={3} onClick={() => save()}>
                Speichern
              </Button>
              <Button onClick={() => Close(null)}>Abbrechen</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }