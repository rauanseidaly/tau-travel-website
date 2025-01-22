import { Box, VStack, Image, Text, Heading, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const trails = [
    { id: 1, name: "Medeu - Shymbulak", distance: "8 km", difficulty: "Medium", image: "/images/image1-medeo.jpg" },
    { id: 2, name: "Kok-Zhaylyau", distance: "5 km", difficulty: "Easy", image: "/images/image4-kokzhailau.jpg" },
    { id: 3, name: "Big Almaty Lake", distance: "15 km", difficulty: "Easy", image: "/images/image3-bao.jpeg" },
    { id: 4, name: "Furmanovka", distance: "10 km", difficulty: "Hard", image: "/images/image2-furmanov.jpg" },
    { id: 5, name: "Butakov Gorge", distance: "7 km", difficulty: "Medium", image: "/images/image5-butakov.jpg" }
];

const TrailList = () => {
    const [sortType, setSortType] = useState("");
    const [sortedTrails, setSortedTrails] = useState([...trails]);

    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        setSortType(sortValue);
        let sortedArray = [...trails];

        if (sortValue === "name") {
            sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === "difficulty") {
            const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
            sortedArray.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        } else if (sortValue === "distance") {
            sortedArray.sort((a, b) => parseInt(a.distance) - parseInt(b.distance));
        }
        
        setSortedTrails(sortedArray);
    };

    return (
        <Flex w="100%" justifyContent="center" pt="50px">
            <VStack w="80%" spacing="20px">
                <Heading>Mountain Trails</Heading>
                
                {/* Dropdown for sorting */}
                <Select placeholder="Sort by" onChange={handleSortChange} w="50%">
                    <option value="name">Alphabetical Order</option>
                    <option value="difficulty">Difficulty Level</option>
                    <option value="distance">Distance</option>
                </Select>
                
                <Flex wrap="wrap" justifyContent="center" gap="20px">
                    {sortedTrails.map((trail, index) => (
                        <Link to={`/trails/${trail.id}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box 
                                w="300px" 
                                borderRadius="10px" 
                                overflow="hidden" 
                                boxShadow="md"
                                bg="white"
                                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                            >
                                <Image src={trail.image} alt={trail.name} w="100%" h="200px" objectFit="cover" />
                                <VStack p="10px" align="start">
                                    <Heading size="md">{trail.name}</Heading>
                                    <Text>Distance: {trail.distance}</Text>
                                    <Text color={trail.difficulty === "Hard" ? "red.500" : trail.difficulty === "Medium" ? "orange.500" : "green.500"}>
                                        Difficulty: {trail.difficulty}
                                    </Text>
                                </VStack>
                            </Box>
                        </Link>
                    ))}
                </Flex>
            </VStack>
        </Flex>
    );
};

export default TrailList;