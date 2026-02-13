import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import AddSemesterScreen from './screens/AddSemesterScreen';
import SemesterDetailsScreen from './screens/SemesterDetailsScreen';
import EditSemesterScreen from './screens/EditSemesterScreen';

const Stack = createStackNavigator();

export default function App() {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    loadSemesters();
  }, []);

  const loadSemesters = async () => {
    try {
      const savedSemesters = await AsyncStorage.getItem('semesters');
      if (savedSemesters) {
        setSemesters(JSON.parse(savedSemesters));
      }
    } catch (error) {
      console.error('Error loading semesters:', error);
    }
  };

  const saveSemesters = async (updatedSemesters) => {
    try {
      await AsyncStorage.setItem('semesters', JSON.stringify(updatedSemesters));
      setSemesters(updatedSemesters);
    } catch (error) {
      console.error('Error saving semesters:', error);
    }
  };

  const addSemester = (semester) => {
    const updatedSemesters = [...semesters, semester];
    saveSemesters(updatedSemesters);
  };

  const updateSemester = (updatedSemester) => {
    const updatedSemesters = semesters.map(sem => 
      sem.id === updatedSemester.id ? updatedSemester : sem
    );
    saveSemesters(updatedSemesters);
  };

  const deleteSemester = (semesterId) => {
    const updatedSemesters = semesters.filter(sem => sem.id !== semesterId);
    saveSemesters(updatedSemesters);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            options={{ title: 'GPA Calculator' }}
          >
            {(props) => (
              <HomeScreen 
                {...props} 
                semesters={semesters}
                onDeleteSemester={deleteSemester}
              />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="AddSemester" 
            options={{ title: 'Add Semester' }}
          >
            {(props) => (
              <AddSemesterScreen 
                {...props} 
                onAddSemester={addSemester}
              />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="SemesterDetails" 
            options={{ title: 'Semester Details' }}
          >
            {(props) => (
              <SemesterDetailsScreen 
                {...props} 
                onUpdateSemester={updateSemester}
              />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="EditSemester" 
            options={{ title: 'Edit Semester' }}
          >
            {(props) => (
              <EditSemesterScreen 
                {...props} 
                onUpdateSemester={updateSemester}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}