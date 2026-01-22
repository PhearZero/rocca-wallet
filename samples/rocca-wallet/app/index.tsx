import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { Storage } from '../src/utils/storage'
import { View, ActivityIndicator } from 'react-native'

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOnboarded, setIsOnboarded] = useState(false)

  useEffect(() => {
    Storage.isOnboarded().then((onboarded) => {
      setIsOnboarded(onboarded)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding/welcome" />
  }

  return <Redirect href="/(main)/home" />
}
