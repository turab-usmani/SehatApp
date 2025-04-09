import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function DoctorProfileScreen({ route, navigation }) {
  const { doctor } = route.params;

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      userName: 'John Smith',
      rating: 5,
      comment: 'Dr. Johnson was very thorough and took the time to explain everything clearly. Highly recommend!',
      date: '2 weeks ago',
    },
    {
      id: '2',
      userName: 'Emily Davis',
      rating: 4,
      comment: 'Great doctor, very knowledgeable. The wait time was a bit long though.',
      date: '1 month ago',
    },
    {
      id: '3',
      userName: 'Robert Wilson',
      rating: 5,
      comment: 'Excellent care and follow-up. Dr. Johnson is the best cardiologist I\'ve seen.',
      date: '2 months ago',
    },
  ];

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={i <= rating ? '#FFD700' : '#ccc'}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Header title="Doctor Profile" navigation={navigation} />
      
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: doctor.image }}
            style={styles.doctorImage}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(doctor.rating)}
              <Text style={styles.ratingText}>{doctor.rating} ({doctor.reviews} reviews)</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{doctor.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{doctor.experience} experience</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Dr. {doctor.name.split(' ')[1]} is a board-certified {doctor.specialization.toLowerCase()} with extensive experience in treating various conditions. 
            They are committed to providing personalized care and staying up-to-date with the latest medical advancements.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.educationItem}>
            <Text style={styles.educationTitle}>Medical School</Text>
            <Text style={styles.educationText}>University of Medical Sciences, 2005</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.educationTitle}>Residency</Text>
            <Text style={styles.educationText}>City General Hospital, 2008</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.educationTitle}>Fellowship</Text>
            <Text style={styles.educationText}>National Medical Center, 2010</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Appointment', { doctor })}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 8,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  educationText: {
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 14,
    color: '#999',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 