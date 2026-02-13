import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { calculateSemesterGPA } from '../utils/gradingSystem';

export default function AddSemesterScreen({ navigation, onAddSemester }) {
  const [semesterName, setSemesterName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [marks, setMarks] = useState('');
  const [creditHours, setCreditHours] = useState('');

  const addSubject = () => {
    if (!subjectName || !marks || !creditHours) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const marksNum = parseFloat(marks);
    const creditHoursNum = parseFloat(creditHours);

    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      Alert.alert('Error', 'Marks must be between 0 and 100');
      return;
    }

    if (isNaN(creditHoursNum) || creditHoursNum <= 0) {
      Alert.alert('Error', 'Credit hours must be a positive number');
      return;
    }

    const newSubject = {
      id: Date.now().toString() + Math.random().toString(),
      name: subjectName,
      marks: marksNum,
      creditHours: creditHoursNum,
    };

    setSubjects([...subjects, newSubject]);
    setSubjectName('');
    setMarks('');
    setCreditHours('');
  };

  const removeSubject = (subjectId) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const saveSemester = () => {
    if (!semesterName) {
      Alert.alert('Error', 'Please enter semester name');
      return;
    }

    if (subjects.length === 0) {
      Alert.alert('Error', 'Please add at least one subject');
      return;
    }

    const gpa = calculateSemesterGPA(subjects);
    
    const newSemester = {
      id: Date.now().toString(),
      name: semesterName,
      date: new Date().toISOString(),
      subjects: subjects,
      gpa: gpa,
    };

    onAddSemester(newSemester);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Semester Name</Text>
        <TextInput
          style={styles.input}
          value={semesterName}
          onChangeText={setSemesterName}
          placeholder="e.g., Fall 2024"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Subjects</Text>
        
        <TextInput
          style={styles.input}
          value={subjectName}
          onChangeText={setSubjectName}
          placeholder="Subject Name"
        />
        
        <TextInput
          style={styles.input}
          value={marks}
          onChangeText={setMarks}
          placeholder="Marks (0-100)"
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          value={creditHours}
          onChangeText={setCreditHours}
          placeholder="Credit Hours"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={addSubject}>
          <Text style={styles.addButtonText}>Add Subject</Text>
        </TouchableOpacity>
      </View>

      {subjects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subjects Added</Text>
          {subjects.map((subject) => (
            <View key={subject.id} style={styles.subjectItem}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectDetails}>
                  Marks: {subject.marks} | Credit Hours: {subject.creditHours}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeSubject(subject.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveSemester}>
        <Text style={styles.saveButtonText}>Save Semester</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subjectDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});