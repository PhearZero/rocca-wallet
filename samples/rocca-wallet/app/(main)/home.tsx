import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Storage, Wallet } from '@/src/utils/storage'

export default function Home() {
  const router = useRouter()
  const [wallets, setWallets] = useState<Wallet[]>([])

  useEffect(() => {
    loadWallets()
  }, [])

  const loadWallets = async () => {
    const storedWallets = await Storage.getWallets()
    setWallets(storedWallets)
  }

  const handleGenerateWallet = async () => {
    const masterKey = await Storage.getMasterKeyPair()
    if (!masterKey) return

    const newWallet: Wallet = {
      id: Date.now().toString(),
      name: `Wallet ${wallets.length + 1}`,
      // In a real app, we would derive a new address from the master key
      address: `${masterKey.publicKey.substring(0, 15)}...${Math.random().toString(36).substring(7)}`,
      type: 'Algorand',
    }

    await Storage.addWallet(newWallet)
    await loadWallets()
    Alert.alert('Success', 'New wallet generated from your master key pair!')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rocca Wallet</Text>
        <TouchableOpacity onPress={() => router.push('/(main)/settings')}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Algorand Wallets</Text>
          <TouchableOpacity onPress={handleGenerateWallet}>
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {wallets.map((wallet, i) => (
          <View key={i} style={styles.walletRow}>
            <View>
              <Text style={styles.walletName}>{wallet.name}</Text>
              <Text style={styles.walletAddress}>{wallet.address}</Text>
            </View>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceText}>0.00 ALGO</Text>
            </View>
          </View>
        ))}

        <View style={{ marginTop: 10 }}>
          <Text style={styles.subtitle}>Assets in Primary Wallet</Text>
          <View style={styles.assetRow}>
            <Text>ALGO</Text>
            <Text>100.00</Text>
          </View>
          <View style={styles.assetRow}>
            <Text>USDC (ASA)</Text>
            <Text>50.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Identity (OIDC4VC)</Text>
        <View style={styles.credentialRow}>
          <Ionicons name="person-circle-outline" size={32} color="#007AFF" />
          <View style={styles.credentialInfo}>
            <Text style={styles.credentialName}>Verified Person</Text>
            <Text style={styles.credentialIssuer}>Issued by: Rocca IDP</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    marginTop: 5,
    fontWeight: '600',
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  walletName: {
    fontSize: 16,
    fontWeight: '500',
  },
  walletAddress: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'monospace',
  },
  balanceInfo: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  credentialInfo: {
    marginLeft: 15,
  },
  credentialName: {
    fontSize: 16,
    fontWeight: '600',
  },
  credentialIssuer: {
    fontSize: 12,
    color: '#666',
  },
})
