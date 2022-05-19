import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function ChildCard(props) {

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
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {props.data.name}
              </Heading>
            </Stack>
  
            <Stack justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>Alter</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  {props.data.age}
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
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