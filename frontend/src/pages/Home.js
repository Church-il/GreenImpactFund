import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;

const HeroSection = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #81c784, #66bb6a);
  color: white;
  border-radius: 20px;
  margin-bottom: 50px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SubText = styled.p`
  max-width: 850px;
  margin: 0 auto;
  margin-bottom: 40px;
  line-height: 1.6;
  font-size: 1.2rem;
  color: #f1f1f1;
`;

const LearnButton = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 14px 28px;
  font-size: 1.1rem;
  border-radius: 40px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #1b5e20;
    transform: scale(1.05);
  }
`;

const OrganizationsTitle = styled.button`
  display: inline-block;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: white;
  background-color: #2e7d32;
  border: none;
  font-size: 1.3rem;
  padding: 14px 24px;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #1b5e20;
    transform: scale(1.05);
  }
`;

const OrganizationsSubText = styled.p`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 50px;
  line-height: 1.6;
  font-size: 1.15rem;
  color: #616161;
`;

const OrganizationCard = styled.div`
  height: 100%;
  border-radius: 20px;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 8px 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const OrganizationImage = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${OrganizationCard}:hover & {
    transform: scale(1.1);
  }
`;

const OrganizationContent = styled.div`
  padding: 25px;
  text-align: center;
  flex-grow: 1;
  background-color: #ffffff;
  border-top: 1px solid #f1f1f1;
`;

const OrgName = styled.h6`
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 12px;
  font-size: 1.2rem;
`;

const OrgDescription = styled.p`
  color: #616161;
  margin-bottom: 20px;
  font-style: italic;
  font-size: 1rem;
`;

const DonateButton = styled.button`
  margin-top: auto;
  padding: 12px 24px;
  background-color: #66bb6a;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #388e3c;
    transform: scale(1.05);
  }
`;

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else {
      async function fetchOrganizations() {
        try {
          const response = await axios.get(`${API_URL}/organizations`);
          setOrganizations(response.data.organizations);
        } catch (error) {
          console.error('Error fetching organizations:', error);
        }
      }
      fetchOrganizations();
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageWrapper>
      <HeroSection>
        <Title>Together for the Planet</Title>
        <SubText>
          Imagine a world where forests thrive, oceans flourish, and clean air is a reality for all. By supporting impactful organizations, you become a force for change—protecting ecosystems, fighting climate change, and building a sustainable future. Together, we can restore nature’s balance, empower communities, and leave a legacy of hope for generations to come. Let’s unite to safeguard our planet, one act of generosity at a time.
        </SubText>
        <LearnButton onClick={() => navigate('/donation-impact')}>
          Learn How Donations Help
        </LearnButton>
      </HeroSection>

      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <OrganizationsTitle onClick={() => navigate('/organizations')}>
          Explore Environmental Organizations
        </OrganizationsTitle>
        <OrganizationsSubText>
          Explore organizations devoted to restoring lush forests, safeguarding endangered wildlife, reducing harmful carbon emissions, and promoting innovative solutions for a sustainable future. Each cause holds the power to create positive change—choose one that inspires you and take the first step toward making a lasting difference. Together, we can build a healthier planet and secure a brighter future for generations to come.
        </OrganizationsSubText>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {organizations.map((org) => (
            <div key={org.id} style={{ flex: '1 0 28%' }}>
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
