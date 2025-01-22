import { Box, VStack, Image, Text, Heading, Button, Flex, Divider, Badge, Stack } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

const trails = [
    { id: 1, name: "Medeu - Shymbulak", distance: "8 km", difficulty: "Medium", images: ["/images/image1-medeo.jpg", "/images/image1-medeo-2.jpg", "/images/image1-medeo-3.jpg"], description: "A scenic route connecting Medeu and Shymbulak with beautiful mountain views.", rating: 4.5, reviews: ["Amazing trail with great views!", "A bit challenging but worth it!"] },
    { id: 2, name: "Kok-Zhaylyau", distance: "5 km", difficulty: "Easy", images: ["/images/image4-kokzhailau.jpg", "/images/image4-kokzhailau-2.jpg", "/images/image4-kokzhailau-3.jpg"], description: "A picturesque valley with lush greenery, perfect for a relaxed hike.", rating: 4.7, reviews: ["Beautiful and peaceful!", "Great for beginners."] },
    { id: 3, name: "Big Almaty Lake", distance: "15 km", difficulty: "Easy", images: ["/images/image3-bao.jpeg", "/images/image3-bao-2.jpeg", "/images/image3-bao-3.jpeg"], description: "A stunning alpine lake surrounded by breathtaking mountain peaks.", rating: 4.8, reviews: ["Absolutely stunning!", "A must-visit place!"] },
    { id: 4, name: "Furmanovka", distance: "10 km", difficulty: "Hard", images: ["/images/image2-furmanov.jpg", "/images/image2-furmanov-2.jpg", "/images/image2-furmanov-3.jpg"], description: "A challenging trail with rewarding panoramic views from the summit.", rating: 4.3, reviews: ["Difficult but the view is worth it!", "One of the best hikes!"] },
    { id: 5, name: "Butakov Gorge", distance: "7 km", difficulty: "Medium", images: ["/images/image5-butakov.jpg", "/images/image5-butakov-2.jpg", "/images/image5-butakov-3.jpg"], description: "A beautiful gorge with waterfalls and diverse flora.", rating: 4.6, reviews: ["Lovely hike with waterfalls!", "Great for a day trip."] }
];

const TrailDetail = () => {
    const { id } = useParams();
    const trail = trails.find(t => t.id === parseInt(id));

    if (!trail) {
        return <Text>Trail not found</Text>;
    }

    return (
        <Flex w="100%" justifyContent="center" pt="50px" bg="gray.50" p={5}>
            <VStack w="80%" spacing="30px" align="center" bg="white" p={8} borderRadius="10px" boxShadow="lg">
                <Heading>{trail.name}</Heading>
                <Stack direction={{ base: "column", md: "row" }} spacing={5} justify="center">
                    {trail.images.map((img, index) => (
                        <Image key={index} src={img} alt={trail.name} w={{ base: "100%", md: "30%" }} h="250px" objectFit="cover" borderRadius="10px" boxShadow="md" />
                    ))}
                </Stack>
                <Text fontSize="lg" textAlign="center" px={5}>{trail.description}</Text>
                <Flex justify="center" align="center" wrap="wrap" gap={3}>
                    <Badge colorScheme="blue">Distance: {trail.distance}</Badge>
                    <Badge colorScheme={trail.difficulty === "Hard" ? "red" : trail.difficulty === "Medium" ? "orange" : "green"}>Difficulty: {trail.difficulty}</Badge>
                    <Badge colorScheme="yellow">Rating: {trail.rating} ⭐</Badge>
                </Flex>
                <Divider />
                <Heading size="md">Reviews</Heading>
                <VStack spacing={3} align="start" w="100%">
                    {trail.reviews.map((review, index) => (
                        <Box key={index} p={3} bg="gray.100" w="100%" borderRadius="5px" boxShadow="sm">
                            <Text fontStyle="italic">"{review}"</Text>
                        </Box>
                    ))}
                </VStack>
                <Link to="/trails">
                    <Button colorScheme="blue" size="lg">Back to Trails</Button>
                </Link>
            </VStack>
        </Flex>
    );
};

export default TrailDetail;
