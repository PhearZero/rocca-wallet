# Rocca Wallet

## Overview

Rocca Wallet is a hybrid decentralized identity solution that combines the interoperability of OpenID Connect for
Verifiable Credentials (OIDC4VC) with the security and transparency of the Algorand blockchain. This architecture
enables users to manage their digital identities through standards-based credential exchange while leveraging Algorand's
high-performance blockchain for state management and transaction recording.

### Key Features

- **OIDC4VC Integration**: Implements OpenID Connect for Verifiable Credentials protocol, enabling seamless credential
  issuance and verification with existing identity providers and relying parties
- **Algorand Blockchain Backend**: Utilizes Algorand's layer-1 blockchain for:
  - Immutable credential state tracking and revocation management
  - Transaction recording with instant finality and low fees
  - Decentralized identifier (DID) resolution and management
  - Smart contract-based credential schemas and verification policies
- **Hybrid Architecture**: Combines off-chain credential presentation (for privacy) with on-chain state anchoring (for
  verifiability)
- **Cross-Platform Support**: Built with Expo/React Native for iOS, Android, and web platforms
- **Self-Sovereign Identity**: Users maintain full control over their credentials and identity data

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   yarn start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Requirements

See [REQUIREMENTS.md](./REQUIREMENTS.md) for a detailed list of application requirements.
