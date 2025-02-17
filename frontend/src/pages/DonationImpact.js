import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { FiX, FiArrowUp, FiInfo } from 'react-icons/fi';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const StoryImage = styled.div`
  width: 100%;
  height: 240px;
  background: #eee url(${props => props.src}) center/cover;
  position: relative;
  transition: transform 0.3s ease;
  loading: lazy;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  }
`;

const StoryCard = styled.article`
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    
    ${StoryImage} {
      transform: scale(1.05);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #2e7d32;
    outline-offset: 2px;
  }
`;

const ImpactContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    border-radius: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: block;
  text-align: center; 

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #2e7d32;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: #5a5a5a;
  line-height: 1.8;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const StoryContent = styled.div`
  padding: 1.5rem;
  position: relative;
  background: #fff;
`;

const StoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StoryStats = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const StatItem = React.memo(styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.color || '#e8f5e9'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #1b5e20;

  svg {
    margin-right: 0.5rem;
  }
`);

const StoryDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, ${props => props.show ? '0.6' : '0'});
  backdrop-filter: blur(${props => props.show ? '8px' : '0'});
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  transform: scale(${props => props.show ? 1 : 0.95});
  transition: all 0.3s ease-in-out;
  position: relative;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  position: relative;
  height: 300px;
  background: url(${props => props.bg}) center/cover;
`;

const ModalBody = styled.div`
  padding: 2.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 300px);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ModalText = styled.p`
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #fff;
    transform: rotate(90deg);
  }
`;

const DonateButton = styled.button`
  background: #2e7d32;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  &:hover {
    background: #1b5e20;
    transform: translateY(-2px);
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #1b5e20;
    transform: translateY(-3px);
  }
