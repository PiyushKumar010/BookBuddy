import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Heading, VStack, useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { success, message } = await login(email, password);
    if (success) {
      toast({ title: "Login successful", status: "success" });
      navigate("/");
    } else {
      toast({ title: "Login failed", description: message, status: "error" });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} boxShadow="lg" borderRadius="lg">
      <Heading mb={6}>Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="green" w="full" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
