import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import {
  isValidEmail,
  isValidCPF,
  isStrongPassword,
  isValidPhone,
  formatCPF,
  formatPhone,
  formatCEP,
} from '../utils/validators';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const validateField = (name: string, value: string) => {
    const newErrors: Record<string, string> = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email é obrigatório';
        } else if (!isValidEmail(value)) {
          newErrors.email = 'Email inválido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Senha é obrigatória';
        } else {
          const validation = isStrongPassword(value);
          if (!validation.valid) {
            newErrors.password = validation.message || 'Senha inválida';
          } else {
            delete newErrors.password;
          }
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'As senhas não coincidem';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'cpf':
        if (!value) {
          newErrors.cpf = 'CPF é obrigatório';
        } else if (!isValidCPF(value)) {
          newErrors.cpf = 'CPF inválido';
        } else {
          delete newErrors.cpf;
        }
        break;
      case 'phone':
        if (!value) {
          newErrors.phone = 'Telefone é obrigatório';
        } else if (!isValidPhone(value)) {
          newErrors.phone = 'Telefone inválido';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'address':
        if (!value) {
          newErrors.address = 'Endereço é obrigatório';
        } else {
          delete newErrors.address;
        }
        break;
      case 'name':
        if (!value) {
          newErrors.name = 'Nome é obrigatório';
        } else {
          delete newErrors.name;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatação automática
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    } else if (name === 'zip_code') {
      formattedValue = formatCEP(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    validateField(name, formattedValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar todos os campos obrigatórios
    if (!formData.name || !formData.email || !formData.password || !formData.cpf || !formData.phone || !formData.address) {
      setError('Todos os campos obrigatórios devem ser preenchidos');
      return;
    }

    // Validar senha
    const passwordValidation = isStrongPassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Senha inválida');
      return;
    }

    // Validar confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Validar CPF
    if (!isValidCPF(formData.cpf)) {
      setError('CPF inválido');
      return;
    }

    // Validar telefone
    if (!isValidPhone(formData.phone)) {
      setError('Telefone inválido');
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.cpf,
        formData.phone,
        formData.address,
        formData.city || undefined,
        formData.state || undefined,
        formData.zip_code || undefined
      );
      navigate('/welcome');
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-primary-600">Hotel</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              faça login
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => validateField('name', formData.name)}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validateField('email', formData.email)}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* CPF */}
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                CPF *
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                maxLength={14}
                className={`input ${errors.cpf ? 'border-red-500' : ''}`}
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                onBlur={() => validateField('cpf', formData.cpf)}
              />
              {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                maxLength={15}
                className={`input ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => validateField('phone', formData.phone)}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* CEP */}
            <div>
              <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                CEP
              </label>
              <input
                id="zip_code"
                name="zip_code"
                type="text"
                maxLength={9}
                className="input"
                placeholder="00000-000"
                value={formData.zip_code}
                onChange={handleChange}
              />
            </div>

            {/* Endereço */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className={`input ${errors.address ? 'border-red-500' : ''}`}
                placeholder="Rua, número, complemento"
                value={formData.address}
                onChange={handleChange}
                onBlur={() => validateField('address', formData.address)}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Cidade */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="input"
                placeholder="Cidade"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              />
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <input
                id="state"
                name="state"
                type="text"
                maxLength={2}
                className="input"
                placeholder="UF"
                value={formData.state}
                onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value.toUpperCase() }))}
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`input pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => validateField('password', formData.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              {formData.password && !errors.password && (
                <p className="mt-1 text-xs text-gray-500">
                  Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 especial
                </p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className={`input pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
