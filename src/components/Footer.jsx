
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Subscribed',
      description: 'You have been added to our newsletter'
    });
    setEmail('');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999', '_blank');
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MB Performance</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              Estilo e performance para quem não abre mão de qualidade
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-primary-foreground/80 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground/80 transition-colors">Sobre nós</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground/80 transition-colors">Contato</Link></li>
              <li><Link to="/cart" className="hover:text-primary-foreground/80 transition-colors">Carrinho</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Políticas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-primary-foreground/80 transition-colors">Privacidade</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground/80 transition-colors">Termos de uso</Link></li>
              <li><Link to="/returns" className="hover:text-primary-foreground/80 transition-colors">Trocas e devoluções</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-foreground/80 transition-colors">Envio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Receba ofertas exclusivas
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button type="submit" variant="secondary" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/80">
            © 2026 MB Performance. Todos os direitos reservados.
          </p>
          <Button
            onClick={handleWhatsAppClick}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Suporte WhatsApp
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
