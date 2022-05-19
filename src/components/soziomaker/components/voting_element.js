import { 
    Td, 
    IconButton,
    Tooltip,
    ButtonGroup
 } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default function VotingElement(props) {
    const col = props.col
    const row = props.row
    const [currActive, setCurrActive] = useState(1)
    
    function onClick(btn) {
        setCurrActive(btn)

    }

    return (
        <Td>
            <ButtonGroup>
                <Tooltip hasArrow label='Neutral' bg='gray.500' placement='top'>
                    <IconButton active={(currActive==1)}  _active={{bg: "gray.500"}} colorScheme={"grey"} variant={"outline"} m={"5px"} size={"xs"} aria-label='Search database' icon={<MinusIcon />} onClick={() => onClick(1)} />
                </Tooltip>
                <Tooltip hasArrow label='Zuneigung' bg='green.500' placement='top'>
                    <IconButton active={currActive==2} colorScheme={"green"} variant={"outline"} m={"5px"} size={"xs"} aria-label='Search database' icon={<CheckIcon />} onClick={() => onClick(2)}/>
                </Tooltip>
                <Tooltip hasArrow label='Abneigung' bg='red.500' placement='top'>
                    <IconButton active={currActive==3} colorScheme={"red"} variant={"outline"} m={"5px"} size={"xs"} aria-label='Search database' icon={<CloseIcon />} onClick={() => onClick(3)}/>
                </Tooltip>
            </ButtonGroup>
        </Td>
    )
}