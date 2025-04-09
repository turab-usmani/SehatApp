import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function MedicalHistoryScreen({ navigation }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('conditions');
  const [newItem, setNewItem] = useState({
    name: '',
    date: '',
    notes: '',
  });

  // Mock medical history data
  const [medicalHistory, setMedicalHistory] = useState({
    conditions: [
      { id: 1, name: 'Asthma', date: '2015', notes: 'Mild condition, controlled with inhaler' },
      { id: 2, name: 'Hypertension', date: '2018', notes: 'Regular medication prescribed' },
    ],
    allergies: [
      { id: 1, name: 'Penicillin', notes: 'Severe allergic reaction' },
      { id: 2, name: 'Peanuts', notes: 'Mild allergic reaction' },
    ],
    medications: [
      { id: 1, name: 'Metoprolol', dosage: '50mg', frequency: 'Once daily', notes: 'For blood pressure' },
      { id: 2, name: 'Ventolin', dosage: '100mcg', frequency: 'As needed', notes: 'For asthma' },
    ],
    surgeries: [
      { id: 1, name: 'Appendectomy', date: '2010', hospital: 'City Hospital', notes: 'Successful procedure' },
    ],
    familyHistory: [
      { id: 1, condition: 'Diabetes', relation: 'Father', notes: 'Type 2 diabetes' },
      { id: 2, condition: 'Heart Disease', relation: 'Mother', notes: 'Coronary artery disease' },
    ],
  });

  const categories = [
    { id: 'conditions', name: 'Medical Conditions', icon: 'medkit-outline' },
    { id: 'allergies', name: 'Allergies', icon: 'alert-circle-outline' },
    { id: 'medications', name: 'Medications', icon: 'medical-outline' },
    { id: 'surgeries', name: 'Surgeries', icon: 'cut-outline' },
    { id: 'familyHistory', name: 'Family History', icon: 'people-outline' },
  ];

  const handleAddItem = () => {
    if (!newItem.name) {
      alert('Please enter a name');
      return;
    }

    const newId = medicalHistory[selectedCategory].length + 1;
    const itemToAdd = { id: newId, ...newItem };

    setMedicalHistory(prev => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], itemToAdd],
    }));

    setNewItem({ name: '', date: '', notes: '' });
    setShowAddForm(false);
  };

  const handleDeleteItem = (category, id) => {
    setMedicalHistory(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id),
    }));
  };

  const renderFormFields = () => {
    switch (selectedCategory) {
      case 'conditions':
      case 'surgeries':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newItem.date}
              onChangeText={(text) => setNewItem({ ...newItem, date: text })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes"
              value={newItem.notes}
              onChangeText={(text) => setNewItem({ ...newItem, notes: text })}
              multiline
            />
          </>
        );
      case 'allergies':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Allergen Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Reaction Details"
              value={newItem.notes}
              onChangeText={(text) => setNewItem({ ...newItem, notes: text })}
              multiline
            />
          </>
        );
      case 'medications':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              value={newItem.dosage}
              onChangeText={(text) => setNewItem({ ...newItem, dosage: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              value={newItem.frequency}
              onChangeText={(text) => setNewItem({ ...newItem, frequency: text })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes"
              value={newItem.notes}
              onChangeText={(text) => setNewItem({ ...newItem, notes: text })}
              multiline
            />
          </>
        );
      case 'familyHistory':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Condition"
              value={newItem.condition}
              onChangeText={(text) => setNewItem({ ...newItem, condition: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Relation"
              value={newItem.relation}
              onChangeText={(text) => setNewItem({ ...newItem, relation: text })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes"
              value={newItem.notes}
              onChangeText={(text) => setNewItem({ ...newItem, notes: text })}
              multiline
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Medical History" 
        navigation={navigation}
        rightComponent={
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <Ionicons 
              name={showAddForm ? "close" : "add"} 
              size={24} 
              color="#007AFF" 
            />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={24} 
                color={selectedCategory === category.id ? '#fff' : '#007AFF'} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showAddForm && (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>Add New {categories.find(c => c.id === selectedCategory)?.name}</Text>
            {renderFormFields()}
            <TouchableOpacity 
              style={styles.addItemButton}
              onPress={handleAddItem}
            >
              <Text style={styles.addItemButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.historyContainer}>
          {medicalHistory[selectedCategory].map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyItemContent}>
                <Text style={styles.historyItemTitle}>
                  {item.name || item.condition}
                </Text>
                {item.date && (
                  <Text style={styles.historyItemDate}>{item.date}</Text>
                )}
                {item.notes && (
                  <Text style={styles.historyItemNotes}>{item.notes}</Text>
                )}
                {item.dosage && (
                  <Text style={styles.historyItemDetails}>
                    Dosage: {item.dosage} | Frequency: {item.frequency}
                  </Text>
                )}
                {item.relation && (
                  <Text style={styles.historyItemDetails}>
                    Relation: {item.relation}
                  </Text>
                )}
                {item.hospital && (
                  <Text style={styles.historyItemDetails}>
                    Hospital: {item.hospital}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(selectedCategory, item.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  addButton: {
    padding: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    margin: 4,
    minWidth: '45%',
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    marginLeft: 8,
    color: '#007AFF',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  addForm: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addItemButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemContent: {
    flex: 1,
  },
  historyItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  historyItemDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyItemNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyItemDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deleteButton: {
    padding: 8,
  },
}); 