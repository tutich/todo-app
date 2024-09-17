import { Box, Text, Divider, IconButton, Image, Button, Flex, useColorMode } from "@chakra-ui/react";
import { useState } from 'react';
import iconCheck from '../images/icon-check.svg'; // Path to your check icon image
import iconCross from '../images/icon-cross.svg'; // Path to your cross icon image
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoCard = ({ todos, setTodos }) => {
  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)
  const [completed, setCompleted] = useState([]); // Track completed todos
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which todo is being hovered
  const [filter, setFilter] = useState('all'); // Track which filter is active

  const toggleComplete = (index) => {
    // Toggle completion status
    if (completed.includes(index)) {
      setCompleted(completed.filter(i => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  const handleDeleteTodo = (index) => {
    // Remove the todo item by filtering it out
    setTodos(todos.filter((_, i) => i !== index));
    setCompleted(completed.filter(i => i !== index)); // Remove from completed if it exists
  };

  const handleClearCompleted = () => {
    // Remove completed todos
    setTodos(todos.filter((_, index) => !completed.includes(index)));
    setCompleted([]); // Clear all completed items
  };

  const filteredTodos = todos.filter((_, index) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !completed.includes(index);
    if (filter === 'completed') return completed.includes(index);
    return true;
  });

  // Handle drag end event
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTodos = Array.from(todos);
    const [movedTodo] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedTodo);

    setTodos(updatedTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <Box
            p={4}
            w="100%"
            bg={colorMode === "light" ? "white" : "#1a202c"}  // Set background color based on color mode
            borderRadius="md"
            boxShadow="sm"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.200" : "gray.700"} // Adjust border color for dark mode
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTodos.map((todo, index) => (
              <Draggable key={index} draggableId={`todo-${index}`} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    mb={2}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Box display="flex" alignItems="center">
                        {/* Checkbox or Check Icon */}
                        <IconButton
                          onClick={() => toggleComplete(index)}
                          aria-label="Complete Todo"
                          icon={
                            completed.includes(index) ? (
                              <Box
                                w="1.2rem"
                                h="1.2rem"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="full"
                                bg="linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
                                p="0.3rem"
                              >
                                <Image src={iconCheck} alt="check" />
                              </Box>
                            ) : (
                              <Box
                                w="1.2rem"
                                h="1.2rem"
                                border="2px solid gray"
                                borderRadius="full"
                              />
                            )
                          }
                          variant="ghost"
                          size="sm"
                          mr={3}
                        />

                        {/* Todo Text with strikethrough if completed */}
                        <Text
                          as={completed.includes(index) ? "del" : "span"}
                          color={
                            colorMode === "light"
                              ? completed.includes(index)
                                ? "gray.500" // Light mode completed
                                : "black"    // Light mode active
                              : completed.includes(index)
                                ? "gray.500" // Dark mode completed
                                : "gray.300" // Dark mode active
                          }
                        >
                          {todo}
                        </Text>
                      </Box>

                      {/* Display the cross icon when the todo is hovered */}
                      {hoveredIndex === index && (
                        <IconButton
                          onClick={() => handleDeleteTodo(index)}
                          aria-label="Delete Todo"
                          icon={<Image src={iconCross} alt="delete" />}
                          variant="ghost"
                          size="sm"
                        />
                      )}
                    </Box>

                    {/* Divider below the todo item */}
                    <Divider mt={2} mb={2} />
                  </Box>
                )}
              </Draggable>
            ))}

            {/* Footer with Todo summary and filter options */}
            <Flex justify="space-between" align="center" mt={4}>
              {/* Items left */}
              <Text>{todos.length - completed.length} items left</Text>

              {/* Filter Buttons */}
              <Flex justify="center" align="center">
                <Button
                  variant="link"
                  mx={2}
                  onClick={() => setFilter('all')}
                  isActive={filter === 'all'}
                >
                  All
                </Button>
                <Button
                  variant="link"
                  mx={2}
                  onClick={() => setFilter('active')}
                  isActive={filter === 'active'}
                >
                  Active
                </Button>
                <Button
                  variant="link"
                  mx={2}
                  onClick={() => setFilter('completed')}
                  isActive={filter === 'completed'}
                >
                  Completed
                </Button>
              </Flex>

              {/* Clear Completed Button */}
              <Button variant="link" onClick={handleClearCompleted}>
                Clear Completed
              </Button>
            </Flex>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoCard;
