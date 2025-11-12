import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Plus, Building2, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function Organizations() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data: organizations, isLoading } = useQuery(
    'organizations',
    async () => {
      const response = await axios.get(`${API_URL}/organizations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.organizations || [];
    },
    {
      enabled: !!token,
    }
  );

  const createMutation = useMutation(
    async (data: { name: string; description: string }) => {
      const response = await axios.post(
        `${API_URL}/organizations`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('organizations');
        setShowModal(false);
        setName('');
        setDescription('');
      },
    }
  );

  const deleteMutation = useMutation(
    async (id: string) => {
      await axios.delete(`${API_URL}/organizations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('organizations');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ name, description });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizações</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie suas organizações e equipes
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary inline-flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Nova Organização
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : organizations && organizations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org: any) => (
            <div key={org.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {org.description || 'Sem descrição'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(org.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                  {org.plan}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(org.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma organização</h3>
          <p className="text-gray-500 mb-4">Comece criando sua primeira organização</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus className="mr-2 h-5 w-5" />
            Criar Organização
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nova Organização</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome da organização"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    className="input"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição da organização"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={createMutation.isLoading}>
                    {createMutation.isLoading ? 'Criando...' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

