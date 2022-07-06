import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
    Avatar,
    Flex,
    IconButton
  } from '@chakra-ui/react';
  import { DeleteIcon } from '@chakra-ui/icons'

 
  export default function ChildCard(props) {

    function onDeleteClicked(e) {
      console.log("Delete clicked")
      e.stopPropagation()
    }

    return (
      <Center 
        m={"auto"}
        marginBottom={5}
        w={"60%"}
        _hover={{
          cursor: "pointer"
        }}>
        <Box
          w={'100%'}
          bg={useColorModeValue('white', 'gray.200')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          onClick={props?.onClick}
          color={'gray.900'}
          >
  
          <Box p={6}>
            <Flex justifyContent={"flex-end"} m={"6px"}>
              <IconButton 
                colorScheme='red'
                aria-label='Löschen'
                size={"sm"}
                icon={<DeleteIcon />}
                onClick={onDeleteClicked}
              />
            </Flex>
            <Center>
              <Avatar size={"lg"} bg={props.data.color}/>
            </Center>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {props.data.name}
              </Heading>
            </Stack>
  
            <Stack justify={'center'}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>Alter</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  {props.data.age}
                </Text>
              </Stack>
              <Stack marginTop={0} spacing={0} align={'center'}>
                <Text fontWeight={600}>Geschlecht</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  {props.data.gender}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Center>
    );
  }