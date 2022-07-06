import {
    Box,
    useColorModeValue,
    Flex,
  } from '@chakra-ui/react';
import Textcard from './text_card';

export default function Content() {
    return (
      <Box bg={useColorModeValue('gray.200', 'gray.800')} h={"fit-content"}>
        <Box bg={useColorModeValue('teal.400', 'teal.600')} paddingTop={"50px"}>
          <Flex justifyContent={"flex-start"}>
            <Textcard heading={"Wer sind wir?"} text={"Wir von Sozio.io wollen dir dabei helfen, Soziogramme zu erstellen! Wir haben mit bekommen, dass es nicht immer ganz so einfach ist, ein Programm zu finden mit welchem man ein Soziogramm erstellen kann. Und jetzt kommen wir ins Spiel. Erstell dir ein Konto und sieh wie einfach es doch sein kann Soziogramme zu erstellen."} img={"logo512.png"} w={"60vd"} testid={"about-first-text-card"}/>
          </Flex>
          <Flex justifyContent={"flex-end"} mt={"16px"}>
            <Textcard heading={"Was passiert mit deinen Daten?"} text={"Naja Prinzipiell machen wir nichts mit deinen Daten. Auch um irgendwelche Cookies musst du dir keine Sorgen machen. Warum? Wir benutzen einfach keine. Natürlich brauchen wir deine Daten wie E-Mail und Passwort, damit du dich anmelden kannst. Diese speichern wir aber verschlüsselt in unserer Cloud. Das ganze machen wir auch für die Daten deiner Kinder! Wir verschlüsseln die eingegebenen Daten auf deinem Rechner und laden diese erst dann in unsere Cloud. Damit kannst nur du die Daten sehen die eingegeben wurden."} img={"encryption.png"} w={"60vd"} testid={"about-second-text-card"}/>
          </Flex>
        </Box>
        <Box as="svg" h={"full"} viewBox="0 0 1440 320" fill={useColorModeValue('teal.400', 'teal.600')} transform={"rotate(180deg)"} zIndex={"-1"} >
          <path
            d="M0 256l48-26.7C96 203 192 149 288 154.7c96 5.3 192 69.3 288 64C672 213 768 139 864 128s192 43 288 69.3c96 26.7 192 26.7 240 26.7h48v96H0z"          
          />
        </Box>
      </Box>
    );
  }
  