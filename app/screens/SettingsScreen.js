import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation, route }) {
  const { setIsLoggedIn } = route.params || {};
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationServices: true,
    emailUpdates: true,
    pushNotifications: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  const settingSections = [
    {
      title: 'App Preferences',
      settings: [
        { key: 'darkMode', label: 'Dark Mode', type: 'switch' },
        { key: 'notifications', label: 'Notifications', type: 'switch' },
        { key: 'locationServices', label: 'Location Services', type: 'switch' },
      ]
    },
    {
      title: 'Communication',
      settings: [
        { key: 'emailUpdates', label: 'Email Updates', type: 'switch' },
        { key: 'pushNotifications', label: 'Push Notifications', type: 'switch' },
      ]
    },
    {
      title: 'Account',
      settings: [
        { label: 'Change Password', type: 'link', screen: 'ChangePassword' },
        { label: 'Privacy Settings', type: 'link', screen: 'Privacy' },
        { label: 'Language', type: 'link', screen: 'Language' },
      ]
    },
    {
      title: 'About',
      settings: [
        { label: 'Terms of Service', type: 'link', screen: 'Terms' },
        { label: 'Privacy Policy', type: 'link', screen: 'PrivacyPolicy' },
        { label: 'App Version', type: 'info', value: '1.0.0' },
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {settingSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.settings.map((setting, index) => (
              <View key={index} style={styles.settingItem}>
                <Text style={styles.settingLabel}>{setting.label}</Text>
                {setting.type === 'switch' && (
                  <Switch
                    value={settings[setting.key]}
                    onValueChange={() => toggleSetting(setting.key)}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={settings[setting.key] ? '#007AFF' : '#f4f3f4'}
                  />
                )}
                {setting.type === 'link' && (
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate(setting.screen)}
                  >
                    <Ionicons name="chevron-forward" size={24} color="#999" />
                  </TouchableOpacity>
                )}
                {setting.type === 'info' && (
                  <Text style={styles.infoText}>{setting.value}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 20,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  linkButton: {
    padding: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#999',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 