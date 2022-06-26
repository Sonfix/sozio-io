import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Button,
    Image,
    Text
  } from '@chakra-ui/react'
import { PDFIcon } from './export_handler';
import React, { useRef } from "react";

export default function ExportModalSelect(props) {

    const exportRef = useRef()

    function close(data) {
        props?.onClose(data, exportRef)
    }

    return (
      <> 
        <Modal
          isOpen={props?.isOpen}
          onClose={() => close(null)}
        >
          <ModalOverlay />
          <ModalContent>
            <svg ref={exportRef}></svg>
            <ModalHeader>Wie möchtest du es denn gerne haben?</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <VStack>
                    <Button
                        colorScheme='red'
                        variant='outline'
                        size='m'
                        w={"80%"}
                        justifyContent={'flex-start'}
                        onClick={() => close("PDF")}
                        leftIcon={<Image
                                    src= {process.env.PUBLIC_URL + '/pdf.svg'}
                                    boxSize='50px'
                                    m={'5px'}
                                    marginInlineStart={"25%"}
                                    alt='PDF' />
                                }
                    >
                        <Text marginInlineStart={"25%"}>PDF Datei</Text>
                    </Button>
                    <Button
                        colorScheme='black'
                        variant='outline'
                        size='m'
                        w={"80%"}
                        justifyContent={'flex-start'}
                        onClick={() => close("JPG")}
                        leftIcon={<Image
                                    src= {process.env.PUBLIC_URL + '/jpg.svg'}
                                    boxSize='50px'
                                    m={'5px'}
                                    marginInlineStart={"25%"}
                                    alt='JPG' />
                                }
                    >
                        <Text marginInlineStart={"25%"}>JPG Bilddatei</Text>
                    </Button> 
                    <Button
                        colorScheme='orange'
                        variant='outline'
                        size='m'
                        w={"80%"}
                        justifyContent={'flex-start'}
                        onClick={() => close("SVG")}
                        leftIcon={<Image
                                    src= {process.env.PUBLIC_URL + '/svg.svg'}
                                    boxSize='50px'
                                    m={'5px'}
                                    marginInlineStart={"25%"}
                                    alt='SVG' />
                                }
                    >
                        <Text marginInlineStart={"25%"}>SVG Bilddatei</Text>
                    </Button> 
                </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }