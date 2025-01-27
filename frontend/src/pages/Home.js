import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';

const HeroSection = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #81c784, #66bb6a);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const SubText = styled.p`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 30px;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const LearnButton = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #1b5e20;
  }
`;

const OrganizationsTitle = styled.h4`
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
  color: #2e7d32;
`;

const OrganizationsSubText = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const OrganizationCard = styled.div`
  height: 100%;
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const OrganizationImage = styled.img`
  height: 160px;
  object-fit: cover;
`;

const OrganizationContent = styled.div`
  padding: 20px;
  text-align: center;
  flex-grow: 1;
`;

const OrgName = styled.h6`
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 10px;
`;

const OrgDescription = styled.p`
  color: #616161;
  margin-bottom: 20px;
  font-style: italic;
  font-size: 0.95rem;
`;

const DonateButton = styled.button`
  margin-top: auto;
  padding: 8px 16px;
  background-color: #66bb6a;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #388e3c;
  }
`;

function Home() {
  const [organizations, setOrganizations] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  // Get authentication status
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');  // Redirect to login if not authenticated
    } else {
      async function fetchOrganizations() {
        try {
          const response = await axios.get('http://127.0.0.1:5000/organizations');
          setOrganizations(response.data.organizations);
        } catch (error) {
          console.error('Error fetching organizations:', error);
        }
      }
      fetchOrganizations();
    }
  }, [isAuthenticated, navigate]);  // Re-run effect when authentication status changes

  if (!isAuthenticated) {
    return null;  // You could show a loading state or redirect to login
  }

  return (
    <PageWrapper>
      <HeroSection>
        <Title>Together for the Planet</Title>
        <SubText>
        Imagine a world where forests thrive, oceans flourish, and clean air is a reality for all. By supporting impactful organizations, you become a force for change—protecting ecosystems, fighting climate change, and building a sustainable future. Together, we can restore nature’s balance, empower communities, and leave a legacy of hope for generations to come. Let’s unite to safeguard our planet, one act of generosity at a time.
        </SubText>
        <LearnButton>
          Learn How Donations Help
        </LearnButton>
      </HeroSection>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <OrganizationsTitle>
          Explore Environmental Organizations
        </OrganizationsTitle>
        <OrganizationsSubText>
        Explore organizations devoted to restoring lush forests, safeguarding endangered wildlife, reducing harmful carbon emissions, and promoting innovative solutions for a sustainable future. Each cause holds the power to create positive change—choose one that inspires you and take the first step toward making a lasting difference. Together, we can build a healthier planet and secure a brighter future for generations to come.
        </OrganizationsSubText>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {organizations.map((org) => (
            <div key={org.id} style={{ flex: '1 0 30%' }}>
              <OrganizationCard>
                {org.image && <OrganizationImage src={org.image} alt={`${org.name} logo`} />}
                <OrganizationContent>
                  <OrgName>{org.name}</OrgName>
                  <OrgDescription>
                    {org.description.length > 100
                      ? `${org.description.substring(0, 100)}...`
                      : org.description}
                  </OrgDescription>
                  <DonateButton onClick={() => window.location.href = `/donate/${org.id}`}>
                    Donate Now
                  </DonateButton>
                </OrganizationContent>
              </OrganizationCard>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
