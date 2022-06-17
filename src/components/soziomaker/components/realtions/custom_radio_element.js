import { 
    Box,
    useRadio,
 } from "@chakra-ui/react";
import React from "react";
import { CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons'

const CustomRadio = React.forwardRef((props, ref) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    function onClick() {
      props.onClick(props.value);
    }

    const colorPicker = {
        "Neutral": {
            unchecked: "gray.100",
            checked: "gray.600",
            icon: <MinusIcon w={4} h={4} m={"6px"}/>
        },
        "Zuneigung": {
            unchecked: "green.100",
            checked: "green.800",
            icon: <CheckIcon w={4} h={4} m={"6px"} />
        },
        "Abneigung": {
            unchecked: "red.100",
            checked: "red.600",
            icon: <CloseIcon w={4} h={4} m={"6px"} />
        }
    }

    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          onClick={onClick}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          h={"30px"}
          w={"30px"}
          bg={colorPicker[props.value].unchecked}
          _checked={{
            bg: colorPicker[props.value].checked,
            color: 'white',
            borderColor: colorPicker[props.value].checked,
          }}
          _focus={{
            boxShadow: 'outline',
          }}
        >
        {colorPicker[props.value].icon}
        </Box>
      </Box>
    )
  });

  export default CustomRadio