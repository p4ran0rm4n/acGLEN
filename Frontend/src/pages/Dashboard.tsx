import { useAuthStore } from '../store/authStore';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Building2, Users, Activity, TrendingUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function Dashboard() {
  const { user, token } = useAuthStore();

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

  const stats = [
    {
      name: 'Organizações',
      value: organizations?.length || 0,
      icon: Building2,
      color: 'bg-blue-500',
    },
    {
      name: 'Membros',
      value: '0',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Atividades',
      value: '0',
      icon: Activity,
      color: 'bg-yellow-500',
    },
    {
      name: 'Crescimento',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Bem-vindo ao sistema de hotel, {user?.name || user?.email}!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Organizations */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizações Recentes</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : organizations && organizations.length > 0 ? (
          <div className="space-y-4">
            {organizations.map((org: any) => (
              <div
                key={org.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{org.name}</h3>
                  <p className="text-sm text-gray-500">{org.description || 'Sem descrição'}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                  {org.plan}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Nenhuma organização encontrada</p>
            <a
              href="/organizations"
              className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Criar organização
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

