import { Box, useColorMode, Text } from "@chakra-ui/react";
import { useState } from "react";
import lightBackgroundImg from './images/bg-desktop-light.jpg';
import darkBackgroundImg from './images/bg-desktop-dark.jpg';
import Header from "components/Header";
import Input from "components/Input";
import TodoCard from "components/TodoCard";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    if (newTodo) {
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <>
      <Box
        backgroundImage={colorMode === "light" ? lightBackgroundImg : darkBackgroundImg}
        backgroundSize={"cover"}
        height={"40vh"}
      >
        <Box w="40%" p="4em 0" m="auto">
          <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
          <Input colorMode={colorMode} addTodo={handleAddTodo} />
          
          {/* Pass both todos and setTodos to TodoCard */}
          {todos.length > 0 && (
            <>
              <TodoCard todos={todos} setTodos={setTodos} />
              <Text
                textAlign="center"
                color="gray.500"
                mt={4}
              >
                Drag and drop to reorder list
              </Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
