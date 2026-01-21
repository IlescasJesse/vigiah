import PatientTracking from "../../../src/components/PatientTracking";

export default function PatientDetailPage({ params }) {
  return <PatientTracking patientId={params.id} />;
}