`;

const stories = [
  {
    id: 1,
    title: 'Clean Water in Turkana',
    img: 'https://constructiontoday.co.ke/wp-content/uploads/2021/04/McCurry-clean-water.jpg',
    desc: 'A borehole was drilled to provide fresh water to thousands in Turkana County.',
    extendedDesc: `In the arid regions of Turkana County, access to clean water was a daily struggle for over 50,000 residents. Our initiative drilled 12 boreholes across the region, each reaching depths of 200-300 meters. This project now provides 5 million liters of clean water monthly, reducing waterborne diseases by 60% and allowing children (especially girls) to spend 4 more hours in school daily instead of fetching water.`,
    stats: [
      { label: 'People Helped', value: '50,000+', color: '#e8f5e9' },
      { label: 'Water Output', value: '5M liters/mo', color: '#e3f2fd' },
      { label: 'Disease Reduction', value: '60%', color: '#f3e5f5' }
    ]
  },
  {
    id: 2,
    title: 'Solar Power in Kajiado',
    img: 'https://cyteksolar.com/wp-content/uploads/2024/02/IMG_24951-1-scaled.jpg',
    desc: 'Solar energy is lighting up homes and schools in remote villages.',
    extendedDesc: `Over 300 solar panel systems installed across Kajiado County now provide clean energy to 1,200 households and 15 schools. This initiative has reduced kerosene use by 90% in target communities, saving families an average of $15 monthly on energy costs. School performance improved by 40% with extended study hours.`,
    stats: [
      { label: 'Homes Powered', value: '1,200', color: '#fff8e1' },
      { label: 'CO₂ Reduction', value: '120 tons/yr', color: '#fbe9e7' },
      { label: 'Schools Supported', value: '15', color: '#e8f5e9' }
    ]
  },
  {
    id: 3,
    title: 'Mangrove Conservation in Kwale',
    img: 'https://avianreport.com/wp-content/uploads/2018/04/34495210173_0313efca78_c.jpg-blue-forest-_optimized.jpg',
    desc: 'Local communities are restoring mangrove forests to protect the coast.',
    extendedDesc: `Community-led mangrove restoration has replanted 85 hectares of coastal ecosystem, increasing fish populations by 35% and protecting 12 villages from coastal erosion. The project created 120 green jobs and trained 300+ locals in sustainable aquaculture techniques.`,
    stats: [
      { label: 'Area Restored', value: '85 hectares', color: '#e0f7fa' },
      { label: 'Jobs Created', value: '120', color: '#f3e5f5' },
      { label: 'Species Protected', value: '15+', color: '#e8f5e9' }
    ]
  },
  {
    id: 4,
    title: 'Organic Farming in Murang’a',
    img: 'https://cdn.wikifarmer.com/images/detailed/2024/06/Organic-Farming-2.jpg',
    desc: 'Farmers adopt eco-friendly techniques to increase productivity.',
    extendedDesc: `Training 450 smallholder farmers in organic practices increased yields by 25% while reducing chemical inputs by 100%. The program established 3 farmer cooperatives and connected producers directly to Nairobi markets, increasing incomes by 40% on average.`,
    stats: [
      { label: 'Farmers Trained', value: '450', color: '#f0f4c3' },
      { label: 'Yield Increase', value: '25%', color: '#c8e6c9' },
      { label: 'New Markets', value: '3', color: '#fff9c4' }
    ]
  },
  {
    id: 5,
    title: 'Tree Planting in Nyeri',
    img: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg?as=webp',
    desc: 'Over 1 million trees planted to combat deforestation.',
    extendedDesc: `A massive reforestation effort engaged 25,000 volunteers to plant 1.2 million indigenous trees across 600 hectares. The project created microclimates that increased rainfall by 15% in the region and established 8 community-managed nurseries for ongoing sustainability.`,
    stats: [
      { label: 'Trees Planted', value: '1.2M', color: '#c8e6c9' },
      { label: 'Volunteers', value: '25,000', color: '#f0f4c3' },
      { label: 'Rainfall Increase', value: '15%', color: '#e0f7fa' }
    ]
  },
  {
    id: 6,
    title: 'Wildlife Protection in Narok',
    img: 'http://pre-webunwto.s3.eu-west-1.amazonaws.com/inline-images/rinocerontes.jpg',
    desc: 'Conservation efforts are saving elephants and lions.',
    extendedDesc: `Anti-poaching initiatives and community education reduced wildlife crime by 65% in the Greater Mara ecosystem. The program deployed 25 new rangers, established 3 wildlife corridors, and saw a 20% increase in lion populations over 3 years.`,
    stats: [
      { label: 'Poaching Reduction', value: '65%', color: '#ffcdd2' },
      { label: 'New Rangers', value: '25', color: '#c8e6c9' },
      { label: 'Lion Population', value: '+20%', color: '#fff9c4' }
    ]
  },
  {
    id: 7,
    title: 'Eco-Tourism in Laikipia',
    img: 'https://wandersky.in/wp-content/uploads/2024/07/eco-tourism-in-uttarakhand-2024.png',
    desc: 'Sustainable tourism is benefiting local communities and wildlife.',
    extendedDesc: `Development of 5 eco-lodges created 300 jobs while generating $2M annual revenue shared with local communities. Tourist education programs reduced habitat disturbance by 40% and funded 4 new conservation research projects.`,
    stats: [
      { label: 'Jobs Created', value: '300', color: '#e8f5e9' },
      { label: 'Revenue Generated', value: '$2M/yr', color: '#f0f4c3' },
      { label: 'New Research', value: '4 projects', color: '#e0f7fa' }
    ]
  },
  {
    id: 8,
    title: 'Waste Management in Nairobi',
    img: 'https://cegkenya.org/wp-content/uploads/2020/01/solid-waste-management.jpg',
    desc: 'Recycling programs are reducing landfill waste in the capital.',
    extendedDesc: `A city-wide recycling initiative diverted 45% of waste from landfills through 50 neighborhood collection centers and 3 material recovery facilities. The program created 800 green jobs and educated 200,000 residents on waste sorting.`,
    stats: [
      { label: 'Waste Diverted', value: '45%', color: '#c8e6c9' },
      { label: 'Collection Centers', value: '50', color: '#fff9c4' },
      { label: 'Jobs Created', value: '800', color: '#e8f5e9' }
    ]
  },
  {
    id: 9,
    title: 'School Gardens in Kisumu',
    img: 'https://assets.globalpartnership.org/s3fs-public/styles/standard_blog_banner/public/21631659089_6d03ac524a_k.jpg?VersionId=ro.30NGeJBVzX3mCl4dD62BJHHANq7rd&itok=beM2yz79',
    desc: 'Students learn about farming through hands-on experience.',
    extendedDesc: `35 schools established productive gardens providing 40% of school meal ingredients while teaching 12,000 students sustainable agriculture. The program increased vegetable consumption by 300% and improved science scores by 25%.`,
    stats: [
      { label: 'Schools Involved', value: '35', color: '#e0f7fa' },
      { label: 'Food Produced', value: '40%', color: '#c8e6c9' },
      { label: 'Students Reached', value: '12,000', color: '#fff9c4' }
    ]
  },
  {
    id: 10,
    title: 'Bamboo Housing in Kitui',
    img: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/01/13/1IMG-3754.1578920354.9581.jpg',
    desc: 'Eco-friendly bamboo houses provide affordable shelter.',
    extendedDesc: `Innovative bamboo construction techniques built 450 climate-resilient homes, reducing construction costs by 40% compared to conventional methods. The project trained 200 artisans and sequesters 150 tons of CO₂ annually through bamboo growth.`,
    stats: [
      { label: 'Homes Built', value: '450', color: '#e8f5e9' },
      { label: 'Cost Savings', value: '40%', color: '#f0f4c3' },
      { label: 'CO₂ Sequestered', value: '150t/yr', color: '#c8e6c9' }
    ]
  },
  {
    id: 11,
    title: 'Clean Energy in Marsabit',
    img: 'https://constructionreviewonline.com/wp-content/uploads/2024/04/US3.jpg',
    desc: 'Wind turbines now power remote communities.',
    extendedDesc: `A 15-turbine wind farm generates 18MW of clean energy, powering 30,000 homes and replacing diesel generators. The project reduced energy costs by 60% and created 120 permanent technical jobs in maintenance and operations.`,
    stats: [
      { label: 'Energy Output', value: '18MW', color: '#e0f7fa' },
      { label: 'Homes Powered', value: '30,000', color: '#fff9c4' },
      { label: 'Cost Reduction', value: '60%', color: '#c8e6c9' }
    ]
  },
  {
    id: 12,
    title: 'Water Harvesting in Garissa',
    img: 'https://smartwatermagazine.com/sites/default/files/styles/thumbnail-830x455/public/children-playing-water-ethiopia-pixabay.jpg?itok=EU3ukPXX',
    desc: 'Rainwater collection helps families survive droughts.',
    extendedDesc: `Construction of 800 rainwater harvesting systems captures 15 million liters annually, providing drought resilience for 5,000 families. The project reduced water collection time from 4 hours to 30 minutes daily and improved crop yields by 70% through irrigation.`,
    stats: [
      { label: 'Water Captured', value: '15M liters', color: '#e8f5e9' },
      { label: 'Time Saved', value: '3.5h/day', color: '#f0f4c3' },
      { label: 'Yield Increase', value: '70%', color: '#c8e6c9' }
    ]
  },
  {
    id: 13,
    title: 'Bee Farming in Bungoma',
    img: 'https://ogden_images.s3.amazonaws.com/www.iamcountryside.com/images/sites/4/2019/04/13133030/DSC_7203-1026x826-768x618.jpg',
    desc: 'Sustainable beekeeping boosts honey production and income.',
    extendedDesc: `Training 300 farmers in modern apiculture increased honey yields from 5kg to 25kg per hive annually. The cooperative established 2 processing facilities and exports to 5 countries, increasing incomes by 400% for participating families.`,
    stats: [
      { label: 'Farmers Trained', value: '300', color: '#fff9c4' },
      { label: 'Yield Increase', value: '500%', color: '#c8e6c9' },
      { label: 'Export Markets', value: '5', color: '#e0f7fa' }
    ]
  },
  {
    id: 14,
    title: 'Plastic-Free Coast in Mombasa',
    img: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    desc: 'Beach clean-ups and bans on single-use plastics are making a difference.',
    extendedDesc: `A coastal initiative removed 120 tons of plastic waste, engaged 10,000 volunteers, and convinced 350 businesses to switch to biodegradable alternatives. Marine turtle nests increased by 30% following cleanup efforts.`,
    stats: [
      { label: 'Waste Removed', value: '120 tons', color: '#e8f5e9' },
      { label: 'Businesses Changed', value: '350', color: '#f0f4c3' },
      { label: 'Turtle Nests', value: '+30%', color: '#c8e6c9' }
    ]
  },
  {
    id: 15,
    title: 'Fish Farming in Homabay',
    img: 'https://5.imimg.com/data5/SELLER/Default/2023/5/309749650/DU/QS/MY/101059949/fish-farming-service.jpg',
    desc: 'New fish farming methods are improving nutrition and livelihoods.',
    extendedDesc: `Aquaculture cooperatives increased fish production from 2 to 12 tons monthly, providing protein for 15,000 people. The project trained 450 farmers in sustainable practices and established cold-chain distribution to urban markets.`,
    stats: [
      { label: 'Production Increase', value: '600%', color: '#e0f7fa' },
      { label: 'People Fed', value: '15,000', color: '#fff9c4' },
      { label: 'Farmers Trained', value: '450', color: '#c8e6c9' }
    ]
  },
  {
    id: 16,
    title: 'Indigenous Tree Revival in Embu',
    img: 'https://modscape.com.au/wp-content/uploads/2024/03/DN82_Blog-Revival-5.jpg',
    desc: 'Communities revive indigenous trees for biodiversity.',
    extendedDesc: `Reintroduction of 18 native tree species across 200 hectares restored local ecosystems, increased bird species by 40%, and revived traditional herbal medicine practices. The project created 75 nursery jobs and sells carbon credits internationally.`,
    stats: [
      { label: 'Species Reintroduced', value: '18', color: '#e8f5e9' },
      { label: 'Habitat Restored', value: '200ha', color: '#f0f4c3' },
      { label: 'Bird Species', value: '+40%', color: '#c8e6c9' }
    ]
  },
  {
    id: 17,
    title: 'Urban Greening in Thika',
    img: 'https://safiorganics.co.ke/wp-content/uploads/2023/12/images_theconversation_com-file-20190502-103060-k5jeic.webp',
    desc: 'Green spaces are improving air quality in the city.',
    extendedDesc: `Creation of 12 urban parks and 8km of green corridors reduced PM2.5 levels by 35% in central Thika. The project engaged 5,000 residents in tree planting and created 50 maintenance jobs while increasing property values by 20% in greened areas.`,
    stats: [
      { label: 'Air Quality', value: '35% better', color: '#c8e6c9' },
      { label: 'Green Space', value: '12 parks', color: '#e0f7fa' },
      { label: 'Jobs Created', value: '50', color: '#fff9c4' }
    ]
  },
  {
    id: 18,
    title: 'Sustainable Fashion in Eldoret',
    img: 'https://img.freepik.com/premium-photo/ankara-kaba-styles-2024_861346-80506.jpg',
    desc: 'Recycled materials are used for eco-friendly clothing.',
    extendedDesc: `A textile recycling hub processes 8 tons of waste monthly into fashionable garments, employing 200 women. The initiative reduced textile waste by 65% in Eldoret while increasing artisan incomes by 300% through premium eco-branding.`,
    stats: [
      { label: 'Waste Processed', value: '8t/mo', color: '#e8f5e9' },
      { label: 'Artisans Employed', value: '200', color: '#f0f4c3' },
      { label: 'Income Growth', value: '300%', color: '#c8e6c9' }
    ]
  },
  {
    id: 19,
    title: 'Organic Tea Farming in Kericho',
    img: 'https://safiorganics.co.ke/wp-content/uploads/2021/12/i0_wp_com-TEA-farmers-in-kenya.webp',
    desc: 'Sustainable tea production benefits farmers and the environment.',
    extendedDesc: `Conversion of 1,200 hectares to organic tea production increased prices by 25% while reducing chemical runoff by 100%. The program certified 650 farmers in organic methods and established direct trade relationships with 8 European buyers.`,
    stats: [
      { label: 'Organic Land', value: '1,200ha', color: '#e0f7fa' },
      { label: 'Price Premium', value: '25%', color: '#fff9c4' },
      { label: 'New Buyers', value: '8', color: '#c8e6c9' }
    ]
  },
  {
    id: 20,
    title: 'Renewable Energy in Nakuru',
    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fDB8fHww',
    desc: 'Solar and wind energy solutions are growing in Nakuru.',
    extendedDesc: `A hybrid renewable energy park with 5 wind turbines and 12,000 solar panels now powers 25% of Nakuru's households. The $15M project created 200 construction jobs and 50 permanent positions while reducing city emissions by 18,000 tons annually.`,
    stats: [
      { label: 'Energy Output', value: '32MW', color: '#e8f5e9' },
      { label: 'Homes Powered', value: '45,000', color: '#f0f4c3' },
      { label: 'Emissions Reduced', value: '18kt/yr', color: '#c8e6c9' }
    ]
  },
  
  {
  id: 21,
  title: 'Community Irrigation in Kisii',
  img: 'https://www.davisinstruments.com/cdn/shop/articles/iStock_000019952631_Large-scaled-1_1200x800.jpg?v=1693260107',
  desc: 'Sustainable irrigation systems supporting 5,000 smallholder farmers.',
  extendedDesc: `A network of 15 community-managed irrigation schemes now waters 1,200 hectares of farmland in Kisii. The project trained 800 farmers in water conservation techniques, increasing crop yields by 65% and providing year-round water access through rainwater harvesting reservoirs.`,
  stats: [
    { label: 'Farmers Trained', value: '5,000', color: '#e0f7fa' },
    { label: 'Land Irrigated', value: '1,200ha', color: '#fff9c4' },
    { label: 'Yield Increase', value: '65%', color: '#c8e6c9' }
  ]
}
];
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <ImpactContainer>
    <Title>Something Went Wrong</Title>
    <Subtitle>
      {error.message}
    </Subtitle>
    <DonateButton onClick={resetErrorBoundary}>
      Try Again
    </DonateButton>
  </ImpactContainer>
);

