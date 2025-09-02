import { Box, useColorModeValue} from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={useColorModeValue("grey.100", "grey.900")}> 
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
