import { Text, VStack, Flex, Box, Heading, HStack, Image, Button, Spacer } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { get_user_profile_data, get_users_posts, toggleFollow } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";

import Post from "../components/post";

const UserProfile = () => {
    const get_username_from_url = () => {
        const url_split = window.location.pathname.split('/');
        return url_split[url_split.length-1]
    }

    const [username, setUsername] = useState(get_username_from_url())

    useEffect(() => {
        setUsername(get_username_from_url())
    }, [])

    return (
        <Flex w='100%' justifyContent='center' bg='gray.100' p='40px'>
            <VStack w='75%' spacing='40px'>
                <Box w='100%' bg='white' p='40px' borderRadius='lg' boxShadow='lg'>
                    <UserDetails username={username} />
                </Box>
                <Box w='100%' bg='white' p='40px' borderRadius='lg' boxShadow='lg'>
                    <UserPosts username={username} />
                </Box>
            </VStack>
        </Flex>
    )
}

const UserDetails = ({username}) => {
    const [loading, setLoading] = useState(true)
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const [isOurProfile, setIsOurProfile] = useState(false)
    const [following, setFollowing] = useState(false)

    const handleToggleFollow = async () => {
        const data = await toggleFollow(username);
        setFollowerCount(data.now_following ? followerCount + 1 : followerCount - 1)
        setFollowing(data.now_following)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_user_profile_data(username);
                setBio(data.bio)
                setProfileImage(data.profile_image ? `${SERVER_URL}${data.profile_image}` : '/default-avatar.png');
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)
                setIsOurProfile(data.is_our_profile)
                setFollowing(data.following)
            } catch {
                console.log('error')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <VStack w='100%' alignItems='center' spacing='20px'>
            <Heading fontSize='2xl' color='gray.700'>@{username}</Heading>
            <HStack spacing='30px' align='center'>
                <Box boxSize='150px' borderRadius='full' overflow='hidden' boxShadow='md'>
                    <Image src={loading ? '/default-avatar.png' : profileImage} boxSize='100%' objectFit='cover' />
                </Box>
                <VStack spacing='10px'>
                    <HStack spacing='30px' fontSize='16px' fontWeight='bold'>
                        <VStack>
                            <Text color='gray.600'>Followers</Text>
                            <Text color='gray.800'>{ loading ? '-' : followerCount}</Text>
                        </VStack>
                        <VStack>
                            <Text color='gray.600'>Following</Text>
                            <Text color='gray.800'>{ loading ? '-' : followingCount}</Text>
                        </VStack>
                    </HStack>
                    { loading ? <Spacer /> : 
                        isOurProfile ?
                            <Button w='100%' colorScheme='green' onClick={() => window.location.href = '/settings'}>Edit Profile</Button>
                        :
                            <Button onClick={handleToggleFollow} colorScheme={following ? "gray" : "blue"} w='100%'>
                                {following ? 'Unfollow' : 'Follow'}
                            </Button>
                    }
                </VStack>
            </HStack>
            <Text fontSize='18px' color='gray.600' textAlign='center'>{ loading ? '-' : bio}</Text>
        </VStack>
    )
}

const UserPosts = ({username}) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await get_users_posts(username);
                console.log("Fetched posts:", data);
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Ошибка загрузки постов:", error);
                alert("Ошибка загрузки постов");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [username]);

    return (
        <Flex w='100%' wrap='wrap' spacing='20px' pb='50px' justifyContent='center'>
            {loading ?
                <Text>Загрузка постов...</Text>
            :
                (Array.isArray(posts) && posts.length > 0) ?
                    posts.map((post) => (
                        <Post key={post.id} {...post} />
                    ))
                :
                    <Text>Нет постов</Text>
            }
        </Flex>
    )
}

export default UserProfile
