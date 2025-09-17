import PaginatedTable from '@/components/ui/PaginatedTable';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_PATIENTS } from '@/graphql/queries';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import AddPatientForm from './components/AddPatientForm';
import { CREATE_PATIENT } from '@/graphql/mutations';
import type { Patient } from '@/typings/patient';

export default function DashboardPage() {
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [createPatient] = useMutation<{
    createPatient: Patient;
  }>(CREATE_PATIENT, {
    update(cache, { data }) {
      console.log(data);
      if (!data || !data.createPatient) return;
      const existing = cache.readQuery({ query: GET_PATIENTS }) as { patients: Patient[] };
      if (existing) {
        cache.writeQuery({
          query: GET_PATIENTS,
          data: { patients: [...existing.patients, data.createPatient] },
        });
      }
    },
  });

  const {
    data,
    loading: getUserLoading,
    error,
  } = useQuery<{
    patients: Patient[];
  }>(GET_PATIENTS);

  useEffect(() => {
    if (data && data.patients.length > 0) {
      setPatients(data.patients);
    }
  }, [data]);

  const openAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  const saveUser = async (patient: Partial<Patient>) => {
    try {
      await createPatient({
        variables: { input: patient },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      closeAddUserModal();
    }
  };

  if (getUserLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      {
        <Modal
          title={'Add New Patient'}
          isOpen={isAddUserModalOpen}
          onClose={closeAddUserModal}
          showCloseButton={false}
        >
          <AddPatientForm onCancel={closeAddUserModal} onSave={saveUser} />
        </Modal>
      }
      <div className="flex justify-start">
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={openAddUserModal}>
          New Patient
        </Button>
      </div>
      {data && (
        <PaginatedTable
          data={patients}
          searchKey="name"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
          ]}
          pageSize={10}
        />
      )}
    </div>
  );
}
