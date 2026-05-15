
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '@/data/products';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjVGNUY1Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Adicionado ao carrinho",
        description: `${product.title} foi adicionado ao seu carrinho.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar",
        description: error.message,
        variant: 'destructive'
      });
    }
  }, [product, addToCart, toast, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
          <div className="relative overflow-hidden aspect-[4/5]">
            <img
              src={product.image || placeholderImage}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.category && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                {product.category}
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {product.description}
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold">{displayPrice}</span>
              {hasSale && (
                <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
              )}
            </div>
            <Button 
              onClick={handleAddToCart} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> 
              Adicionar
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with local mock data
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 500);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner size="xl" className="h-64" />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-8 bg-card border border-border rounded-xl">
        <p>Nenhum produto disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;
