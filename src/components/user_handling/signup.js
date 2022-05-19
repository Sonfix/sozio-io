import React, { useRef, useState } from "react"
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

function Signup(props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const emailRef = useRef()
    const userRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [loading, setLoading] = useState(false)

    function handle_switch_to_login(data) {
      props?.onChange(data? data: "LogIn")
    }
    const toast = useToast()
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

        if (emailRef.current.value === ""
        || userRef.current.value === ""
        || passwordRef.current.value === ""
        || passwordConfirmRef.current.value === "") {
          showToast("Fehler", "Bitte fülle alle felder aus!", "error")
          return
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          showToast("Fehler", "Passwörte stimmen nicht überein", "warning")
          return
        }

        try {
        setLoading(true)
        
        await signup(emailRef.current.value, passwordRef.current.value)
        handle_switch_to_login("Text");
        } catch (error){
          var errorCode = error.code;
          if (CheckResp(errorCode, 'auth/weak-password')) {
            showToast("Fehler", 'Das angegebene Passwort ist zu schwach', "warning");
          }
          else if (CheckResp(errorCode, 'auth/email-already-in-use')) {
            showToast("Fehler", 'Die angegebene E-Mail adresse ist bereits vergeben!', "error");
          } else {
            console.log(error);
            showToast("Fehler", "Failed to create an account", "error")
          }
        }

        setLoading(false)
  }

  return (
    <Flex
      flexDirection="column"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      w={"fit-content"}
      margin={"0 auto"}
      padding={"5"}
      borderRadius={"25px"}
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
              onClick={() => handle_switch_to_login("Text")}
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
                <Input type="text" placeholder="Nutzername" ref={userRef} />
              </InputGroup>
            </FormControl>
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
              </FormControl>
              <FormControl>
              <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type="password"
                    placeholder="Passwort wiederholen"
                    ref={passwordConfirmRef}
                  />
                </InputGroup>
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
        Schon mal da gewesen?{" "}
        <Link color="teal.500" onClick={() => handle_switch_to_login("LogIn")}>
          Melde dich an
        </Link>
      </Box>
    </Flex>
  )
}

export default Signup;