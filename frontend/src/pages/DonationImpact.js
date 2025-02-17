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
  { id: 1, title: 'Clean Water in Turkana', img: 'http://www.visitturkanaland.com/wp-content/uploads/2014/03/Fiebig-Turkana-7687-900x528.jpg', desc: 'A borehole was drilled to provide fresh water to thousands in Turkana County.' },
  { id: 2, title: 'Solar Power in Kajiado', img: 'https://cyteksolar.com/wp-content/uploads/2024/02/IMG_24951-1-scaled.jpg', desc: 'Solar energy is lighting up homes and schools in remote villages.' },
  { id: 3, title: 'Mangrove Conservation in Kwale', img: 'https://avianreport.com/wp-content/uploads/2018/04/34495210173_0313efca78_c.jpg-blue-forest-_optimized.jpg', desc: 'Local communities are restoring mangrove forests to protect the coast.' },
  { id: 4, title: 'Organic Farming in Murang’a', img: 'https://cdn.wikifarmer.com/images/detailed/2024/06/Organic-Farming-2.jpg', desc: 'Farmers adopt eco-friendly techniques to increase productivity.' },
  { id: 5, title: 'Tree Planting in Nyeri', img: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg?as=webp', desc: 'Over 1 million trees planted to combat deforestation.' },
  { id: 6, title: 'Wildlife Protection in Narok', img: 'http://pre-webunwto.s3.eu-west-1.amazonaws.com/inline-images/rinocerontes.jpg', desc: 'Conservation efforts are saving elephants and lions.' },
  { id: 7, title: 'Eco-Tourism in Laikipia', img: 'https://wandersky.in/wp-content/uploads/2024/07/eco-tourism-in-uttarakhand-2024.png', desc: 'Sustainable tourism is benefiting local communities and wildlife.' },
  { id: 8, title: 'Waste Management in Nairobi', img: 'https://cegkenya.org/wp-content/uploads/2020/01/solid-waste-management.jpg', desc: 'Recycling programs are reducing landfill waste in the capital.' },
  { id: 9, title: 'School Gardens in Kisumu', img: 'https://assets.globalpartnership.org/s3fs-public/styles/standard_blog_banner/public/21631659089_6d03ac524a_k.jpg?VersionId=ro.30NGeJBVzX3mCl4dD62BJHHANq7rd&itok=beM2yz79', desc: 'Students learn about farming through hands-on experience.' },
  { id: 10, title: 'Bamboo Housing in Kitui', img: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/01/13/1IMG-3754.1578920354.9581.jpg', desc: 'Eco-friendly bamboo houses provide affordable shelter.' },
  { id: 11, title: 'Clean Energy in Marsabit', img: 'https://constructionreviewonline.com/wp-content/uploads/2024/04/US3.jpg', desc: 'Wind turbines now power remote communities.' },
  { id: 12, title: 'Water Harvesting in Garissa', img: '', desc: 'Rainwater collection helps families survive droughts.' },
  { id: 13, title: 'Bee Farming in Bungoma', img: 'https://ogden_images.s3.amazonaws.com/www.iamcountryside.com/images/sites/4/2019/04/13133030/DSC_7203-1026x826-768x618.jpg', desc: 'Sustainable beekeeping boosts honey production and income.' },
  { id: 14, title: 'Plastic-Free Coast in Mombasa', img: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', desc: 'Beach clean-ups and bans on single-use plastics are making a difference.' },
  { id: 15, title: 'Fish Farming in Homabay', img: 'https://5.imimg.com/data5/SELLER/Default/2023/5/309749650/DU/QS/MY/101059949/fish-farming-service.jpg', desc: 'New fish farming methods are improving nutrition and livelihoods.' },
  { id: 16, title: 'Indigenous Tree Revival in Embu', img: 'https://modscape.com.au/wp-content/uploads/2024/03/DN82_Blog-Revival-5.jpg', desc: 'Communities revive indigenous trees for biodiversity.' },
  { id: 17, title: 'Urban Greening in Thika', img: 'https://safiorganics.co.ke/wp-content/uploads/2023/12/images_theconversation_com-file-20190502-103060-k5jeic.webp', desc: 'Green spaces are improving air quality in the city.' },
  { id: 18, title: 'Sustainable Fashion in Eldoret', img: '', desc: 'Recycled materials are used for eco-friendly clothing.' },
  { id: 19, title: 'Organic Tea Farming in Kericho', img: 'https://safiorganics.co.ke/wp-content/uploads/2021/12/i0_wp_com-TEA-farmers-in-kenya.webp', desc: 'Sustainable tea production benefits farmers and the environment.' },
  { id: 20, title: 'Renewable Energy in Nakuru', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fDB8fHww', desc: 'Solar and wind energy solutions are growing in Nakuru.' },
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