const DonationImpact = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleExpandStory = (story) => {
    try {
      setModalContent(story);
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    } catch (err) {
      setError(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />;
  }

  return (
    <PageWrapper>
      <ImpactContainer>
        <Title>Transforming Lives Through Giving</Title>
        <Subtitle>
          Witness the tangible impact of generosity. Each story represents lives changed, ecosystems restored, 
          and communities empowered through sustainable solutions.
        </Subtitle>

        <StoriesGrid>
          {stories.map((story) => (
            <StoryCard 
              key={story.id} 
              onClick={() => handleExpandStory(story)}
              role="button"
              tabIndex="0"
            >
              <StoryImage 
                src={story.img} 
                aria-label={`${story.title} project image`}
              >
                <StoryTitle>{story.title}</StoryTitle>
              </StoryImage>
              <StoryContent>
                <StoryStats>
                  {story.stats.map((stat, index) => (
                    <StatItem key={index} color={stat.color}>
                      <FiInfo aria-hidden="true" />
                      <div>
                        <div>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem' }}>{stat.label}</div>
                      </div>
                    </StatItem>
                  ))}
                </StoryStats>
                <StoryDescription>{story.desc}</StoryDescription>
              </StoryContent>
            </StoryCard>
          ))}
        </StoriesGrid>

        <ScrollTopButton 
          visible={showScrollTop} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} aria-hidden="true" />
        </ScrollTopButton>
      </ImpactContainer>

      <ModalOverlay show={showModal} onClick={closeModal}>
        <ModalContent show={showModal} onClick={(e) => e.stopPropagation()}>
          <ModalHeader bg={modalContent.img}>
            <CloseButton 
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FiX size={24} aria-hidden="true" />
            </CloseButton>
          </ModalHeader>
          
          <ModalBody>
            <ModalTitle>{modalContent.title}</ModalTitle>
            <StoryStats>
              {modalContent.stats?.map((stat, index) => (
                <StatItem key={index} color={stat.color}>
                  <FiInfo aria-hidden="true" />
                  <div>
                    <div>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem' }}>{stat.label}</div>
                  </div>
                </StatItem>
              ))}
            </StoryStats>
            <ModalText>{modalContent.extendedDesc}</ModalText>
            <DonateButton 
              onClick={() => navigate('/donations')}
              aria-label="Support similar projects"
            >
              Support Similar Projects
            </DonateButton>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </PageWrapper>
  );
};

export default DonationImpact;