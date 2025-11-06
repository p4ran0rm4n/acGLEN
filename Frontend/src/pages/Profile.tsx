import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { User, Mail, Phone, MapPin, CreditCard, Edit2, Save, X } from 'lucide-react';
import { formatCPF, formatPhone, formatCEP } from '../utils/validators';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function Profile() {
  const { user, token } = useAuthStore();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const { data: profile, isLoading } = useQuery(
    'profile',
    async () => {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.profile;
    },
    {
      enabled: !!token,
      onSuccess: (data) => {
        if (data) {
          setFormData({
            name: data.name || '',
            cpf: data.cpf ? formatCPF(data.cpf) : '',
            phone: data.phone ? formatPhone(data.phone) : '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zip_code: data.zip_code ? formatCEP(data.zip_code) : '',
          });
        }
      },
    }
  );

  const updateMutation = useMutation(
    async (data: typeof formData) => {
      const response = await axios.put(
        `${API_URL}/profile`,
        {
          ...data,
          cpf: data.cpf.replace(/[^\d]/g, ''),
          phone: data.phone.replace(/[^\d]/g, ''),
          zip_code: data.zip_code.replace(/[^\d]/g, ''),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile');
        setIsEditing(false);
      },
    }
  );

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        cpf: profile.cpf ? formatCPF(profile.cpf) : '',
        phone: profile.phone ? formatPhone(profile.phone) : '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip_code: profile.zip_code ? formatCEP(profile.zip_code) : '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
          <p className="mt-2 text-sm text-gray-600">Gerencie suas informações pessoais</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Editar
          </button>
        )}
      </div>

      <div className="card max-w-2xl">
        <div className="flex items-center space-x-6 mb-8">
          <div className="bg-primary-100 p-4 rounded-full">
            <User className="h-12 w-12 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {profile?.name || user?.name || 'Usuário'}
            </h2>
            <p className="text-gray-500">Hóspede</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-start space-x-4">
            <Mail className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{user?.email}</p>
            </div>
          </div>

          {/* Nome */}
          <div className="flex items-start space-x-4">
            <User className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Nome Completo</p>
              {isEditing ? (
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <p className="text-gray-900">{profile?.name || 'N/A'}</p>
              )}
            </div>
          </div>

          {/* CPF */}
          <div className="flex items-start space-x-4">
            <CreditCard className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">CPF</p>
              {isEditing ? (
                <input
                  type="text"
                  maxLength={14}
                  className="input"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    setFormData((prev) => ({ ...prev, cpf: formatted }));
                  }}
                />
              ) : (
                <p className="text-gray-900">
                  {profile?.cpf ? formatCPF(profile.cpf) : 'N/A'}
                </p>
              )}
            </div>
          </div>

          {/* Telefone */}
          <div className="flex items-start space-x-4">
            <Phone className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Telefone</p>
              {isEditing ? (
                <input
                  type="text"
                  maxLength={15}
                  className="input"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setFormData((prev) => ({ ...prev, phone: formatted }));
                  }}
                />
              ) : (
                <p className="text-gray-900">
                  {profile?.phone ? formatPhone(profile.phone) : 'N/A'}
                </p>
              )}
            </div>
          </div>

          {/* Endereço */}
          <div className="flex items-start space-x-4">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Endereço</p>
              {isEditing ? (
                <input
                  type="text"
                  className="input"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                />
              ) : (
                <p className="text-gray-900">{profile?.address || 'N/A'}</p>
              )}
            </div>
          </div>

          {/* Cidade, Estado, CEP */}
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Cidade</label>
                <input
                  type="text"
                  className="input"
                  value={formData.city}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Estado</label>
                <input
                  type="text"
                  maxLength={2}
                  className="input"
                  placeholder="UF"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value.toUpperCase() }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">CEP</label>
                <input
                  type="text"
                  maxLength={9}
                  className="input"
                  placeholder="00000-000"
                  value={formData.zip_code}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value);
                    setFormData((prev) => ({ ...prev, zip_code: formatted }));
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Cidade, Estado, CEP</p>
                <p className="text-gray-900">
                  {[profile?.city, profile?.state, profile?.zip_code]
                    .filter(Boolean)
                    .join(', ') || 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Botões de ação */}
          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button onClick={handleCancel} className="btn btn-secondary inline-flex items-center">
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={updateMutation.isLoading}
                className="btn btn-primary inline-flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                {updateMutation.isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
