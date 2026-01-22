import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { Storage } from '@/src/utils/storage'
import { useRouter } from 'expo-router'

export default function Settings() {
  const router = useRouter()
  const [algorandNode] = useState('Mainnet')
  const [didResolver] = useState('Universal Resolver')

  const handleReset = async () => {
    Alert.alert('Reset Demo', 'This will clear all saved wallets and onboarding status. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await Storage.clearAll()
          router.replace('/')
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Providers</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Algorand Node</Text>
          <Text style={styles.settingValue}>{algorandNode}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>DID Resolver</Text>
          <Text style={styles.settingValue}>{didResolver}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>OIDC4VC Issuer</Text>
          <Text style={styles.settingValue}>https://issuer.rocca-wallet.io</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Auto-fee Coverage</Text>
          <Switch value={true} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug / Demo</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleReset}>
          <Text style={[styles.settingLabel, { color: 'red' }]}>Reset Demo Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 15,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
})
