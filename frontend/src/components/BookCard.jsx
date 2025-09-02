import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";


import { useBookStore } from "../store/book";
import { useAuthStore } from "../store/auth";
import { useState } from "react";

const BookCard = ({ book, ownerName }) => {
    const [updatedBook, setUpdatedBook] = useState(book);

    const textColor = useColorModeValue("gray.600", "gray.100");
    const bg = useColorModeValue("white", "gray.700");


    const { deleteBook, updateBook } = useBookStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useAuthStore((state) => state.user);

    const handleDeleteBook = async (bid) => {
        const { success, message } = await deleteBook(bid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateBook = async (bid, updatedBook) => {
        const { success, message } = await updateBook(bid, updatedBook);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Book updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };



    // Debug: log IDs for troubleshooting
    // Remove or comment out after debugging
    if (user && book.user) {
        // eslint-disable-next-line no-console
        console.log('User ID:', user._id, 'Book User:', book.user, typeof book.user === 'object' ? book.user._id : undefined);
    }

    // Robust owner check: handles string or object for book.user
    const bookUserId = typeof book.user === 'object' && book.user !== null ? book.user._id : book.user;
    const isOwner = user && bookUserId && String(user._id) === String(bookUserId);

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Box
                overflow='hidden'
                borderRadius='md'
                transition='box-shadow 0.2s'
            >
                <Image
                    src={book.image}
                    alt={book.title}
                    h={56}
                    w='full'
                    objectFit='contain'
                    bg={useColorModeValue('gray.800', 'white')}
                    p={2}
                    borderRadius='md'
                    transition='transform 0.2s, box-shadow 0.2s'
                    _hover={{
                        transform: 'scale(1.05)',
                        boxShadow: 'lg',
                    }}
                />
            </Box>

            <Box p={4}>
                <Heading as='h3' size='md' mb={2} color={textColor}>
                    {book.title}
                </Heading>
                <Text fontSize='sm' color={textColor} mb={2} >
                    <span style={{ fontWeight: 600 }}>Author:</span>{book.nameAuthor}
                </Text>
                    <Text fontSize='sm' color='teal.600' mb={1} fontWeight='bold'>
                        {book.category}
                    </Text>
                <Text fontSize='sm' color={textColor} mb={2}>
                    <span style={{ fontWeight: 600 }}>Description: </span>{book.description}
                </Text>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ₹{Number(book.price).toLocaleString('en-IN')}
                </Text>

                <HStack spacing={2}>
                    {isOwner && (
                        <>
                            <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                            <IconButton
                                icon={<DeleteIcon />}
                                onClick={() => handleDeleteBook(book._id)}
                                colorScheme='red'
                            />
                        </>
                    )}
                    {/* Show owner name to the right of the buttons */}
                    {ownerName && (
                        <Box ml={2} fontSize="sm" color="gray.500" alignSelf="center">
                            Owner: {ownerName}
                        </Box>
                    )}
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Title'
                                name='title'
                                value={updatedBook.title}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
                            />
                            <Input
                                placeholder='Author Name'
                                name='nameAuthor'
                                value={updatedBook.nameAuthor}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, nameAuthor: e.target.value })}
                            />
                            <Input
                                placeholder='Description'
                                name='description'
                                value={updatedBook.description}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, description: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedBook.price}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedBook.image}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateBook(book._id, updatedBook)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default BookCard;