import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableCaption
} from '@/components/ui/table';
import {
  Button
} from '@/components/ui/button';
import {
  DollarSign,
  Package,
  Calendar,
  User,
  Check,
  Loader,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Input,
  Label
} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Badge
} from '@/components/ui/badge';
import {
  useToast
} from '@/hooks/use-toast';

const OrdersPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock orders data
  const mockOrdersData = [
    {
      id: 'ord_001',
      customerName: 'Ana Silva',
      customerEmail: 'ana@email.com',
      date: '2026-05-10',
      items: [
        { name: 'Sutiã Fitness Premium', quantity: 2, price: 18990 },
        { name: 'Legging Cintura Alta', quantity: 1, price: 24990 }
      ],
      subtotal: 62970,
      shipping: 0,
      total: 62970,
      status: 'delivered',
      paymentMethod: 'cartão de crédito'
    },
    {
      id: 'ord_002',
      customerName: 'Maria Oliveira',
      customerEmail: 'maria@email.com',
      date: '2026-05-11',
      items: [
        { name: 'Top Fitness Básico', quantity: 3, price: 12990 }
      ],
      subtotal: 38970,
      shipping: 0,
      total: 38970,
      status: 'processing',
      paymentMethod: 'pix'
    },
    {
      id: 'ord_003',
      customerName: 'Carlos Santos',
      customerEmail: 'carlos@email.com',
      date: '2026-05-12',
      items: [
        { name: 'Jaqueta Corta-Vento', quantity: 1, price: 34990 }
      ],
      subtotal: 34990,
      shipping: 0,
      total: 34990,
      status: 'shipped',
      paymentMethod: 'boleto'
    },
    {
      id: 'ord_004',
      customerName: 'Lucia Ferreira',
      customerEmail: 'lucia@email.com',
      date: '2026-05-12',
      items: [
        { name: 'Top Fitness com Suporte', quantity: 1, price: 15990 },
        { name: 'Short Fitness Médio', quantity: 1, price: 16990 }
      ],
      subtotal: 32980,
      shipping: 0,
      total: 32980,
      status: 'pending',
      paymentMethod: 'cartão de crédito'
    },
    {
      id: 'ord_005',
      customerName: 'Fernanda Lima',
      customerEmail: 'fernanda@email.com',
      date: '2026-05-13',
      items: [
        { name: 'Conjunto Top + Legging', quantity: 1, price: 39990 }
      ],
      subtotal: 39990,
      shipping: 0,
      total: 39990,
      status: 'delivered',
      paymentMethod: 'pix'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrdersData);
      setLoading(false);
    }, 500);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCancelOrder = (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      setOrders(prev =>
        prev.map(o =>
          o.id === id ? { ...o, status: 'cancelled' } : o
        )
      );
      toast({
        title: 'Pedido cancelado',
        description: 'Pedido cancelado com sucesso',
        variant: 'success'
      });
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );
    toast({
      title: 'Status atualizado',
      description: `Status do pedido atualizado para ${newStatus}`,
      variant: 'success'
    });
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-blue-200 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };

  const formatCurrency = (cents) => {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-foreground">
            Gestão de Pedidos
          </h1>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => window.location.href = '/'}
              variant="ghost"
              size="icon"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="search">Buscar pedidos</Label>
              <Input
                id="search"
                type="search"
                placeholder="Digite o nome, email ou ID do pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              Lista de pedidos ({filteredOrders.length} pedidos)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID do Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-20">Data</TableHead>
                <TableHead className="w-20">Itens</TableHead>
                <TableHead className="w-20">Total</TableHead>
                <TableHead className="w-20">Pagamento</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-20">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableColSpan columnSpan={8}>
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Carregando pedidos...</p>
                    </div>
                  </TableColSpan>
                </TableRow>
              ) : (
                filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableColSpan columnSpan={8}>
                      <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-muted-foreground">Nenhum pedido encontrado</p>
                      </div>
                    </TableColSpan>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="font-mono text-sm">#{order.id}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
                      </TableCell>
                      <TableCell>
                        <div className="max-h-32 overflow-y-auto">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-1">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.quantity}x
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{formatCurrency(order.total)}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{order.paymentMethod}</p>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-center space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="h-8 w-8">
                            <Button variant="ghost" size="icon">
                              <Loader className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderDetails(true);
                              }}
                            >
                              Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(order.id, order.status === 'pending' ? 'processing' : order.status === 'processing' ? 'shipped' : order.status === 'shipped' ? 'delivered' : 'delivered')}
                            >
                              Avançar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleCancelOrder(order.id)}
                              className="text-destructive"
                            >
                              Cancelar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>
          </Table>
        </div>

        {/* Order Details Modal */}
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogTrigger>
            <Button variant="outline">
              Ver Detalhes do Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-2xl sm:max-w-full">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            <DialogContent>
              {selectedOrder && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Informações do Cliente</h2>
                      <p><strong>Nome:</strong> {selectedOrder.customerName}</p>
                      <p><strong>E-mail:</strong> {selectedOrder.customerEmail}</p>
                      <p><strong>Data do Pedido:</strong> {new Date(selectedOrder.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
                      <p><strong>Método de Pagamento:</strong> {selectedOrder.paymentMethod}</p>
                      <p><strong>Status Atual:</strong>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}>
                          {statusLabels[selectedOrder.status]}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-4">Itens do Pedido</h2>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="border-b border-blastic pb-3 last:border-b-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.quantity}x</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(item.price)} cada
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-blastic pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Frete:</span>
                      <span className="font-medium text-green-600">Grátis</span>
                    </div>
                    <div className="border-t border-blastic pt-3 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-xl">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogFooter>
              <Button type="button" onClick={() => setShowOrderDetails(false)}>
                Fechar
              </Button>
              {selectedOrder && (
                <>
                  <Button
                    type="button"
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id,
                        selectedOrder.status === 'pending' ? 'processing' :
                        selectedOrder.status === 'processing' ? 'shipped' :
                        selectedOrder.status === 'shipped' ? 'delivered' :
                        selectedOrder.status === 'delivered' ? 'delivered' : 'delivered'
                      );
                      setShowOrderDetails(false);
                    }}
                  >
                    Avançar Status
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleCancelOrder(selectedOrder.id);
                      setShowOrderDetails(false);
                    }}
                    variant="destructive"
                  >
                    Cancelar Pedido
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrdersPage;