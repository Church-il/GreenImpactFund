import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import { FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;

const HeroSection = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #81c784, #66bb6a);
  color: white;
  border-radius: 12px;
  margin-bottom: 60px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 3rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const SubText = styled.p`
  max-width: 850px;
  margin: 0 auto;
  margin-bottom: 40px;
  line-height: 1.7;
  font-size: 1.2rem;
  color: #f1f1f1;
`;

const LearnButton = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 14px 28px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #1b5e20;
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(46, 125, 50, 0.5);
  }
`;

const SearchWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  padding: 12px 25px;
  width: 80%;
  max-width: 400px;
  font-size: 1rem;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #66bb6a;
  }
`;

const Tagline = styled.blockquote`
  font-size: 1.3rem;
  font-style: italic;
  color: #2e7d32;
  margin: 60px 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ProgressIndicator = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #66bb6a;
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const OrganizationsTitle = styled.h4`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #2e7d32;
  font-size: 1.6rem;
  text-transform: uppercase;
`;

const OrganizationsSubText = styled.p`
  text-align: center;
  max-width: 850px;
  margin: 0 auto;
  margin-bottom: 50px;
  line-height: 1.7;
  font-size: 1.1rem;
  color: #616161;
`;

const OrganizationCard = styled.div`
  height: 100%;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const OrganizationImage = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

const OrganizationContent = styled.div`
  padding: 20px;
  text-align: center;
  flex-grow: 1;
  background-color: #fafafa;
`;

const OrgName = styled.h5`
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 12px;
  font-size: 1.4rem;
`;

const OrgDescription = styled.p`
  color: #616161;
  margin-bottom: 24px;
  font-style: italic;
  font-size: 1rem;
`;

const DonateButton = styled.button`
  padding: 10px 20px;
  background-color: #66bb6a;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(102, 187, 106, 0.5);
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #66bb6a;
  color: white;
  padding: 14px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }

  &:focus {
    outline: none;
  }
`;

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [donationProgress, setDonationProgress] = useState(75); // Placeholder for donation progress
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search Organizations"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchWrapper>

      <Tagline>"Together, we can build a sustainable future for generations to come."</Tagline>

      <ProgressIndicator>
        {donationProgress}% Donated
      </ProgressIndicator>

      <OrganizationsTitle>Explore Environmental Organizations</OrganizationsTitle>
      <OrganizationsSubText>
        Explore organizations devoted to restoring lush forests, safeguarding endangered wildlife, reducing harmful carbon emissions, and promoting innovative solutions for a sustainable future. Each cause holds the power to create positive change—choose one that inspires you and take the first step toward making a lasting difference. Together, we can build a healthier planet and secure a brighter future for generations to come.
      </OrganizationsSubText>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredOrganizations.map((org) => (
          <div key={org.id} style={{ flex: '1 0 30%', maxWidth: '300px' }}>
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

      <BackToTopButton onClick={() => window.scrollTo(0, 0)}>
        <FiChevronUp />
      </BackToTopButton>
    </PageWrapper>
  );
}

export default Home;
