import React from 'react'
import {
  Text,
  Box,
  Image,
  Grid,
  GridItem,
  Center,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"

export default function Textcard(props) {

  return (
    <Box
     w={"100vh"}
     bg={useColorModeValue('gray.200', 'gray.800')}
     borderRadius={"25px"}
     m={"25px"}
     p={"25px"}
     data-testid={props.testid}
    >
      <Center 
        marginBottom={"25px"}
      >
        <Heading>{props?.heading}</Heading>
      </Center>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem colSpan={3}>
        <Text>
          {props?.text}
        </Text>
        </GridItem>
        <GridItem colSpan={2}>
          {props.img &&
          <Center>
              <Image
                boxSize='150px'
                src= {process.env.PUBLIC_URL + '/'+ props?.img}
                alt='Dan Abramov'
              />
          </Center>
        }
        </GridItem>
        
      </Grid>
    </Box>
  )
}
