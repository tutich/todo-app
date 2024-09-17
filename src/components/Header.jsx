import { Button, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react';
import moonIcon from '../images/icon-moon.svg';
import lightIcon from '../images/icon-sun.svg';

const Header = ({ colorMode, toggleColorMode }) => {
  return (
    <Flex justifyContent={"space-between"}>
        <Heading as="h2" size="xl" color="white" letterSpacing={".5em"}>TODO</Heading>

        <Button variant={"ghost"} onClick={toggleColorMode} _hover="none" _active="none">
            <Image src={colorMode === "light" ? moonIcon : lightIcon}/>
        </Button>
    </Flex>
  )
}

export default Header