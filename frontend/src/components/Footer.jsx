import { Box, Flex, Text, Link, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const brandColor = useColorModeValue("blue.700", "blue.300");
  return (
    <Box
      as="footer"
      bg={bg}
      py={4}
      w="100%"
      position="static"
      mt="auto"
    >
      <Flex direction="column" align="center" justify="center" maxW="container.xl" mx="auto" px={4}>
        {/* Social Icons */}
        <HStack spacing={4} mb={2}>
          <Link href="#" onClick={e => e.preventDefault()}>
            <Icon as={FaFacebook} boxSize={5} color="blue.600" />
          </Link>
          <Link href="#" onClick={e => e.preventDefault()}>
            <Icon as={FaInstagram} boxSize={5} color="pink.500" />
          </Link>
          <Link href="#" onClick={e => e.preventDefault()}>
            <Icon as={FaLinkedin} boxSize={5} color="blue.700" />
          </Link>
        </HStack>
        {/* BookBuddy Brand and Private Limited in one line with copyright */}
        <HStack spacing={1} mb={1}>
          <Text as="span" fontSize="md" color={textColor} mx={1}>
            &copy;
          </Text>
          <Text as="span" fontSize="md" color={brandColor} fontWeight="bold">
            BookBuddy
          </Text>
          <Text as="span" fontSize="md" color={textColor}>
            Private Limited
          </Text>
        </HStack>
        {/* Privacy and Terms */}
        <HStack spacing={2}>
          <Link href="#" fontSize="sm" color={textColor}>
            privacy
          </Link>
          <Link href="#" fontSize="sm" color={textColor}>
            Terms
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
