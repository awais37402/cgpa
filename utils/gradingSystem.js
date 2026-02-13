// HEC Pakistan 4.0 Grading System
export const getGradePoint = (marks) => {
  if (marks >= 85) return 4.0;
  if (marks >= 80) return 3.7;
  if (marks >= 75) return 3.3;
  if (marks >= 70) return 3.0;
  if (marks >= 65) return 2.7;
  if (marks >= 60) return 2.3;
  if (marks >= 55) return 2.0;
  if (marks >= 50) return 1.7;
  if (marks >= 45) return 1.3;
  if (marks >= 40) return 1.0;
  return 0.0;
};

export const getGrade = (marks) => {
  if (marks >= 85) return 'A';
  if (marks >= 80) return 'A-';
  if (marks >= 75) return 'B+';
  if (marks >= 70) return 'B';
  if (marks >= 65) return 'B-';
  if (marks >= 60) return 'C+';
  if (marks >= 55) return 'C';
  if (marks >= 50) return 'C-';
  if (marks >= 45) return 'D+';
  if (marks >= 40) return 'D';
  return 'F';
};

export const calculateSubjectPoints = (marks, creditHours) => {
  const gradePoint = getGradePoint(marks);
  return gradePoint * creditHours;
};

export const calculateSemesterGPA = (subjects) => {
  if (!subjects || subjects.length === 0) return 0;
  
  const totalWeightedPoints = subjects.reduce((sum, subject) => {
    return sum + calculateSubjectPoints(subject.marks, subject.creditHours);
  }, 0);
  
  const totalCreditHours = subjects.reduce((sum, subject) => {
    return sum + subject.creditHours;
  }, 0);
  
  return totalCreditHours > 0 ? totalWeightedPoints / totalCreditHours : 0;
};

export const calculateCGPA = (semesters) => {
  if (!semesters || semesters.length === 0) return 0;
  
  const totalWeightedPoints = semesters.reduce((sum, semester) => {
    const semesterPoints = semester.subjects.reduce((subSum, subject) => {
      return subSum + calculateSubjectPoints(subject.marks, subject.creditHours);
    }, 0);
    return sum + semesterPoints;
  }, 0);
  
  const totalCreditHours = semesters.reduce((sum, semester) => {
    const semesterCredits = semester.subjects.reduce((subSum, subject) => {
      return subSum + subject.creditHours;
    }, 0);
    return sum + semesterCredits;
  }, 0);
  
  return totalCreditHours > 0 ? totalWeightedPoints / totalCreditHours : 0;
};