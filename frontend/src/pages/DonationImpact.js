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
  { id: 1, title: 'Clean Water in Turkana', img: '/images/turkana.jpg', desc: 'A borehole was drilled to provide fresh water to thousands in Turkana County.' },
  { id: 2, title: 'Solar Power in Kajiado', img: '/images/kajiado.jpg', desc: 'Solar energy is lighting up homes and schools in remote villages.' },
  { id: 3, title: 'Mangrove Conservation in Kwale', img: '/images/kwale.jpg', desc: 'Local communities are restoring mangrove forests to protect the coast.' },
  { id: 4, title: 'Organic Farming in Murang’a', img: '/images/muranga.jpg', desc: 'Farmers adopt eco-friendly techniques to increase productivity.' },
  { id: 5, title: 'Tree Planting in Nyeri', img: '/images/nyeri.jpg', desc: 'Over 1 million trees planted to combat deforestation.' },
  { id: 6, title: 'Wildlife Protection in Narok', img: '/images/narok.jpg', desc: 'Conservation efforts are saving elephants and lions.' },
  { id: 7, title: 'Eco-Tourism in Laikipia', img: '/images/laikipia.jpg', desc: 'Sustainable tourism is benefiting local communities and wildlife.' },
  { id: 8, title: 'Waste Management in Nairobi', img: '/images/nairobi.jpg', desc: 'Recycling programs are reducing landfill waste in the capital.' },
  { id: 9, title: 'School Gardens in Kisumu', img: '/images/kisumu.jpg', desc: 'Students learn about farming through hands-on experience.' },
  { id: 10, title: 'Bamboo Housing in Kitui', img: '/images/kitui.jpg', desc: 'Eco-friendly bamboo houses provide affordable shelter.' },
  { id: 11, title: 'Clean Energy in Marsabit', img: '/images/marsabit.jpg', desc: 'Wind turbines now power remote communities.' },
  { id: 12, title: 'Water Harvesting in Garissa', img: '/images/garissa.jpg', desc: 'Rainwater collection helps families survive droughts.' },
  { id: 13, title: 'Bee Farming in Bungoma', img: '/images/bungoma.jpg', desc: 'Sustainable beekeeping boosts honey production and income.' },
  { id: 14, title: 'Plastic-Free Coast in Mombasa', img: '/images/mombasa.jpg', desc: 'Beach clean-ups and bans on single-use plastics are making a difference.' },
  { id: 15, title: 'Fish Farming in Homabay', img: '/images/homabay.jpg', desc: 'New fish farming methods are improving nutrition and livelihoods.' },
  { id: 16, title: 'Indigenous Tree Revival in Embu', img: '/images/embu.jpg', desc: 'Communities revive indigenous trees for biodiversity.' },
  { id: 17, title: 'Urban Greening in Thika', img: '/images/thika.jpg', desc: 'Green spaces are improving air quality in the city.' },
  { id: 18, title: 'Sustainable Fashion in Eldoret', img: '/images/eldoret.jpg', desc: 'Recycled materials are used for eco-friendly clothing.' },
  { id: 19, title: 'Organic Tea Farming in Kericho', img: '/images/kericho.jpg', desc: 'Sustainable tea production benefits farmers and the environment.' },
  { id: 20, title: 'Renewable Energy in Nakuru', img: '/images/nakuru.jpg', desc: 'Solar and wind energy solutions are growing in Nakuru.' },
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
