export const patients = [];

export function getPatients() {
  return patients.filter(p => p);
}

export function savePatient(patient) {
  let patientInDb = { ...patient };
  patientInDb._id = Date.now().toString();
  patients.push(patientInDb);

  return patientInDb;
}
