import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ToursScreen = () => {
    const navigation = useNavigation();
    const [tours] = useState([
        { id: 1, name: 'Поход на Эльбрус' },
        { id: 2, name: 'Путешествие по Алтаю' }
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Туры</Text>
            <FlatList
                data={tours}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.tourItem}
                        onPress={() => navigation.navigate('TourDetails', { tourId: item.id })}
                    >
                        <Text style={styles.tourName}>{item.name}</Text>
                        <View style={styles.trailList}>
                            <Text style={styles.trailPlaceholder}>Здесь будут маршруты</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Button title="Создать тур" onPress={() => navigation.navigate('CreateTour')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    tourItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10
    },
    tourName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    trailList: {
        marginTop: 10,
        height: 100,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    trailPlaceholder: {
        color: 'gray'
    }
});

export default ToursScreen;
