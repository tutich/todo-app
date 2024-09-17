import { Flex, InputGroup, Input as ChakraInput, IconButton, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';

const Input = ({ colorMode, addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue(''); // Clear the input after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex 
        m="2.5em 0" 
        background={colorMode === "light" ? "white" : "#1a202c"} 
        p="2" 
        borderRadius={"0.2em"}
        boxShadow="md"
        alignItems="center"
      >
        <Box w="1.2rem" h="1.2rem" border="2px solid gray" borderRadius="full" />
        <InputGroup>
         
          <ChakraInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Create a new todo..."
            border="none"
            _focus={{ boxShadow: 'none' }}
          />
        </InputGroup>
        <IconButton
          aria-label="Add Todo"
          icon={<AddIcon />}
          ml={2}
          type="submit"
        />
      </Flex>
    </form>
  );
};

export default Input;
