import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const backgroundImage = { uri: 'https://wallpaperaccess.com/full/1125319.jpg' };
const runningIcon = { uri: 'https://www.iconsdb.com/icons/preview/white/running-man-xxl.png' };

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <Image source={runningIcon} style={styles.icon} />
        <Text style={styles.title}>Спортивный трекер</Text>
        <Text style={styles.subtitle}>Начни свой путь к цели сегодня</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/tracker')}>
          <Text style={styles.buttonText}>Перейти к трекеру</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/modal/about')}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>О приложении</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
  },
});
