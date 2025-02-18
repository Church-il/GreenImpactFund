import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AccountCircle, Favorite, History, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;

const DashboardWrapper = styled.div`
  padding: 3rem;
  min-height: 100vh;
  background: url('/images/eco.jpg') no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
  transform: ${(props) => (props.fadeIn ? 'translateY(0)' : 'translateY(30px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;
`;

const Heading = styled.h1`
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: rgb(9, 26, 110);
  letter-spacing: 1px;
  font-size: 2.5rem;
`;

const SubHeading = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: #000000;
  margin-bottom: 4rem;
  line-height: 1.5;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  transform: scale(1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 50px;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-weight: 700;
  font-size: 1.4rem;
  color: #424242;
  margin-top: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #757575;
  margin-top: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  padding: 0.7rem 1.8rem;
  background-color: #42a5f5;
  color: white;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #6e11e5;
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const HomeButton = styled(Link)`
  padding: 0.7rem 1.8rem;
  background-color: #42a5f5;
  color: white;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgb(226, 7, 7);
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const Dashboard = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  const features = [
    {
      title: 'Manage Profile',
      description: 'Update your personal details and preferences to tailor your experience.',
      icon: <AccountCircle style={{ fontSize: 50, color: '#42a5f5' }} />,
      link: '/profile',
    },
    {
      title: 'Your Donations',
      description: 'View, manage, and track your donations and their impact.',
      icon: <Favorite style={{ fontSize: 50, color: '#ef5350' }} />,
      link: '/donations',
    },
    {
      title: 'Donation History',
      description: 'Review past donations and manage your receipts for tax purposes.',
      icon: <History style={{ fontSize: 50, color: '#66bb6a' }} />,
      link: '/donations',
    },
    {
      title: 'Settings',
      description: 'Customize your account preferences for a better experience.',
      icon: <Settings style={{ fontSize: 50, color: '#ffa726' }} />,
      link: '/settings',
    },
  ];

  return (
    <DashboardWrapper fadeIn={fadeIn}>
      <HomeButton to="/">Home</HomeButton>
      <Heading>Welcome to Your Dashboard!</Heading>
      <SubHeading>
        Easily manage your donations, track progress, update settings, and more. Let's make an impact together!
      </SubHeading>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <CardContent>
              <CardIcon>{feature.icon}</CardIcon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
              <ExploreButton to={feature.link}>Explore</ExploreButton>
            </CardContent>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </DashboardWrapper>
  );
};

export default Dashboard;
