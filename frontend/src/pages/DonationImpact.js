import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const ImpactContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #0f9d58, #34a853);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 30px;
  color: #f0f0f0;
  line-height: 1.8;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  outline: none;
  margin-bottom: 20px;
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const StoryCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  filter: brightness(90%);
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(60%);
  }
`;

const StoryContent = styled.div`
  padding: 20px;
`;

const StoryTitle = styled.h4`
  color: #2e7d32;
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const StoryDescription = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
`;

const LocationTag = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 150, 50, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const ProgressBarContainer = styled.div`
  background: #ddd;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 10px;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #0f9d58;
  width: ${(props) => props.width}%;
`;

const DarkModeToggle = styled.button`
  background: #222;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background: #444;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  text-align: center;
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
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageWrapper style={{ background: darkMode ? "#121212" : "#ffffff" }}>
      <ImpactContainer>
        <Title>Impact of Your Donations</Title>
        <Subtitle>See how your contributions are changing lives across Kenya.</Subtitle>
        <SearchBar
          type="text"
          placeholder="Search for an impact story..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <StoriesGrid>
          {filteredStories.map((story) => (
            <StoryCard key={story.id} onClick={() => setSelectedStory(story)}>
              <LocationTag>{story.location}</LocationTag>
              <StoryImage src={story.img} alt={story.title} />
              <StoryContent>
                <StoryTitle>{story.title}</StoryTitle>
                <StoryDescription>{story.desc}</StoryDescription>
                <ProgressBarContainer>
                  <ProgressBar width={story.impact} />
                </ProgressBarContainer>
              </StoryContent>
            </StoryCard>
          ))}
        </StoriesGrid>
        <DarkModeToggle onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </DarkModeToggle>
      </ImpactContainer>
      {selectedStory && (
        <Modal onClick={() => setSelectedStory(null)}>
          <ModalContent>
            <h2>{selectedStory.title}</h2>
            <p>{selectedStory.desc}</p>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  );
};
export default DonationImpact;
