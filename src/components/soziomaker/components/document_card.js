import {
    Image,
    Box,
    Text,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';

import { useDocContext } from "../../../contexts/DocumentContext"
  
  export default function DocumentCard(props) {
    
    const { setCurrentDocument } = useDocContext();

    function onDocSelected() {
      console.log(props.id)
      setCurrentDocument(props.id);
      props?.onClick()
    }

    return (
        <Box
          w={'fit-content'}
          marginRight={"25px"}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}
          rounded={'md'}
          overflow={'hidden'}
          onClick={onDocSelected}
          _hover={{
            cursor: "pointer"
          }}>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Image
                rounded={'md'}
                w={"150px"}
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'>
              </Image>
            </Stack>
  
            <Stack justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{props.data.title}</Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
    );
  }