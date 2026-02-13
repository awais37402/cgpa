import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getGrade } from '../utils/gradingSystem';

export default function SemesterDetailsScreen({ route, navigation }) {
  const { semester } = route.params;

  const totalCredits = semester.subjects.reduce((sum, s) => sum + s.creditHours, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.semesterName}>{semester.name}</Text>
        <Text style={styles.semesterDate}>Added: {formatDate(semester.date)}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Semester GPA</Text>
          <Text style={styles.statValue}>{semester.gpa.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Credits</Text>
          <Text style={styles.statValue}>{totalCredits}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Subjects</Text>
          <Text style={styles.statValue}>{semester.subjects.length}</Text>
        </View>
      </View>

      <View style={styles.subjectsContainer}>
        <Text style={styles.subjectsTitle}>Subjects</Text>
        
        {semester.subjects.map((subject, index) => (
          <View key={subject.id || index} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectGrade}>{getGrade(subject.marks)}</Text>
            </View>
            
            <View style={styles.subjectDetails}>
              <Text style={styles.subjectInfo}>Marks: {subject.marks}</Text>
              <Text style={styles.subjectInfo}>Credit Hours: {subject.creditHours}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditSemester', { semester })}
      >
        <Text style={styles.editButtonText}>Edit Semester</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  semesterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  semesterDate: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectsContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subjectCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subjectGrade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subjectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subjectInfo: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});