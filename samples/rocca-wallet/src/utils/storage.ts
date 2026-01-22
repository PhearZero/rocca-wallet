import AsyncStorage from '@react-native-async-storage/async-storage'

const ONBOARDING_STATUS_KEY = 'rocca_onboarded'
const MASTER_KEY_PAIR_KEY = 'rocca_master_key_pair'
const WALLETS_KEY = 'rocca_wallets'

export interface Wallet {
  id: string
  name: string
  address: string
  type: 'Algorand' | 'OIDC4VC'
}

export const Storage = {
  async isOnboarded(): Promise<boolean> {
    const value = await AsyncStorage.getItem(ONBOARDING_STATUS_KEY)
    return value === 'true'
  },

  async setOnboarded(status: boolean): Promise<void> {
    await AsyncStorage.setItem(ONBOARDING_STATUS_KEY, status.toString())
  },

  async saveMasterKeyPair(keyPair: { publicKey: string; privateKey: string }): Promise<void> {
    await AsyncStorage.setItem(MASTER_KEY_PAIR_KEY, JSON.stringify(keyPair))
  },

  async getMasterKeyPair(): Promise<{ publicKey: string; privateKey: string } | null> {
    const value = await AsyncStorage.getItem(MASTER_KEY_PAIR_KEY)
    return value ? JSON.parse(value) : null
  },

  async getWallets(): Promise<Wallet[]> {
    const value = await AsyncStorage.getItem(WALLETS_KEY)
    return value ? JSON.parse(value) : []
  },

  async saveWallets(wallets: Wallet[]): Promise<void> {
    await AsyncStorage.setItem(WALLETS_KEY, JSON.stringify(wallets))
  },

  async addWallet(wallet: Wallet): Promise<void> {
    const wallets = await this.getWallets()
    wallets.push(wallet)
    await this.saveWallets(wallets)
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([ONBOARDING_STATUS_KEY, MASTER_KEY_PAIR_KEY, WALLETS_KEY])
  },
}
