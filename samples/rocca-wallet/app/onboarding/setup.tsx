import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Storage } from '@/src/utils/storage'

export default function Setup() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSetup = async () => {
    setIsGenerating(true)
    // Simulate key generation and wallet configuration
    setTimeout(async () => {
      const masterKeyPair = {
        publicKey: 'algo-pub-key-' + Math.random().toString(36).substring(7),
        privateKey: 'algo-priv-key-' + Math.random().toString(36).substring(7),
      }

      await Storage.saveMasterKeyPair(masterKeyPair)

      // Generate initial wallet
      await Storage.addWallet({
        id: '1',
        name: 'Primary Algorand Wallet',
        address: masterKeyPair.publicKey,
        type: 'Algorand',
      })

      await Storage.setOnboarded(true)
      setIsGenerating(false)
      router.replace('/(main)/home')
    }, 2000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting up your Wallet</Text>
      <Text style={styles.description}>
        We are generating your secure cryptographic keys and configuring your connection to the Algorand blockchain and
        OIDC4VC providers.
      </Text>
      {isGenerating ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Generating keys...</Text>
        </View>
      ) : (
        <Button title="Start Configuration" onPress={handleSetup} />
      )}
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
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#444',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
})
