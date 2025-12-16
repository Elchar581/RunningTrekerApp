import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>О приложении</Text>
      <Text style={styles.text}>
        Добро пожаловать в ваш личный трекер пробежек! Это приложение создано для тех, кто стремится к новым достижениям и хочет видеть свой прогресс каждый день. Легко добавляйте свои тренировки, отслеживайте дистанцию и время, анализируйте результаты с помощью удобной сортировки. Превратите каждую пробежку в шаг к своей цели, фиксируйте рекорды и вдохновляйтесь на большее. Начните свой путь к лучшей версии себя прямо сейчас — просто, удобно и всегда под рукой!
      </Text>
      <Button title="Назад" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
