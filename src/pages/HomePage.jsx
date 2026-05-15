
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, Tag, Search, ShoppingBag, CreditCard, Package } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';
import ProductsList from '@/components/ProductsList.jsx';
import TrustCard from '@/components/TrustCard.jsx';
import HowItWorksStep from '@/components/HowItWorksStep.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast({
        title: 'Email obrigatório',
        description: 'Por favor, insira seu email',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Inscrito com sucesso',
      description: 'Você receberá nossas novidades em breve'
    });
    setNewsletterEmail('');
  };

  const categories = [
    {
      title: "Tops Esportivos",
      image: 'https://images.unsplash.com/photo-1505439209673-f64fe7bec652',
      link: '/shop'
    },
    {
      title: 'Leggings Premium',
      image: 'https://images.unsplash.com/photo-1702508963151-63f7a1269e56',
      link: '/shop'
    },
    {
      title: 'Conjuntos',
      image: 'https://images.unsplash.com/photo-1548207762-0340cfc5a58c',
      link: '/shop'
    }
  ];

  const testimonials = [
    {
      name: 'Camila Rodrigues',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      rating: 5,
      comment: 'A legging de cintura alta é perfeita! Não fica transparente no agachamento e veste super bem.',
      location: 'São Paulo, SP'
    },
    {
      name: 'Rafael Santos',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      rating: 5,
      comment: 'Comprei um conjunto para minha esposa e ela amou. A qualidade do tecido é impressionante.',
      location: 'Rio de Janeiro, RJ'
    },
    {
      name: 'Juliana Costa',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      rating: 4,
      comment: 'Os tops dão uma sustentação incrível para corrida. Já quero comprar de outras cores!',
      location: 'Belo Horizonte, MG'
    }
  ];

  return (
    <>
      <Helmet>
        <title>MB Performance - Vestuário Fitness Feminino Premium</title>
        <meta name="description" content="Descubra a coleção MB Performance. Roupas fitness femininas que unem alta performance, tecnologia e design exclusivo." />
      </Helmet>

      <Header onCartClick={() => setIsCartOpen(true)} />
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
            alt="Mulher treinando com roupas fitness de alta performance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Sua Melhor Performance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Vestuário fitness feminino premium. Tecnologia, conforto e design para você superar seus limites.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-xl">
              <Link to="/shop">Ver Coleção Completa</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TrustCard
              icon={Truck}
              title="Frete grátis"
              description="Em compras acima de R$ 299 para todo o Brasil"
            />
            <TrustCard
              icon={RefreshCw}
              title="Troca garantida"
              description="Primeira troca grátis em até 30 dias"
            />
            <TrustCard
              icon={Tag}
              title="Qualidade Premium"
              description="Tecidos tecnológicos de alta durabilidade"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore por categoria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl h-96 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <span className="text-white/90 text-sm font-medium">Explorar Coleção →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">Lançamentos Fitness</h2>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/shop">Ver todos os produtos</Link>
            </Button>
          </div>
          <ProductsList />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Como funciona</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Comprar na MB Performance é simples e seguro. Siga estes passos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <HowItWorksStep
              number="1"
              icon={Search}
              title="Navegue"
              description="Explore nossa coleção e encontre suas peças favoritas"
            />
            <HowItWorksStep
              number="2"
              icon={ShoppingBag}
              title="Escolha o tamanho"
              description="Selecione o tamanho perfeito usando nosso guia"
            />
            <HowItWorksStep
              number="3"
              icon={ShoppingBag}
              title="Adicione ao carrinho"
              description="Adicione os produtos desejados ao seu carrinho"
            />
            <HowItWorksStep
              number="4"
              icon={CreditCard}
              title="Finalize a compra"
              description="Pague de forma segura com cartão ou PIX"
            />
            <HowItWorksStep
              number="5"
              icon={Package}
              title="Receba em casa"
              description="Entrega rápida e rastreamento em tempo real"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">O que nossas clientes dizem</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Mulheres reais que transformaram seus treinos com a MB Performance
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="text-primary-foreground/90 mb-8 leading-relaxed">
            Receba em primeira mão lançamentos, promoções exclusivas e dicas de treino
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1 rounded-xl"
            />
            <Button type="submit" variant="secondary" className="font-semibold rounded-xl">
              Inscrever-se
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
