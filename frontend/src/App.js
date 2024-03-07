import React from 'react'
import { Container } from "react-bootstrap";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LoginForm from './components/loginForm/loginForm.jsx';
const App = () => {
  return (
    <>
    <Header />
    <main className="py-3">
    <Container>
    </Container>
    <LoginForm />
    </main>
    <Footer />
    </>
  );
}

export default App;