import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import { FiChevronUp, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Tooltip from 'react-tooltip';

const API_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;

const HeroSection = styled.div`
  text-align: center;
  padding: 100px 20px;
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  color: white;
  border-radius: 16px;
  margin-bottom: 80px;
  box-shadow: 0px 12px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('your-background-image.jpg') center center no-repeat;
    background-size: cover;
    opacity: 0.3;
  }
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 3.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
`;

const SubText = styled.p`
  font-family: 'Roboto', sans-serif;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 40px;
  line-height: 1.8;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
`;

const LearnButton = styled.button`
  background-color: #ff4081;
  color: white;
  padding: 16px 30px;
  font-size: 1.3rem;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #c60055;
    transform: translateY(-4px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 12px rgba(255, 64, 129, 0.6);
  }
`;

const SearchWrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  padding: 14px 25px;
  width: 80%;
  max-width: 450px;
  font-size: 1.1rem;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ff4081;
    box-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
  }
`;

const ProgressBarWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  width: 90%;
  max-width: 600px;
  padding: 12px 20px;
  border-radius: 50px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
`;

const ProgressText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  color: #333;
`;

const ProgressIndicator = styled.div`
  height: 8px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 50px;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background-color: #ff4081;
    transition: width 0.4s ease-in-out;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const OrganizationCard = styled.div`
  height: 100%;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.2);
  }
`;

const OrganizationImage = styled(LazyLoadImage)`
  height: 220px;
  object-fit: cover;
  width: 100%;
`;

const OrganizationContent = styled.div`
  padding: 20px;
  text-align: center;
  flex-grow: 1;
`;

const OrgName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const OrgDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #616161;
  font-size: 1rem;
  line-height: 1.6;
`;

const DonateButton = styled.button`
  background-color: #ff4081;
  color: white;
  padding: 12px 28px;
  border-radius: 30px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #c60055;
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #ff4081;
  color: white;
  padding: 16px;
  border-radius: 50%;
  border: none;
  font-size: 1.5rem;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #c60055;
    transform: translateY(-3px);
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #ff4081;
  color: white;
  padding: 16px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c60055;
  }

  &:focus {
    outline: none;
  }
`;

const TestimonialsCarousel = styled.div`
  margin-top: 80px;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 16px;
`;

const Testimonial = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const TestimonialText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  color: #616161;
  font-size: 1.2rem;
  line-height: 1.5;
`;

const TestimonialAuthor = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #333;
  margin-top: 10px;
`;

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [donationProgress, setDonationProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/organizations`).then((response) => {
      setOrganizations(response.data);
    });

    axios.get(`${API_URL}/donation-progress`).then((response) => {
      setDonationProgress(response.data.progress);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonateClick = (orgId) => {
    navigate(`/donate/${orgId}`);
  };

  return (
    <PageWrapper>
      <HeroSection>
        <Title>Change the World with Your Donation</Title>
        <SubText>
          Join us in supporting environmental preservation and social change. Make a difference with just a few clicks!
        </SubText>
        <LearnButton onClick={() => navigate('/about')}>Learn More</LearnButton>
      </HeroSection>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search for organizations..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchWrapper>
      <CardContainer>
        {filteredOrganizations.map((org) => (
          <motion.div key={org.id} whileHover={{ scale: 1.05 }}>
            <OrganizationCard>
              <OrganizationImage src={org.image} alt={org.name} />
              <OrganizationContent>
                <OrgName>{org.name}</OrgName>
                <OrgDescription>{org.description}</OrgDescription>
                <DonateButton onClick={() => handleDonateClick(org.id)}>
                  Donate Now
                </DonateButton>
              </OrganizationContent>
            </OrganizationCard>
          </motion.div>
        ))}
      </CardContainer>
      <ProgressBarWrapper>
        <ProgressText>Donation Progress</ProgressText>
        <ProgressIndicator progress={donationProgress} />
      </ProgressBarWrapper>
      <TestimonialsCarousel>
        {[
          {
            text: "This platform has helped me donate to amazing causes! I love being part of the change.",
            author: "Jane Doe",
          },
          {
            text: "I'm so glad to support environmental preservation with a few simple clicks.",
            author: "John Smith",
          },
        ].map((testimonial, index) => (
          <Testimonial key={index}>
            <TestimonialText>{testimonial.text}</TestimonialText>
            <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
          </Testimonial>
        ))}
      </TestimonialsCarousel>
      <FloatingActionButton onClick={() => navigate('/donate')}>+</FloatingActionButton>
      <BackToTopButton onClick={() => window.scrollTo(0, 0)}>
        <FiChevronUp />
      </BackToTopButton>
    </PageWrapper>
  );
};

export default Home;
