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
  SkeletonCircle 
} from "@chakra-ui/react"
import { useAuth, } from "../../contexts/AuthContext";
import { store } from "../../APIs/firebase"
import { addDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import cryptoJs from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import { useNavigate  } from "react-router-dom";

export default function Welcomming(props) {
  const { currentUser, currentDiagramms } = useAuth()
  let navigation = useNavigate ();


  function change_type(data) {
    props?.changeType(data)
  }

  async function firestore_test() {
    
    console.log(currentDiagramms)
      // const hashDigest = cryptoJs.SHA256(currentUser.uid);
      // const hmacDigest = Base64.stringify(cryptoJs.HmacSHA256(currentUser.uid + hashDigest, "privateKey"));
      // console.log(hmacDigest)

      // let test_dec = "Du hast keine Lust deine Soziogramme mit veralteter Software oder gar mit PowerPoint zu erstellen? Dann bist du hier genau richtig. Wir helfen dir dabei dein Soziogramm einfach und schnell zu erstellen! Und das ganze sogar kostenlos!";
      // let key = "ef8d0c698c9ba438e9887b9f3fbf8a0e2df3c2eabb10a2d3e262b2958af099df9c34ab725af03aafdf135f2e5589ddfa187e15b3d3361033f02ebfda761c6269f8736b8f843b718acd59f68dac914c8b70ca65aba45a1cc100b13ce4ae760f239e8d605d622836eeb7af9e02d09cf660c87ad5bd6bcce746cbf9f1a861e6108c"
      // let chiper = cryptoJs.AES.encrypt(JSON.stringify(test_dec), key).toString();
      // var start = window.performance.now();
      // var bytes = cryptoJs.AES.decrypt(chiper, key);
      // var decryptedData = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));

      // const docRef = await addDoc(collection(store, "test"), {
      //   UUID: currentUser.uid,
      //   raw_data: "Test"
      // }); 
           
  }

  return (
    <Box
     w={"100vh"}
     bg={"gray.200"}
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
        <Button colorScheme='teal' onClick={() => firestore_test()}>Firestore test</Button>
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
