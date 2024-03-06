
import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear()
 
  return (
   <footer>
    <Row>
        <Col className='text-center py-3'>
            <p>&copy; {currentYear} Redbus India Pvt Ltd. All rights reserved</p>
        </Col>
    </Row>
   </footer>
  )
}

export default Footer