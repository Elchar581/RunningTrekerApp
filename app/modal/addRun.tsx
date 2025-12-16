import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddRunModal() {
  const router = useRouter();
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSave = async () => {
    if (!distance || !minutes || !seconds) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const newRun = {
      id: Date.now().toString(),
      distance: parseFloat(distance),
      time: (parseInt(hours) || 0) * 3600 + parseInt(minutes) * 60 + parseInt(seconds),
    };

    try {
      const existingRuns = await AsyncStorage.getItem('runs');
      const runs = existingRuns ? JSON.parse(existingRuns) : [];
      runs.push(newRun);
      await AsyncStorage.setItem('runs', JSON.stringify(runs));
      router.back();
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось сохранить пробежку.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Добавить пробежку</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Дистанция (км)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="Часы"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <TextInput
          style={styles.timeInput}
          placeholder="Минуты"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
        <TextInput
          style={styles.timeInput}
          placeholder="Секунды"
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
        />
      </View>

      <Button title="Сохранить" onPress={handleSave} />
      <View style={{ marginTop: 10 }}>
        <Button title="Отмена" onPress={() => router.back()} color="#ff6347"/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '30%',
  },
});
