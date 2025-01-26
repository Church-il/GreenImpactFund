import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AccountCircle, Favorite, History, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const DashboardWrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #fce4ec);
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
  transform: ${(props) => (props.fadeIn ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const Heading = styled.h4`
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #1e88e5;
`;

const SubHeading = styled.p`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: #616161;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 40px;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h6`
  font-weight: bold;
  margin-top: 1rem;
  color: #424242;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #757575;
  margin-top: 1rem;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.6rem 1.5rem;
  background-color: #42a5f5;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1e88e5;
  }
`;

function Dashboard() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  const features = [
    {
      title: 'Manage Profile',
      description: 'Update your personal details and preferences.',
      icon: <AccountCircle sx={{ fontSize: 40, color: '#42a5f5' }} />,
      link: '/profile',
    },
    {
      title: 'Your Donations',
      description: 'View and track your donation history.',
      icon: <Favorite sx={{ fontSize: 40, color: '#ef5350' }} />,
      link: '/donations',
    },
    {
      title: 'Donation History',
      description: 'Check past contributions and manage receipts.',
      icon: <History sx={{ fontSize: 40, color: '#66bb6a' }} />,
      link: '/history',
    },
    {
      title: 'Settings',
      description: 'Customize your account preferences.',
      icon: <Settings sx={{ fontSize: 40, color: '#ffa726' }} />,
      link: '/settings',
    },
  ];

  return (
    <DashboardWrapper fadeIn={fadeIn}>
      <Heading>Welcome to Your Dashboard!</Heading>
      <SubHeading>Manage your donations, profile, and settings from here.</SubHeading>
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
}

export default Dashboard;
