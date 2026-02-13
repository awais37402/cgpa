import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { calculateCGPA } from '../utils/gradingSystem';

export default function HomeScreen({ navigation, semesters, onDeleteSemester }) {
  const cgpa = calculateCGPA(semesters);

  const handleDeleteSemester = (semesterId, semesterName) => {
    Alert.alert(
      'Delete Semester',
      `Are you sure you want to delete ${semesterName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteSemester(semesterId),
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cgpaContainer}>
        <Text style={styles.cgpaLabel}>Overall CGPA</Text>
        <Text style={styles.cgpaValue}>{cgpa.toFixed(2)}</Text>
      </View>

      <ScrollView style={styles.semesterList}>
        {semesters.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No semesters added yet</Text>
            <Text style={styles.emptyStateSubText}>Tap the + button to add your first semester</Text>
          </View>
        ) : (
          semesters.map((semester) => (
            <TouchableOpacity
              key={semester.id}
              style={styles.semesterCard}
              onPress={() => navigation.navigate('SemesterDetails', { semester })}
            >
              <View style={styles.semesterHeader}>
                <Text style={styles.semesterName}>{semester.name}</Text>
                <Text style={styles.semesterDate}>{formatDate(semester.date)}</Text>
              </View>
              
              <View style={styles.semesterStats}>
                <Text style={styles.semesterGPA}>
                  GPA: {semester.gpa.toFixed(2)}
                </Text>
                <Text style={styles.subjectCount}>
                  {semester.subjects.length} Subjects
                </Text>
              </View>

              <View style={styles.semesterFooter}>
                <Text style={styles.totalCredits}>
                  Total Credits: {semester.subjects.reduce((sum, s) => sum + s.creditHours, 0)}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteSemester(semester.id, semester.name)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddSemester')}
      >
        <Text style={styles.addButtonText}>+ Add Semester</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cgpaContainer: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  cgpaLabel: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  cgpaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  semesterList: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  semesterCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  semesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  semesterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  semesterDate: {
    fontSize: 12,
    color: '#666',
  },
  semesterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  semesterGPA: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  subjectCount: {
    fontSize: 14,
    color: '#666',
  },
  semesterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  totalCredits: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});