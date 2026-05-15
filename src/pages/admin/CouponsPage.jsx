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
  Pencil,
  Trash2,
  Plus,
  Copy
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
  Description,
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
  Textarea
} from '@/components/ui/textarea';
import {
  Checkbox
} from '@/components/ui/checkbox';
import {
  useToast
} from '@/hooks/use-toast';

const CouponsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [showEditCoupon, setShowEditCoupon] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock coupons data
  const mockCouponsData = [
    {
      id: 'cpn_001',
      code: 'MBFREE',
      description: 'Frete grátis',
      discountType: 'fixed',
      discountValue: 0, // Free shipping
      minPurchase: 29900, // R$ 299,00
      usageLimit: 1000,
      usedCount: 245,
      expiresAt: '2026-12-31',
      status: 'active'
    },
    {
      id: 'cpn_002',
      code: 'DES10',
      description: '10% de desconto',
      discountType: 'percentage',
      discountValue: 10,
      minPurchase: 0,
      usageLimit: 500,
      usedCount: 89,
      expiresAt: '2026-06-30',
      status: 'active'
    },
    {
      id: 'cpn_003',
      code: 'SALE50',
      description: 'R$ 50 off',
      discountType: 'fixed',
      discountValue: 5000, // R$ 50,00
      minPurchase: 10000, // R$ 100,00
      usageLimit: 100,
      usedCount: 23,
      expiresAt: '2026-05-30',
      status: 'active'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCoupons(mockCouponsData);
      setLoading(false);
    }, 500);
  }, []);

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || coupon.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteCoupon = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cupom?')) {
      setCoupons(prev => prev.filter(c => c.id !== id));
      toast({
        title: 'Cupom excluído',
        description: 'Cupom removido com sucesso',
        variant: 'success'
      });
    }
  };

  const handleToggleStatus = (id) => {
    setCoupons(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
          : c
      )
    );
    toast({
      title: 'Status atualizado',
      description: `Cupom ${coupons.find(c => c.id === id)?.status === 'active' ? 'desativado' : 'ativado'}`,
      variant: 'success'
    });
  };

  const handleAddCoupon = (newCoupon) => {
    setCoupons([...coupons, { ...newCoupon, id: `cpn_${Date.now()}` }]);
    setShowAddCoupon(false);
    toast({
      title: 'Cupom adicionado',
      description: 'Cupom criado com sucesso',
      variant: 'success'
    });
  };

  const handleUpdateCoupon = (updatedCoupon) => {
    setCoupons(prev =>
      prev.map(c => (c.id === updatedCoupon.id ? updatedCoupon : c))
    );
    setShowEditCoupon(false);
    toast({
      title: 'Cupom atualizado',
      description: 'Cupom atualizado com sucesso',
      variant: 'success'
    });
  };

  const formatDiscount = (type, value) => {
    if (type === 'percentage') {
      return `${value}%`;
    } else {
      return `R$ ${(value / 100).toFixed(2)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-foreground">
            Gestão de Cupons
          </h1>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowAddCoupon(true)}
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Cupom
            </Button>
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="search">Buscar cupons</Label>
              <Input
                id="search"
                type="search"
                placeholder="Digite o código do cupom..."
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
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Coupons Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              Lista de cupons ({filteredCoupons.length} cupons)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-20">Tipo de Desconto</TableHead>
                <TableHead className="w-20">Valor</TableHead>
                <TableHead className="w-20">Compra Mínima</TableHead>
                <TableHead className="w-20">Uso</TableHead>
                <TableHead className="w-20">Validade</TableHead>
                <TableHead className="w-16">Status</TableHead>
                <TableHead className="w-20">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableColSpan columnSpan={9}>
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Carregando cupons...</p>
                    </div>
                  </TableColSpan>
                </TableRow>
              ) : (
                filteredCoupons.length === 0 ? (
                  <TableRow>
                    <TableColSpan columnSpan={9}>
                      <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-muted-foreground">Nenhum cupom encontrado</p>
                      </div>
                    </TableColSpan>
                  </TableRow>
                ) : (
                  filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <p className="font-mono text-sm">${coupon.code}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{coupon.description}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {coupon.id}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                          {coupon.discountType === 'percentage' ? 'Percentual' : 'Valor Fixo'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{formatDiscount(coupon.discountType, coupon.discountValue)}</span>
                      </TableCell>
                      <TableCell>
                        {coupon.minPurchase > 0 ? (
                          `R$ ${(coupon.minPurchase / 100).toFixed(2)}`
                        ) : (
                          <span className="text-xs text-muted-foreground">Nenhuma</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{coupon.usedCount}/{coupon.usageLimit}</span>
                          <span className="text-xs text-muted-foreground">
                            usos
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(coupon.expiresAt).toLocaleDateString('pt-BR')}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          coupon.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {coupon.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-center space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="h-8 w-8">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedCoupon(coupon)}>
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteCoupon(coupon.id)}>
                              Excluir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(coupon.id)}>
                              {coupon.status === 'active' ? 'Desativar' : 'Ativar'}
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

        {/* Add Coupon Modal */}
        <Dialog open={showAddCoupon} onOpenChange={setShowAddCoupon}>
          <DialogTrigger>
            <Button variant="outline">
              Adicionar Cupom
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cupom</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="coupon-code">Código do Cupom</Label>
                    <Input
                      id="coupon-code"
                      type="text"
                      placeholder="Ex: DESCONTO10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupon-description">Descrição</Label>
                    <Input
                      id="coupon-description"
                      type="text"
                      placeholder="Descreva o desconto"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="coupon-discount-type">Tipo de Desconto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentual (%)</SelectItem>
                        <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="coupon-discount-value">Valor do Desconto</Label>
                    <Input
                      id="coupon-discount-value"
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupon-min-purchase">Compra Mínima (R$)</Label>
                    <Input
                      id="coupon-min-purchase"
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupon-usage-limit">Limite de Uso</Label>
                    <Input
                      id="coupon-usage-limit"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupon-expires-at">Data de Validade</Label>
                    <Input
                      id="coupon-expires-at"
                      type="date"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="coupon-status"
                      checked={true}
                    />
                    <Label htmlFor="coupon-status">Cupom ativo</Label>
                  </div>
                </div>
              </form>
            </DialogContent>
            <DialogFooter>
              <Button type="button" onClick={() => setShowAddCoupon(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Cupom
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Coupon Modal */}
        <Dialog open={showEditCoupon} onOpenChange={setShowEditCoupon}>
          <DialogTrigger>
            <Button variant="outline">
              Editar Cupom
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>Editar Cupom</DialogTitle>
            </DialogHeader>
            <DialogContent>
              {selectedCoupon && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="edit-coupon-code">Código do Cupom</Label>
                      <Input
                        id="edit-coupon-code"
                        type="text"
                        defaultValue={selectedCoupon.code}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-coupon-description">Descrição</Label>
                      <Input
                        id="edit-coupon-description"
                        type="text"
                        defaultValue={selectedCoupon.description}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-coupon-discount-type">Tipo de Desconto</Label>
                      <Select defaultValue={selectedCoupon.discountType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentual (%)</SelectItem>
                          <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-coupon-discount-value">Valor do Desconto</Label>
                      <Input
                        id="edit-coupon-discount-value"
                        type="number"
                        defaultValue={selectedCoupon.discountValue / 100}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-coupon-min-purchase">Compra Mínima (R$)</Label>
                      <Input
                        id="edit-coupon-min-purchase"
                        type="number"
                        defaultValue={selectedCoupon.minPurchase / 100}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-coupon-usage-limit">Limite de Uso</Label>
                      <Input
                        id="edit-coupon-usage-limit"
                        type="number"
                        defaultValue={selectedCoupon.usageLimit}
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-coupon-expires-at">Data de Validade</Label>
                      <Input
                        id="edit-coupon-expires-at"
                        type="date"
                        defaultValue={selectedCoupon.expiresAt}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="edit-coupon-status"
                        defaultChecked={selectedCoupon.status === 'active'}
                      />
                      <Label htmlFor="edit-coupon-status">Cupom ativo</Label>
                    </div>
                  </div>
                </form>
              )}
            </DialogContent>
            <DialogFooter>
              <Button type="button" onClick={() => setShowEditCoupon(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Atualizar Cupom
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CouponsPage;