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

export default function EditSemesterScreen({ route, navigation, onUpdateSemester }) {
  const { semester } = route.params;
  
  const [semesterName, setSemesterName] = useState(semester.name);
  const [subjects, setSubjects] = useState(semester.subjects);
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

  const updateSubject = (subjectId, field, value) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId ? { ...subject, [field]: value } : subject
    ));
  };

  const saveChanges = () => {
    if (!semesterName) {
      Alert.alert('Error', 'Please enter semester name');
      return;
    }

    if (subjects.length === 0) {
      Alert.alert('Error', 'Please add at least one subject');
      return;
    }

    const gpa = calculateSemesterGPA(subjects);
    
    const updatedSemester = {
      ...semester,
      name: semesterName,
      subjects: subjects,
      gpa: gpa,
    };

    onUpdateSemester(updatedSemester);
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
        <Text style={styles.sectionTitle}>Current Subjects</Text>
        {subjects.map((subject) => (
          <View key={subject.id} style={styles.subjectItem}>
            <View style={styles.subjectFields}>
              <TextInput
                style={[styles.subjectInput, styles.subjectNameInput]}
                value={subject.name}
                onChangeText={(text) => updateSubject(subject.id, 'name', text)}
                placeholder="Name"
              />
              <TextInput
                style={[styles.subjectInput, styles.subjectMarksInput]}
                value={subject.marks.toString()}
                onChangeText={(text) => updateSubject(subject.id, 'marks', parseFloat(text) || 0)}
                keyboardType="numeric"
                placeholder="Marks"
              />
              <TextInput
                style={[styles.subjectInput, styles.subjectCreditInput]}
                value={subject.creditHours.toString()}
                onChangeText={(text) => updateSubject(subject.id, 'creditHours', parseFloat(text) || 0)}
                keyboardType="numeric"
                placeholder="Credits"
              />
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeSubject(subject.id)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Subject</Text>
        
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

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectFields: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
  subjectInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
    fontSize: 14,
  },
  subjectNameInput: {
    flex: 2,
  },
  subjectMarksInput: {
    flex: 1,
  },
  subjectCreditInput: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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