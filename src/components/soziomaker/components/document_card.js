import {
    Image,
    Box,
    Text,
    Stack,
    useColorModeValue,
    Flex,
    IconButton
  } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { useDocContext } from "../../../contexts/DocumentContext"
  
  export default function DocumentCard(props) {
    
    const { setCurrentDocument } = useDocContext();

    function onDocSelected() {
      setCurrentDocument(props.id);
      props?.onClick()
    }

    function onDeleteClicked(e) {
      e.stopPropagation()
      props?.deleteDocument(props.id)
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
                objectFit='cover'
                boxSize={"150px"}
                src= {process.env.PUBLIC_URL + '/thumbnail.png'}
                alt='Thumbnail'
              >
              </Image>              
            </Stack>
  
            <Stack justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{props.data.getDataByKey("title")}</Text> 
                <Flex justifyContent={"flex-end"} m={"6px"}>
                  <IconButton 
                    colorScheme='red'
                    aria-label='Löschen'
                    size={"sm"}
                    icon={<DeleteIcon />}
                    onClick={onDeleteClicked}
                  />
                </Flex>
              </Stack>
              
            </Stack>
          </Box>
        </Box>
    );
  }