import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import api from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner, FaDollarSign, FaTrash, FaSync } from 'react-icons/fa';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  min-height: 90vh;
  background: #f8f9fa;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  color: #2e7d32;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardDescription = styled.p`
  color: #666;
  margin: 0.5rem 0 0 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #eee;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.hasIcon ? '0.75rem 1rem 0.75rem 2.5rem' : '0.75rem 1rem'};
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background: #1b5e20;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + & {
    background-color: #2e7d32;
  }

  ${SwitchInput}:checked + &:before {
    transform: translateX(24px);
  }
`;

const DonationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DonationCard = styled(Card)`
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const DonationContent = styled.div`
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const DonationInfo = styled.div`
  flex: 1;
`;

const Amount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background: #e8f5e9;
  color: #2e7d32;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DeleteButton = styled.button`
  opacity: 0;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  ${DonationCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(220, 53, 69, 0.1);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: ${props => props.active ? 'none' : '1px solid #2e7d32'};
  background: ${props => props.active ? '#2e7d32' : 'transparent'};
  color: ${props => props.active ? 'white' : '#2e7d32'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#1b5e20' : '#e8f5e9'};
  }
`;

const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;

function Donations() {
  const [donations, setDonations] = useState([]);
  const [amount, setAmount] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/donations?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(response.data.donations);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setMessage('Failed to fetch donations.');
        setLoading(false);
      }
    };
    fetchDonations();
  }, [token, currentPage]);

  const handleCreateDonation = async () => {
    if (!amount || !organizationId) {
      toast.error('Amount and organization ID are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        '/donations',
        { amount, organization_id: organizationId, recurring },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Donation created successfully!');
      setDonations([...donations, response.data.donation]);
      setAmount('');
      setOrganizationId('');
      setRecurring(false);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to create donation.');
      setLoading(false);
    }
  };

  const handleDeleteDonation = async (id) => {
    try {
      await api.delete(`/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Donation deleted successfully!');
      setDonations(donations.filter((donation) => donation.id !== id));
    } catch (error) {
      toast.error('Failed to delete donation.');
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Card>
          <CardHeader>
            <CardTitle>
              <FaDollarSign />
              Make a Donation
            </CardTitle>
            <CardDescription>
              Support organizations by making a one-time or recurring donation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormGroup>
              <Label htmlFor="amount">Donation Amount</Label>
              <InputWrapper>
                <InputIcon>
                  <FaDollarSign />
                </InputIcon>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  hasIcon
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="orgId">Organization ID</Label>
              <Input
                id="orgId"
                placeholder="Enter organization ID"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
              />
            </FormGroup>
            <SwitchWrapper>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={recurring}
                  onChange={() => setRecurring(!recurring)}
                />
                <SwitchSlider />
              </Switch>
              <Label>Make this a recurring donation</Label>
            </SwitchWrapper>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateDonation} disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  Processing...
                </>
              ) : (
                'Create Donation'
              )}
            </Button>
          </CardFooter>
        </Card>

        <DonationList>
          <h2>Recent Donations</h2>
          {loading ? (
            <Card>
              <CardContent>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <Spinner size={24} />
                </div>
              </CardContent>
            </Card>
          ) : donations.length > 0 ? (
            donations.map((donation) => (
              <DonationCard key={donation.id}>
                <DonationContent>
                  <DonationInfo>
                    <Amount>
                      ${donation.amount}
                      {donation.recurring && (
                        <Badge>
                          <FaSync size={10} />
                          Recurring
                        </Badge>
                      )}
                    </Amount>
                    <p>Organization ID: {donation.organization_id}</p>
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>
                      {new Date(donation.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </DonationInfo>
                  <DeleteButton onClick={() => handleDeleteDonation(donation.id)}>
                    <FaTrash />
                  </DeleteButton>
                </DonationContent>
              </DonationCard>
            ))
          ) : (
            <Card>
              <CardContent>
                <p style={{ textAlign: 'center', color: '#666' }}>
                  No donations found. Make your first donation above!
                </p>
              </CardContent>
            </Card>
          )}
        </DonationList>

        {totalPages > 1 && (
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </Pagination>
        )}
      </ContentWrapper>
      <ToastContainer />
    </Container>
  );
}

export default Donations;