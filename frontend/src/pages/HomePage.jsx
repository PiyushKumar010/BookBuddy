
import { Container, SimpleGrid, Text, VStack, Input, Flex, Button, Select, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useBookStore } from "../store/book";
import { useAuthStore } from "../store/auth";
import { useEffect, useState } from "react";

const CATEGORIES = [
    "Novel",
    "Sci-Fi",
    "Biography",
    "Mystery",
    "Fantasy",
    "Non-Fiction",
    "Romance",
    "History",
    "Children",
    "Horror"
];

const HomePage = () => {
    const books = useBookStore((state) => state.books);
    const fetchBooks = useBookStore((state) => state.fetchBooks);
    const clearBooks = useBookStore((state) => state.clearBooks);
    const user = useAuthStore((state) => state.user);
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [showFilter, setShowFilter] = useState(false); // legacy, not used
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Filter books by selected category
    const filteredBooks = selectedCategory
        ? books.filter((book) => book.category === selectedCategory)
        : books;

    return (
        <Container maxW='container.xl' py={3} pb={24}>
            <VStack spacing={8}>
                                        {/* Title and Filter button on same line, higher up */}
                                                        <Box w="full" position="relative" mt={2} mb={4}>
                                                            <Box display="flex" justifyContent="center">
                                                                {user ? (
                                                                    <Text
                                                                        fontSize={"30"}
                                                                        fontWeight={"bold"}
                                                                        bgGradient={"linear(to-r, cyan.400, blue.500)"}
                                                                        bgClip={"text"}
                                                                        textAlign={"center"}
                                                                    >
                                                                        Current Books 🚀
                                                                    </Text>
                                                                ) : (
                                                                    <Text fontSize='xl' fontWeight='bold' color='gray.500'>
                                                                        Please log in to see your books.
                                                                    </Text>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                onClick={onOpen}
                                                                colorScheme="teal"
                                                                variant="outline"
                                                                position="absolute"
                                                                top="50%"
                                                                right="0"
                                                                transform="translateY(-50%)"
                                                                mr={2}
                                                            >
                                                                Filter
                                                            </Button>
                                                        </Box>
                                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Filter by Category</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Select
                                                        placeholder="Select Category"
                                                        value={selectedCategory}
                                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                                        w="100%"
                                                        mb={4}
                                                    >
                                                        {CATEGORIES.map((cat) => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </Select>
                                                    {selectedCategory && (
                                                        <Button size="sm" onClick={() => setSelectedCategory("")} mb={2}>Clear</Button>
                                                    )}
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 2,
                                lg: 3,
                            }}
                            spacing={10}
                            w={"full"}
                            mt={2}
                        >
                            {filteredBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                    ownerName={book.user && book.user.name ? book.user.name : ''}
                                />
                            ))}
                        </SimpleGrid>
                {user && filteredBooks.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        No books found 😢{" "}
                        <Link to={"/create"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Create a book
                            </Text>
                        </Link>
                    </Text>
                )}
                {/* No 'Create a book' link when not logged in */}
            </VStack>
        </Container>
    );
};

export default HomePage;