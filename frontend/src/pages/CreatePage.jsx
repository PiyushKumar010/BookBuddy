import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../store/book";

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

const CreatePage = () => {
	const [newBook, setNewBook] = useState({
		title: "",
		description: "",
		image: "",
		nameAuthor: "",
		price: "",
		category: ""
	});
	const toast = useToast();
	const { createBook } = useBookStore();
	const navigate = useNavigate();

	const handleAddBook = async () => {
		const { success, message } = await createBook(newBook);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
			navigate("/");
		}
		setNewBook({ title: "", description: "", image: "", nameAuthor: "", price: "", category: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Book
				</Heading>
				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Book Title'
							name='title'
							value={newBook.title}
							onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
						/>
						<Input
							placeholder='Author Name'
							name='nameAuthor'
							value={newBook.nameAuthor}
							onChange={(e) => setNewBook({ ...newBook, nameAuthor: e.target.value })}
						/>
						<Input
							placeholder='Description'
							name='description'
							value={newBook.description}
							onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newBook.price}
							onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newBook.image}
							onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
						/>
						<Select
							placeholder='Select Category'
							name='category'
							value={newBook.category}
							onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
							isRequired
						>
							{CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>{cat}</option>
							))}
						</Select>
						<Button colorScheme='blue' onClick={handleAddBook} w='full'>
							Add Book
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;