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
  Button,
  ButtonGroup
} from '@/components/ui/button';
import {
  Pencil,
  Trash2,
  Plus,
  Edit,
  Copy,
  Download,
  Upload
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
import {
  useCart
} from '@/hooks/useCart';
import {
  useNavigate
} from 'react-router-dom';

const ProductsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock products data - would come from API in real implementation
  const mockProductsData = [
    {
      id: 'prod_1',
      name: 'Sutiã Fitness Premium',
      category: 'Tops',
      price: 18990,
      salePrice: null,
      stock: 15,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1505439209673-f64fe7bec652'
    },
    {
      id: 'prod_2',
      name: 'Top Fitness Básico',
      category: 'Tops',
      price: 12990,
      salePrice: 9990,
      stock: 25,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1628971021877-37187fde57f4'
    },
    {
      id: 'prod_3',
      name: 'Legging Cintura Alta',
      category: 'Leggings',
      price: 24990,
      salePrice: null,
      stock: 18,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1702508963151-63f7a1269e56'
    },
    {
      id: 'prod_4',
      name: 'Jaqueta Corta-Vento',
      category: 'Casacos',
      price: 34990,
      salePrice: 29990,
      stock: 10,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1640387751082-e2f9357f67ad'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProductsData);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Produto excluído',
        description: 'Produto removido com sucesso',
        variant: 'success'
      });
    }
  };

  const handleToggleStatus = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
          : p
      )
    );
    toast({
      title: 'Status atualizado',
      description: `Produto ${products.find(p => p.id === id)?.status === 'active' ? 'desativado' : 'ativado'}`,
      variant: 'success'
    });
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: `prod_${Date.now()}` }]);
    setShowAddProduct(false);
    toast({
      title: 'Produto adicionado',
      description: 'Produto criado com sucesso',
      variant: 'success'
    });
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setShowEditProduct(false);
    toast({
      title: 'Produto atualizado',
      description: 'Produto atualizado com sucesso',
      variant: 'success'
    });
  };

  const categories = ['Tops', 'Leggings', 'Shorts', 'Casacos', 'Macacões', 'Acessórios'];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-foreground">
            Gestão de Produtos
          </h1>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowAddProduct(true)}
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Produto
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
              <Label htmlFor="search">Buscar produtos</Label>
              <Input
                id="search"
                type="search"
                placeholder="Digite o nome do produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="category-filter">Categoria</Label>
              <Select onValueChange={setFilterCategory} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              Lista de produtos ({filteredProducts.length} produtos)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-24">Categoria</TableHead>
                <TableHead className="w-20">Preço</TableHead>
                <TableHead className="w-20">Estoque</TableHead>
                <TableHead className="w-16">Status</TableHead>
                <TableHead className="w-20">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableColSpan columnSpan={7}>
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Carregando produtos...</p>
                    </div>
                  </TableColSpan>
                </TableRow>
              ) : (
                filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableColSpan columnSpan={7}>
                      <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-muted-foreground">Nenhum produto encontrado</p>
                      </div>
                    </TableColSpan>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {product.id}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-green-600">
                          R$ {(product.price / 100).toFixed(2)}
                        </p>
                        {product.salePrice && (
                          <>
                            <p className="text-sm line-through text-muted-foreground">
                              R$ {(product.price / 100).toFixed(2)}
                            </p>
                            <p className="font-medium text-red-600">
                              R$ {(product.salePrice / 100).toFixed(2)}
                            </p>
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{product.stock}</p>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? 'Ativo' : 'Inativo'}
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
                            <DropdownMenuItem onClick={() => setSelectedProduct(product)}>
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)}>
                              Excluir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(product.id)}>
                              {product.status === 'active' ? 'Desativar' : 'Ativar'}
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

        {/* Add Product Modal */}
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
          <DialogTrigger>
            <Button variant="outline">
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-2xl sm:max-w-full">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="product-name">Nome do Produto</Label>
                    <Input
                      id="product-name"
                      type="text"
                      placeholder="Digite o nome do produto"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="product-description">Descrição</Label>
                    <Textarea
                      id="product-description"
                      placeholder="Descreva o produto..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-price">Preço (R$)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-sale-price">Preço Promocional (R$)</Label>
                    <Input
                      id="product-sale-price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-stock">Estoque</Label>
                    <Input
                      id="product-stock"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-image">URL da Imagem</Label>
                    <Input
                      id="product-image"
                      type="text"
                      placeholder="URL da imagem do produto"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="product-status"
                      checked={true}
                    />
                    <Label htmlFor="product-status">Produto ativo</Label>
                  </div>
                </div>
              </form>
            </DialogContent>
            <DialogFooter>
              <Button type="button" onClick={() => setShowAddProduct(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Produto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={showEditProduct} onOpenChange={setShowEditProduct}>
          <DialogTrigger>
            <Button variant="outline">
              Editar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-2xl sm:max-w-full">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
            </DialogHeader>
            <DialogContent>
              {selectedProduct && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="edit-product-name">Nome do Produto</Label>
                      <Input
                        id="edit-product-name"
                        type="text"
                        defaultValue={selectedProduct.name}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-product-category">Categoria</Label>
                      <Select defaultValue={selectedProduct.category}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-product-description">Descrição</Label>
                      <Textarea
                        id="edit-product-description"
                        defaultValue={selectedProduct.description || ''}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-product-price">Preço (R$)</Label>
                      <Input
                        id="edit-product-price"
                        type="number"
                        defaultValue={selectedProduct.price / 100}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-product-sale-price">Preço Promocional (R$)</Label>
                      <Input
                        id="edit-product-sale-price"
                        type="number"
                        defaultValue={selectedProduct.salePrice ? selectedProduct.salePrice / 100 : ''}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-product-stock">Estoque</Label>
                      <Input
                        id="edit-product-stock"
                        type="number"
                        defaultValue={selectedProduct.stock}
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-product-image">URL da Imagem</Label>
                      <Input
                        id="edit-product-image"
                        type="text"
                        defaultValue={selectedProduct.image}
                        placeholder="URL da imagem do produto"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="edit-product-status"
                        defaultChecked={selectedProduct.status === 'active'}
                      />
                      <Label htmlFor="edit-product-status">Produto ativo</Label>
                    </div>
                  </div>
                </form>
              )}
            </DialogContent>
            <DialogFooter>
              <Button type="button" onClick={() => setShowEditProduct(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Atualizar Produto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductsPage;