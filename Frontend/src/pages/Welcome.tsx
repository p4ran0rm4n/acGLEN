import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Conta criada com sucesso</h1>
        <p className="text-gray-600">
          Enviamos um email de confirmação. Verifique sua caixa de entrada e confirme sua conta
          para acessar.
        </p>
        <div className="pt-4">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
          >
            Ir para Login
          </Link>
        </div>
      </div>
    </div>
  );
}