import * as patientsAPI from "./fakePatientsService";

const medsCollection = [];

export function getMedsCollection() {
  return medsCollection;
}

export function getMeds(id) {
  return medsCollection.find(m => m._id === id);
}

export function deleteMeds(id) {
  let medsInDb = medsCollection.find(m => m._id === id);
  medsCollection.splice(medsCollection.indexOf(medsInDb), 1);
  return medsInDb;
}

export function saveMeds(meds) {
  const medsInDb = medsCollection.find(m => m._id === meds._id) || {};
  medsInDb.title = meds.title;
  medsInDb.dose = meds.dose;
  medsInDb.patient = patientsAPI.patients.find(p => p._id === meds.patient);
  medsInDb.frequency = meds.frequency;
  medsInDb.duration = meds.duration;
  medsInDb.notify = meds.notify;

  if (!medsInDb._id) {
    medsInDb._id = Date.now().toString();
    medsCollection.push(medsInDb);
  }
  console.log(medsInDb);
  return medsInDb;
}
