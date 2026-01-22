import { View, Text, Button, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function Welcome() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Rocca Wallet</Text>
      <Text style={styles.subtitle}>Your hybrid OIDC4VC and Algorand solution.</Text>
      <Button title="Get Started" onPress={() => router.push('/onboarding/setup')} />
    </View>
  )
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
})
