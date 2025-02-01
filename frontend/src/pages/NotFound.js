import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: white;
  text-align: center;
  padding-top: 10vh;  
  padding: 2rem 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: rgb(255, 1, 1);
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: rgb(255, 1, 1);
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: #2e7d32;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s, color 0.3s;
  font-size: 1rem;

  &:hover {
    background: #1b5e20;
  }
`;

function NotFound() {
  return (
    <Container>
      <div>
        <Title>404 - Page Not Found</Title>
        <Message>Oops! The page you're looking for doesn't exist.</Message>
        <StyledLink to="/">Go back to Home</StyledLink>
      </div>
    </Container>
  );
}

export default NotFound;
