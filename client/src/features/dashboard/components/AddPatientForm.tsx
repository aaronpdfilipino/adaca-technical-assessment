import Button from '@/components/ui/Button';
import type { Patient } from '@/typings/patient';
import { useState } from 'react';

type AddPatientFormProps = {
  onSave: (user: NewPatient) => void;
  onCancel: () => void;
};

type NewPatient = Pick<Patient, 'name' | 'email'>;

export default function AddPatientForm({ onSave, onCancel }: AddPatientFormProps) {
  const [patient, setPatient] = useState<NewPatient>({ name: '', email: '' });
  const [errors, setErrors] = useState<Partial<NewPatient>>({});

  const validate = () => {
    const newErrors: Partial<NewPatient> = {};
    if (!patient.name) newErrors.name = 'Name is required';
    if (!patient.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(patient);
    setPatient({ name: '', email: '' });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col justify-around max-w-md py-2 space-y-1">
      {/* Name */}
      <div>
        <label className="block text-left mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name ? (
          <p className="text-red-500 text-sm">{errors.name}</p>
        ) : (
          <p className="invisible text-sm">placeholder</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-left mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={patient.email}
          onChange={(e) => setPatient({ ...patient, email: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email ? (
          <p className="text-red-500 text-sm">{errors.email}</p>
        ) : (
          <p className="invisible text-sm">placeholder</p>
        )}
      </div>
      <div className="flex justify-between mt-5">
        <Button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
