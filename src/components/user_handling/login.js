import React, { useState, useRef } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function CheckResp(err, id) {
  return (err === id);
}

export default function LogIn(props) {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handle_switch_to_signup = (data) => {
    props?.onChange(data? data : "SignUp")
  }

  const toast = useToast();
  const showToast = (title, desc, type) => {
    toast({
      title: title,
      description: desc,
      status: type,
      variant: "subtle",
      isClosable: true,
      position: "top",
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (emailRef.current.value === "" || passwordRef.current.value === "") {
        showToast("Fehler", "E-Mail Adresse und Passwort müssen eingetragen werden!", "error");
        return
      }

      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value)
      
      handle_switch_to_signup("Text");
    } catch (error){
      if (CheckResp(error, "auth/invalid-email")){
        showToast("Fehler", "E-Mail nicht gefunden!", "error");
      }
      else if (CheckResp(error, "auth/user-disabled")) {
        showToast("Fehler", "Der angegebene Account wurde deaktiviert! Bitte wenden Sie sich an den System admin", "error");
      }
      else if (CheckResp(error, "auth/user-not-found")){
        showToast("Fehler", "Es konnte kein Nutzer mit der E-Mail Adresse gefunden werden! Haben Sie sich vertippt oder gar keinen Account?", "error");
      }
      else if (CheckResp(error, "auth/wrong-password")){
        showToast("Fehler", "Das Passwort stimmt nicht!", "error");
      }
      else{
        showToast("Fehler", "Es gab einen unvorhergesehenen Fehler!", "error");
        console.log(error);
      }
    }
    setLoading(false);
  }

  return (
    <Flex
      flexDirection="column"
      backgroundColor="gray.200"
      w={"fit-content"}
      margin={"0 auto"}
      padding={"5"}
      borderRadius={"25px"}
      justifyContent="center"
      alignItems="center"
    >
     
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display={"flex"}
          width={"100%"}
          flexDir={"row"}
          justifyContent={"flex-end"}
        >
          <Box>
            <IconButton
              variant='outline'
              alignSelf={"right"}
              colorScheme={"red"}
              aria-label={"Schließen"}
              onClick={() => handle_switch_to_signup("Text")}
              icon={<CloseIcon />}
            />
          </Box>
        </Box>
        <Heading color="teal.400">Hallo!</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="E-mail Addresse" ref={emailRef} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Passwort"
                    ref={passwordRef}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Verbergen" : "Anzeigen"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link to="/forgot-password">Passwort vergessen?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
                spinnerPlacement='end'
                loadingText='Anmelden'
              >
                Anmelden
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Neu hier?{" "}
        <Link color="teal.500" onClick={() => handle_switch_to_signup("SignUp")}>
          Melde dich an
        </Link>
      </Box>
    </Flex>
  );
};