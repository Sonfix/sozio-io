import {
    Image,
    Text,
    Box,
    HStack,
    useColorModeValue,
    Button,
  } from '@chakra-ui/react';
import { DownloadIcon, } from '@chakra-ui/icons'
import { useDocContext } from "../../../contexts/DocumentContext"
  
export default function CurrentDocumentCard(props) {
  
    function onExport() {
      props?.onClick()
    }

    return (
        <Box
          w={'fit-content'}
          m={"25px"}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}
          rounded={'md'}
          zIndex={"2"}
          position={"fixed"}
          overflow={'hidden'}>
          <Box p={2}>
            <HStack
              marginRight={"16px"}
            >
              <Text>{props.data.getDataByKey("title")}</Text>
              <Button
                leftIcon={<DownloadIcon/>}
                colorScheme='teal'
                variant='outline'
                size='sm'
                marginInlineStart={"24px"}
                onClick={onExport}
              >
                Exportieren
              </Button>
            </HStack>
          </Box>
        </Box>
    );
  }