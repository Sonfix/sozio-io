import { 
    Td, 
    useRadioGroup,
    HStack,
 } from '@chakra-ui/react'
import CustomRadio from "./custom_radio_element"
import { useState } from "react"

export default function VotingElement(props) {
    const options = ['Neutral', 'Zuneigung', 'Abneigung']

    function onElementClicked(sel) {
        props.callback(props.col, props.row, sel);
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: props.selected,
    })
  
    const group = getRootProps()
 
    return (
        <Td>
            <HStack {...group} m={"0 auto"} justifyContent={"center"}>
                {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <CustomRadio key={value} {...radio} onClick={onElementClicked}>
                        {value}
                    </CustomRadio>
                )
                })}
            </HStack>
        </Td>
    )
}