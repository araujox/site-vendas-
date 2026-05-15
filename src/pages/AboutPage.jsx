
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Award, Leaf } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Sobre Nós | MB Performance</title>
        <meta name="description" content="Conheça a história da MB Performance, nossa missão de inovar no segmento fitness e nosso compromisso com a qualidade e empoderamento feminino." />
      </Helmet>

      <Header onCartClick={() => setIsCartOpen(true)} />
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Sobre a MB Performance
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nascemos com um propósito claro: revolucionar o segmento de vestuário fitness feminino. Acreditamos que a roupa que você veste durante o treino não deve ser apenas funcional, mas também uma extensão da sua força e personalidade.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nosso compromisso é entregar peças que combinam tecnologia têxtil de ponta, design sofisticado e conforto absoluto, empoderando mulheres a alcançarem sua melhor performance, seja na academia, no estúdio ou ao ar livre.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl">
                  <Link to="/shop">Explorar Coleção</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                  <img 
                    src="https://horizons-cdn.hostinger.com/83b60dbd-0800-46aa-84e9-dcf8dfeea820/a66e7ee789ed04452d5626cb68738ee5.jpg" 
                    alt="Mulher treinando com roupas MB Performance" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground text-lg">
                Os pilares que guiam cada costura, cada design e cada decisão na MB Performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excelência</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buscamos a perfeição em cada detalhe. Desde a seleção dos tecidos até o acabamento final, garantimos durabilidade e qualidade premium.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Inovação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Investimos constantemente em tecnologia têxtil para oferecer peças que respiram, acompanham seus movimentos e melhoram sua performance.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Leaf className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustentabilidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprometidos com o futuro, adotamos práticas de produção conscientes e buscamos materiais que minimizam o impacto ambiental.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa Visão</h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light italic">
                "Ser a referência absoluta em vestuário esportivo premium feminino, inspirando uma comunidade global de mulheres fortes, confiantes e imparáveis."
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
