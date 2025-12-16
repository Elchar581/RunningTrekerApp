import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Определяем тип для объекта пробежки
type Run = {
  id: string;
  distance: number; // в км
  time: number; // в секундах
};


// Функция для форматирования времени
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours > 0 ? hours + 'ч ' : ''}${minutes}м ${seconds}с`;
};

export default function TrackerScreen() {
  const [runs, setRuns] = useState<Run[]>([]);

  const loadRuns = useCallback(async () => {
    try {
      const storedRuns = await AsyncStorage.getItem('runs');
      if (storedRuns !== null) {
        setRuns(JSON.parse(storedRuns));
      }
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось загрузить пробежки.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRuns();
    }, [loadRuns])
  );

  const sortByBest = () => {
    const sortedRuns = [...runs].sort((a, b) => (a.time / a.distance) - (b.time / b.distance));
    setRuns(sortedRuns);
  };

  const sortByWorst = () => {
    const sortedRuns = [...runs].sort((a, b) => (b.time / b.distance) - (a.time / a.distance));
    setRuns(sortedRuns);
  };

  const renderItem = ({ item }: { item: Run }) => (
    <View style={styles.runItem}>
      <FontAwesome name="road" size={24} color="#333" />
      <View style={styles.runDetails}>
        <Text style={styles.runText}>{item.distance} км</Text>
        <Text style={styles.runSubText}>Дистанция</Text>
      </View>
      <FontAwesome name="clock-o" size={24} color="#333" />
      <View style={styles.runDetails}>
        <Text style={styles.runText}>{formatTime(item.time)}</Text>
        <Text style={styles.runSubText}>Время</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.title}>Мои пробежки</Text>
      
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={sortByBest}>
          <Text style={styles.sortButtonText}>Лучший результат</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={sortByWorst}>
          <Text style={styles.sortButtonText}>Худший результат</Text>
        </TouchableOpacity>
      </View>

      {runs.length > 0 ? (
        <FlatList
          data={runs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>У вас пока нет пробежек. Начните сегодня!</Text>
        </View>
      )}

      <Link href="/modal/addRun" asChild>
          <TouchableOpacity style={styles.addButton}>
              <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  sortButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    width: '100%',
  },
  runItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  runDetails: {
    alignItems: 'center',
  },
  runText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  runSubText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
