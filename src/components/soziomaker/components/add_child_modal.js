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
import React, { useState } from "react";

export default function AddChildModal(props) {

    const [name, setName] = useState(props.data.name || "");
    const [age, setAge] = useState(props.data.age || "");
    const [gender, setGender] = useState(props.data.gender || "");
    
    function save() {
        const obj = {
            id: props.data.id || -1,
            name: name,
            age: age,
            gender: gender  
        }
        console.log(obj)
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
                    <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                </FormControl>
  
                <FormControl mt={4}>
                    <FormLabel>Alter</FormLabel>
                    <NumberInput allowMouseWheel  value={age}>
                      <NumberInputField onChange={(e) => setAge(e.target.value)}/>
                    </NumberInput>
                </FormControl>
  
                <FormControl mt={4}>
                    <FormLabel>Geschlecht</FormLabel>
                      <Select placeholder={"Geschlecht"} onChange={(e) => setGender(e.target.value)} defaultValue={gender}>
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