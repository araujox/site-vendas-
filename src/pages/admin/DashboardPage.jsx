import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeaderTabs,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  TrendingUp,
  Clock,
  Activity
} from 'lucide-react';
import {
  Badge,
  BadgeVariant
} from '@/components/ui/badge';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock statistics - in a real app these would come from an API
  const stats = {
    totalSales: 124500, // in cents
    totalOrders: 45,
    totalProducts: 25,
    activeCoupons: 3,
    recentOrders: [
      { id: 'ord_001', amount: 19990, date: '2026-05-10', status: 'delivered' },
      { id: 'ord_002', amount: 8990, date: '2026-05-11', status: 'processing' },
      { id: 'ord_003', amount: 34990, date: '2026-05-12', status: 'shipped' },
      { id: 'ord_004', amount: 12990, date: '2026-05-12', status: 'pending' },
      { id: 'ord_005', amount: 27990, date: '2026-05-13', status: 'delivered' }
    ]
  };

  const formatCurrency = (cents) => {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Olá, {user.email.split('@')[0]}!
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('adminAuth');
                  localStorage.removeItem('__pb_superuser_auth__');
                  window.location.href = '/admin/login';
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vendas Totais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {formatCurrency(stats.totalSales)}
                </span>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Valor total de vendas
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant={BadgeVariant.default} className="text-xs">
                {stats.totalOrders} pedidos
              </Badge>
            </CardFooter>
          </Card>

          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalOrders}
                </span>
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Total de pedidos
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant={BadgeVariant.destructive} className="text-xs">
                {stats.recentOrders.filter(o => o.status === 'pending').length} pendentes
              </Badge>
            </CardFooter>
          </Card>

          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produtos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalProducts}
                </span>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Produtos cadastrados
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant={BadgeVariant.secondary} className="text-xs">
                Atualizado há 2h
              </Badge>
            </CardFooter>
          </Card>

          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cupons Ativos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {stats.activeCoupons}
                </span>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Cupons disponíveis
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Gerenciar
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Atividade Recente
                </CardTitle>
                <Button variant="outline" size="sm">
                  Ver tudo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between space-x-3 p-3 border-b border-border last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Pedido #{order.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'delivered' ? 'Entregue' :
                       order.status === 'shipped' ? 'Enviado' :
                       order.status === 'processing' ? 'Processando' : 'Pendente'}
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground">
                      {formatCurrency(order.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Vendas por Período
                </CardTitle>
                <Button variant="outline" size="sm">
                  Personalizar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Placeholder for chart */}
              <div className="h-48 w-full bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Gráfico de Vendas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;