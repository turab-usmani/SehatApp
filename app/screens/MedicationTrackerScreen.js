import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function MedicationTrackerScreen({ navigation }) {
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00 AM',
      isActive: true,
      taken: false,
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '08:00 PM',
      isActive: true,
      taken: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

  const toggleTaken = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const toggleActive = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, isActive: !med.isActive } : med
    ));
  };

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency || !newMedication.time) {
      alert('Please fill in all fields');
      return;
    }

    const medication = {
      id: Date.now().toString(),
      ...newMedication,
      isActive: true,
      taken: false,
    };

    setMedications([...medications, medication]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      time: '',
    });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const rightComponent = (
    <TouchableOpacity 
      style={styles.addButton}
      onPress={() => setShowAddForm(!showAddForm)}
    >
      <Ionicons name={showAddForm ? "close" : "add"} size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Medication Tracker" 
        navigation={navigation} 
        rightComponent={rightComponent}
      />

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Medication</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Medication Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Metformin, Insulin, Aspirin"
              value={newMedication.name}
              onChangeText={(text) => setNewMedication({ ...newMedication, name: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dosage *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 500mg, 10ml, 1 tablet"
              value={newMedication.dosage}
              onChangeText={(text) => setNewMedication({ ...newMedication, dosage: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Frequency *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Once daily, Twice daily, Every 8 hours"
              value={newMedication.frequency}
              onChangeText={(text) => setNewMedication({ ...newMedication, frequency: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time to Take *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 08:00 AM, 02:00 PM"
              value={newMedication.time}
              onChangeText={(text) => setNewMedication({ ...newMedication, time: text })}
            />
          </View>
          <TouchableOpacity 
            style={styles.addItemButton}
            onPress={handleAddMedication}
          >
            <Text style={styles.addItemButtonText}>Add Medication</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.medicationList}>
        {medications.map(medication => (
          <View key={medication.id} style={styles.medicationCard}>
            <View style={styles.medicationInfo}>
              <View style={styles.medicationHeader}>
                <Text style={styles.medicationName}>{medication.name}</Text>
                <View style={styles.activeToggle}>
                  <Text style={styles.activeText}>Active</Text>
                  <Switch
                    value={medication.isActive}
                    onValueChange={() => toggleActive(medication.id)}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={medication.isActive ? '#007AFF' : '#f4f3f4'}
                  />
                </View>
              </View>
              <Text style={styles.medicationDosage}>{medication.dosage}</Text>
              <Text style={styles.medicationFrequency}>{medication.frequency}</Text>
              <View style={styles.medicationTime}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.timeText}>{medication.time}</Text>
              </View>
            </View>
            <View style={styles.medicationActions}>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDelete(medication.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.takenButton,
                  medication.taken && styles.takenButtonActive
                ]}
                onPress={() => toggleTaken(medication.id)}
              >
                <Text style={[
                  styles.takenButtonText,
                  medication.taken && styles.takenButtonTextActive
                ]}>
                  {medication.taken ? 'Taken' : 'Take'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addForm: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addItemButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationList: {
    flex: 1,
    padding: 16,
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeText: {
    marginRight: 8,
    color: '#666',
  },
  medicationDosage: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 4,
  },
  medicationFrequency: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
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
  medicationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButton: {
    padding: 8,
    marginRight: 12,
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