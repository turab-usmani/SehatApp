# Sehat App

Sehat is a comprehensive healthcare management application built with React Native and Expo. It helps users manage their medical appointments, track medications, and maintain their medical history.

## Features

- **User Authentication**: Secure login and registration system
- **Doctor Search**: Find and book appointments with doctors
- **Appointment Management**: Schedule, view, and manage medical appointments
- **Medication Tracker**: Track medications, dosages, and schedules
- **Medical History**: Maintain a comprehensive record of medical conditions, allergies, and family history

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sehatapp.git
   cd sehatapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx expo start
   ```

## Running the App

### On a Physical Device

1. Install the Expo Go app on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code displayed in your terminal or browser with:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

### On an Emulator/Simulator

1. For iOS (requires macOS):
   ```
   npx expo start --ios
   ```

2. For Android:
   ```
   npx expo start --android
   ```

3. For web:
   ```
   npx expo start --web
   ```

## Project Structure

```
sehatapp/
├── assets/            # Images, fonts, and other static assets
├── components/        # Reusable UI components
├── screens/           # App screens
├── App.js             # Main application component
├── app.json           # Expo configuration
└── package.json       # Project dependencies
```

## Key Components

- **Header**: Reusable navigation header with back button
- **DoctorSearchScreen**: Search and filter doctors
- **DoctorProfileScreen**: View detailed doctor information
- **AppointmentScreen**: Book and manage appointments
- **MedicationTrackerScreen**: Track medications and schedules
- **MedicalHistoryScreen**: Manage medical history records

## Development

### Adding a New Screen

1. Create a new file in the `screens` directory
2. Import necessary components and define your screen
3. Add the screen to the navigation in `App.js`

### Styling

The app uses a consistent styling approach with:
- Primary color: `#007AFF`
- Background colors: `#f8f8f8` for containers, `#fff` for cards
- Text colors: `#333` for headings, `#666` for body text

## Troubleshooting

- **Expo Go not connecting**: Ensure your device and computer are on the same network
- **Dependencies issues**: Try running `npm install` again
- **Build errors**: Clear the cache with `npx expo start -c`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Ionicons](https://ionic.io/ionicons)
- UI design inspired by modern healthcare applications
