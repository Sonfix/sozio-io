import NavBar from  "../navbar"
import Content from "./content"
import {
  Box
} from '@chakra-ui/react';

export default function AboutPage() {
  return (
    <Box bg={"gray.200"}>
      <NavBar />
      <Content />
    </Box>
  );
}
