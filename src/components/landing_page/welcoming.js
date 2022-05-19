import React from 'react'
import {
  Text,
  Box,
  Image,
  Grid,
  GridItem,
  Center,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react"
import { useAuth, } from "../../contexts/AuthContext";
// import { store } from "../../APIs/firebase"
// import { addDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
// import cryptoJs from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64';
import { useNavigate  } from "react-router-dom";

export default function Welcomming(props) {
  const { currentUser } = useAuth()
  let navigation = useNavigate ();


  function change_type(data) {
    props?.changeType(data)
  }


  return (
    <Box
     w={"100vh"}
     bg={useColorModeValue('gray.200', 'gray.800')}
     borderRadius={"25px"}
     m={"0 auto"}
     p={"25px"}
    >
      <Center 
        marginBottom={"25px"}
      >
        <Heading>Hi! Wilkommen auf Sozio.io</Heading>
      </Center>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem colSpan={3}>
        <Text>
          Du hast keine Lust deine Soziogramme mit veralteter Software oder gar mit PowerPoint zu erstellen? Dann bist du hier genau richtig. Wir helfen dir dabei dein Soziogramm einfach und schnell zu erstellen! Und das ganze sogar kostenlos!
        </Text>
        <Text marginTop={"15px"}>Interessiert? Dann melde dich schnell an, oder erstelle einen Account und lege los!</Text>
        <Center 
          marginTop={"25px"}
        >
        {!currentUser && <Button colorScheme='teal' onClick={() => change_type("LogIn")}>Los geht's</Button>}
        {currentUser  && <Button colorScheme='teal' onClick={() => navigation("/app", { replace: true })}>Zur Anwendung</Button>}
        </Center>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
              <Image
                borderRadius='full'
                w={"150px"}
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
              />
          </Center>
        </GridItem>
        
      </Grid>
    </Box>
  )
}
