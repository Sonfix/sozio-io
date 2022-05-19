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
    NumberInput,
    NumberInputField,
    Select
  } from '@chakra-ui/react'
import React, { useRef } from "react";

export default function AddChildModal(props) {

    const name = useRef();
    const age = useRef();
    const gender = useRef();

    function save() {
        const obj = {
            name: name.current.value,
            age: age.current.value,
            gender: gender.current.value  
        }
        close(obj)
    }

    function close(data) {
        props?.onClose(data);
    }

    return (
      <>
 
        <Modal
          isOpen={props?.isOpen}
          onClose={() => close(null)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bitte gib die Daten des Kindes ein</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input ref={name} placeholder='Name' />
                </FormControl>
  
                <FormControl mt={4}>
                    <FormLabel>Alter</FormLabel>
                    <NumberInput allowMouseWheel>
                      <NumberInputField ref={age}/>
                    </NumberInput>
                </FormControl>
  
                <FormControl mt={4}>
                    <FormLabel>Geschlecht</FormLabel>
                      <Select ref={gender} placeholder={"Geschlecht"}>
                        <option value='Männlich'>Männlich</option>
                        <option value='Weiblich'>Weiblich</option>
                        <option value='Divers'>Divers</option>
                    </Select>
                </FormControl>
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