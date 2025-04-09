import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function HomeScreen({ navigation, route }) {
  const { setIsLoggedIn } = route.params;

  const quickActions = [
    {
      id: '1',
      title: 'Find Doctor',
      icon: 'medical',
      screen: 'Doctors',
      color: '#007AFF',
    },
    {
      id: '2',
      title: 'Book Appointment',
      icon: 'calendar',
      screen: 'Doctors',
      color: '#34C759',
    },
    {
      id: '3',
      title: 'Medications',
      icon: 'medkit',
      screen: 'Medications',
      color: '#FF9500',
    },
    {
      id: '4',
      title: 'Medical History',
      icon: 'document-text',
      screen: 'MedicalHistory',
      color: '#5856D6',
    },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      date: '2023-04-15',
      time: '10:00 AM',
      location: 'Downtown Medical Center',
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialization: 'Neurologist',
      date: '2023-04-20',
      time: '02:30 PM',
      location: 'City General Hospital',
    },
  ];

  const medicationReminders = [
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      time: '08:00 AM',
      taken: false,
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      time: '08:00 PM',
      taken: false,
    },
  ];

  const rightComponent = (
    <TouchableOpacity 
      style={styles.logoutButton}
      onPress={() => setIsLoggedIn(false)}
    >
      <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Header 
        title="Welcome to Sehat!" 
        navigation={navigation} 
        showBack={false}
        rightComponent={rightComponent}
      />

      <View style={styles.quickActions}>
        {quickActions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={() => navigation.navigate(action.screen)}
          >
            <Ionicons name={action.icon} size={24} color="#fff" />
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Doctors')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {upcomingAppointments.map(appointment => (
          <TouchableOpacity
            key={appointment.id}
            style={styles.appointmentCard}
            onPress={() => navigation.navigate('Appointment', { appointment })}
          >
            <View style={styles.appointmentInfo}>
              <Text style={styles.doctorName}>{appointment.doctor}</Text>
              <Text style={styles.specialization}>{appointment.specialization}</Text>
              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{appointment.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{appointment.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{appointment.location}</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Medications</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Medications')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {medicationReminders.map(medication => (
          <TouchableOpacity
            key={medication.id}
            style={styles.medicationCard}
            onPress={() => navigation.navigate('Medications')}
          >
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDosage}>{medication.dosage}</Text>
              <View style={styles.medicationTime}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.timeText}>{medication.time}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.takenButton,
                medication.taken && styles.takenButtonActive
              ]}
            >
              <Text style={[
                styles.takenButtonText,
                medication.taken && styles.takenButtonTextActive
              ]}>
                {medication.taken ? 'Taken' : 'Take'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  logoutButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  appointmentDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  medicationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  medicationTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  takenButton: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  takenButtonActive: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  takenButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  takenButtonTextActive: {
    color: '#fff',
  },
});
