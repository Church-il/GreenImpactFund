import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../utils/api';
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #2e7d32;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  color: ${(props) => (props.success ? '#2e7d32' : 'red')};
  margin-bottom: 1rem;
`;

const OrgList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
`;

const OrgCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OrgTitle = styled.h4`
  font-weight: bold;
  color: #2e7d32;
`;

const OrgDescription = styled.p`
  color: #666;
  margin: 0.5rem 0;
`;

const Status = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.approved ? '#2e7d32' : '#f57c00')};
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  background: ${(props) => (props.danger ? '#d32f2f' : '#2e7d32')};
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;
  &:hover {
    background: ${(props) => (props.danger ? '#b71c1c' : '#1b5e20')};
  }
`;

function Organizations() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await api.get('/organizations/');
        setOrganizations(response.data.organizations);
      } catch (error) {
        setMessage('Failed to fetch organizations.');
      }
    };
    fetchOrganizations();
  }, []);

  const handleApply = async () => {
    if (!token) {
      setMessage('You must be logged in to create an organization.');
      return;
    }

    try {
      const response = await api.post('/organizations/apply', { name, description });
      setMessage('Organization created successfully!');
      setName('');
      setDescription('');
      setOrganizations([...organizations, { 
        id: response.data.organization_id,
        name, 
        description, 
        approved: true 
      }]);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to create organization.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/organizations/${id}/approve`);
      setOrganizations((prev) =>
        prev.map((org) => (org.id === id ? { ...org, approved: true } : org))
      );
    } catch (error) {
      setMessage('Failed to approve organization.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/organizations/${id}`);
      setOrganizations((prev) => prev.filter((org) => org.id !== id));
    } catch (error) {
      setMessage('Failed to delete organization.');
    }
  };
  return (
    <PageWrapper>
      <Container>
        <Title>Organizations</Title>
        {message && <Message success={message.includes('success')}>{message}</Message>}

        <OrgList>
          {organizations.length > 0 ? (
            organizations.map((org) => (
              <OrgCard key={org.id}>
                <OrgTitle>{org.name}</OrgTitle>
                <OrgDescription>{org.description}</OrgDescription>
                <Status approved={org.approved}>
                  {org.approved ? 'Approved' : 'Pending Approval'}
                </Status>

                {userRole === 'admin' && !org.approved && (
                  <Button onClick={() => handleApprove(org.id)}>Approve</Button>
                )}

                {userRole === 'admin' && (
                  <Button danger onClick={() => handleDelete(org.id)}>Delete</Button>
                )}
              </OrgCard>
            ))
          ) : (
            <Message>No organizations found.</Message>
          )}
        </OrgList>

        <FormContainer>
          <Title>Create an Organization</Title>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Organization Name"
          />
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Organization Description"
          />
          <Button onClick={handleApply}>Apply</Button>
        </FormContainer>
      </Container>
    </PageWrapper>
  );
}

export default Organizations;
