import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Shield, Check } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha e-mail e senha',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simple mock authentication - in a real app this would call an API
      // For now, we'll use a simple check against predefined credentials
      const adminCredentials = {
        email: 'admin@mbperformance.com',
        password: 'admin123'
      };

      if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
        // Store authentication state
        const authData = {
          isAuthenticated: true,
          user: {
            email: formData.email,
            role: 'admin'
          },
          timestamp: Date.now()
        };

        // Store in localStorage
        localStorage.setItem('adminAuth', JSON.stringify(authData));

        // Also set the pb auth token for compatibility with existing system
        localStorage.setItem('__pb_superuser_auth__', 'mock-token-for-admin-session');

        toast({
          title: 'Login realizado',
          description: 'Bem-vindo ao painel administrativo',
          variant: 'success'
        });

        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'Credenciais inválidas',
          description: 'E-mail ou senha incorretos',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Erro no login',
        description: 'Ocorreu um erro ao tentar fazer login',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <h1 className="mb-6 text-3xl font-bold text-center">
            Painel Administrativo
          </h1>
          <p className="text-center text-muted-foreground">
            Acesse sua conta para gerenciar a loja
          </p>
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="text-foreground"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="text-foreground"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-start">
            <Checkbox
              id="remember-me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-primary"
            />
            <Label htmlFor="remember-me" className="ml-3 text-sm text-muted-foreground">
              Lembrar de mim
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  <span>Entrando...</span>
                </div>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  <span>Entrar</span>
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>Credenciais de demonstração:</p>
          <p className="font-mono text-sm">
            admin@mbperformance.com / admin123
          </p>
        </div>

        <div className="text-center mt-6">
          <NavLink to="/" className="text-sm text-muted-foreground hover:text-underline">
            Voltar para a loja
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;