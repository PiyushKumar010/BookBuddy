import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Heading, VStack, useToast } from "@chakra-ui/react";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { success, message } = await register(name, email, password);
    if (success) {
      toast({ title: "Sign up successful", status: "success" });
      navigate("/");
    } else {
      toast({ title: "Sign up failed", description: message, status: "error" });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} boxShadow="lg" borderRadius="lg">
      <Heading mb={6}>Sign Up</Heading>
      <VStack spacing={4}>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="green" w="full" onClick={handleSignUp}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUpPage;
