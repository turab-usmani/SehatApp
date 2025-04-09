import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

// Mock data for doctors
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    rating: 4.8,
    reviews: 124,
    experience: '15 years',
    location: 'Downtown Medical Center',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    rating: 4.9,
    reviews: 98,
    experience: '12 years',
    location: 'City General Hospital',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    rating: 4.7,
    reviews: 156,
    experience: '8 years',
    location: 'Children\'s Medical Center',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Dermatologist',
    rating: 4.6,
    reviews: 87,
    experience: '10 years',
    location: 'Skin Care Clinic',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '5',
    name: 'Dr. Lisa Patel',
    specialization: 'Orthopedist',
    rating: 4.9,
    reviews: 112,
    experience: '14 years',
    location: 'Sports Medicine Center',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
];

// Specializations for filter
const specializations = [
  'All Specializations',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Dermatologist',
  'Orthopedist',
  'General Physician',
  'ENT Specialist',
  'Ophthalmologist',
  'Psychiatrist',
];

export default function DoctorSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);

  // Filter doctors based on search query and specialization
  const filterDoctors = (query, specialization) => {
    let filtered = [...mockDoctors];
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(query.toLowerCase()) ||
        doctor.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by specialization
    if (specialization !== 'All Specializations') {
      filtered = filtered.filter(doctor => 
        doctor.specialization === specialization
      );
    }
    
    setFilteredDoctors(filtered);
  };

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    filterDoctors(text, selectedSpecialization);
  };

  // Handle specialization filter change
  const handleSpecializationChange = (specialization) => {
    setSelectedSpecialization(specialization);
    filterDoctors(searchQuery, specialization);
  };

  // Render doctor item
  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.doctorCard}
      onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}
    >
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating} ({item.reviews} reviews)</Text>
        </View>
        <View style={styles.doctorDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.experience}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Appointment', { doctor: item })}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Find a Doctor" navigation={navigation} />
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name or specialization"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {specializations.map((spec, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedSpecialization === spec && styles.selectedFilterChip
              ]}
              onPress={() => handleSpecializationChange(spec)}
            >
              <Text 
                style={[
                  styles.filterText,
                  selectedSpecialization === spec && styles.selectedFilterText
                ]}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctorItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.doctorList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedFilterChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#fff',
  },
  doctorList: {
    padding: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  doctorDetails: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 4,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 