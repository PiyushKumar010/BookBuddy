import { Button, Flex, HStack, Text, useColorMode, useColorModeValue, Avatar, Menu, MenuButton, MenuList, MenuItem, Input, Box, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { CiSquarePlus } from "react-icons/ci";

import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaRegMoon } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import { useBookStore } from "../store/book";
import { useState } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue("gray.100", "gray.900"); // light / dark background
  const navBorder = useColorModeValue("gray.200", "gray.700"); // subtle border line


  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // SEARCH BAR LOGIC
  // State for the search input value
  const [search, setSearch] = useState("");
  // Get all books and the setter from the store
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  // Fetches all books from the backend (used to reset the list)
  const fetchBooks = useBookStore((state) => state.fetchBooks);

  // Filters the books by title (case-insensitive) as the user types
  // If the search is empty, show all books
  const handleSearch = (value) => {
    setSearch(value);
    if (!value) {
      fetchBooks(); // Reset to all books if search is cleared
    } else {
      // Only show books whose title includes the search string
      setBooks(books.filter((book) => book.title.toLowerCase().includes(value.toLowerCase())));
    }
  };

  // Clears the search input and resets the book list
  const handleClear = () => {
    setSearch("");
    fetchBooks();
  };
  // END SEARCH BAR LOGIC

  return (
    <Flex
      as="nav"
      h={16}
      align="center"
      justify="space-between"
      px={6}
      w="100%"
      bg={navBg}
      borderBottom="1px solid"
      borderColor={navBorder}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Far left: logo */}
      <Box display="flex" alignItems="center" gap={2}>
        <span
          role="img"
          aria-label="logo"
          style={{
            marginRight: 6,
            fontSize: 28,
            background: 'linear-gradient(to left, #38b2ac, #2f855a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline-block',
          }}
        >
          📚
        </span>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Text
            fontSize="md"
            fontWeight="extrabold"
            bgGradient="linear(to-l, green.400, green.600)"
            bgClip="text"
            cursor="pointer"
            transition="color 0.15s"
            _hover={{
              bgGradient: 'linear(to-l, green.500, green.700)',
            }}
          >
            Explore
          </Text>
        </Link>
      </Box>

      {/* Centered search bar */}
      {/* SEARCH BAR UI */}
  <Box flex="1" display="flex" justifyContent="center" alignItems="center" ml={24}>
        <InputGroup maxW="400px">
          <Input
            placeholder="Search books..."
            size="md"
            borderRadius="full"
            boxShadow="md"
            bg="whiteAlpha.900"
            _dark={{ bg: "gray.800" }}
            textAlign="center"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputRightElement width={search ? "2.5rem" : "2.5rem"}>
            {search ? (
              // Show only the clear (cross) button when there is input
              <IconButton
                aria-label="Clear"
                icon={<CloseIcon color="gray.400" boxSize={3} />}
                size="sm"
                variant="ghost"
                tabIndex={0}
                onClick={handleClear}
              />
            ) : (
              // Show the search icon when the input is empty
              <IconButton
                aria-label="Search"
                icon={<SearchIcon color="gray.400" />}
                size="sm"
                variant="ghost"
                tabIndex={0}
                onClick={() => handleSearch(search)}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      {/* END SEARCH BAR UI */}

      {/* Far right: actions */}
      <HStack spacing={4} align="center">
        <Button
          size="md"
          variant="ghost"
          colorScheme="green"
          onClick={() => {
            if (user) {
              navigate('/create');
            } else {
              navigate('/login');
            }
          }}
          _hover={{
            bg: useColorModeValue('green.100', 'green.700'),
            transform: 'scale(1.08)',
            boxShadow: 'md',
          }}
          transition="all 0.15s"
        >
          <CiSquarePlus fontSize={24} />
        </Button>
        {!user && (
          <>
            <Link to="/login">
              <Button size="md" colorScheme="green" variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="md" colorScheme="green">Sign Up</Button>
            </Link>
          </>
        )}
        {user && (
          <Menu>
            <MenuButton as={Button} variant="ghost" rightIcon={<Avatar size="sm" name={user.name} />}>{user.name}</MenuButton>
            <MenuList>
              <MenuItem onClick={() => { logout(); navigate('/'); }}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
        <Button
          size="md"
          onClick={toggleColorMode}
          variant="ghost"
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
            transform: 'scale(1.08)',
            boxShadow: 'md',
          }}
          transition="all 0.15s"
        >
          {colorMode === "light" ? (
            <FaRegMoon size={22} />
          ) : (
            <FaSun size={22} />
          )}
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
