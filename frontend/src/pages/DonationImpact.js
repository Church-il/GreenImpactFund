import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const ImpactContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #555;
  line-height: 1.8;
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const StoryCard = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StoryContent = styled.div`
  padding: 20px;
`;

const StoryTitle = styled.h4`
  color: #2e7d32;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const StoryDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const stories = [
  { id: 1, title: 'Water for the Maasai', img: '/images/maasai.jpg', desc: 'A new well brings clean water to remote Maasai communities in Kenya.' },
  { id: 2, title: 'Forests Reborn in the Amazon', img: '/images/amazon.jpg', desc: 'Massive tree-planting efforts are restoring the lungs of our planet.' },
  { id: 3, title: 'Solar Energy in Rural India', img: '/images/india.jpg', desc: 'Families in rural India now have access to renewable solar energy.' },
  { id: 4, title: 'School Gardens in Uganda', img: '/images/uganda.jpg', desc: 'Kids in Uganda learn farming and sustainability in new school gardens.' },
  { id: 5, title: 'Plastic-Free Bali', img: '/images/bali.jpg', desc: 'Community efforts make Bali’s beaches cleaner and greener.' },
  { id: 6, title: 'Saving the Coral Reefs', img: '/images/coral.jpg', desc: 'Marine projects are reviving endangered coral reefs worldwide.' },
  { id: 7, title: 'Urban Farming in NYC', img: '/images/nyc.jpg', desc: 'New York communities turn rooftops into lush vegetable gardens.' },
  { id: 8, title: 'Eco-Friendly Homes in Ghana', img: '/images/ghana.jpg', desc: 'Affordable, sustainable homes improve lives and protect the environment.' },
  { id: 9, title: 'Rewilding Scotland', img: '/images/scotland.jpg', desc: 'Efforts to restore Scotland’s natural wilderness and biodiversity.' },
  { id: 10, title: 'Mangrove Revival in Bangladesh', img: '/images/mangrove.jpg', desc: 'Mangrove restoration projects protect coastlines from erosion.' },
  { id: 11, title: 'Clean Air in Mexico City', img: '/images/mexico.jpg', desc: 'Innovative urban solutions reduce pollution and improve air quality.' },
  { id: 12, title: 'Bamboo Housing in the Philippines', img: '/images/philippines.jpg', desc: 'Sustainable bamboo homes offer storm-resistant, eco-friendly shelter.' },
  { id: 13, title: 'Wildlife Protection in Namibia', img: '/images/namibia.jpg', desc: 'Conservation projects protect endangered species in Africa.' },
  { id: 14, title: 'Green Transport in Amsterdam', img: '/images/amsterdam.jpg', desc: 'The cycling revolution reduces emissions and promotes health.' },
  { id: 15, title: 'Sustainable Fishing in the Pacific', img: '/images/fishing.jpg', desc: 'Local fishermen adopt sustainable methods to preserve marine life.' },
];

const DonationImpact = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <ImpactContainer>
        <Title>The Impact of Your Donations</Title>
        <Subtitle>
          Every contribution, big or small, creates a ripple effect of positive change. Explore real stories from different parts of the world where donations have transformed lives and protected our planet.
        </Subtitle>
        <StoriesGrid>
          {stories.map((story) => (
            <StoryCard key={story.id}>
              <StoryImage src={story.img} alt={story.title} />
              <StoryContent>
                <StoryTitle>{story.title}</StoryTitle>
                <StoryDescription>{story.desc}</StoryDescription>
              </StoryContent>
            </StoryCard>
          ))}
        </StoriesGrid>
      </ImpactContainer>
    </PageWrapper>
  );
};

export default DonationImpact;
