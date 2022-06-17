import {
    Box,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from "react";

export default function Content() {

  const [display_type, setdisplay_type] = useState("Text");
  const change_type = (type) => {
    setdisplay_type(type)
  }

    return (
      <Box bg={useColorModeValue('gray.200', 'gray.800')} h={"fit-content"}>
        <Box bg={useColorModeValue('teal.400', 'teal.600')} h={"xl"} paddingTop={"50px"}>
        </Box>
        <Box as="svg" h={"full"} viewBox="0 0 1440 320" fill={useColorModeValue('teal.400', 'teal.600')} transform={"rotate(180deg)"} zIndex={"-1"} >
          <path
            d="M0 256l48-26.7C96 203 192 149 288 154.7c96 5.3 192 69.3 288 64C672 213 768 139 864 128s192 43 288 69.3c96 26.7 192 26.7 240 26.7h48v96H0z"          
          />
        </Box>
      </Box>
    );
  }
  