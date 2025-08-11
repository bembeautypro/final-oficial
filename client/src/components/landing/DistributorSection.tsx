import React, { memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { toast } from "sonner";
import { submitDistribuidor } from "@/lib/submit";
import { Users, MapPin, TrendingUp, Shield } from "lucide-react";

interface DistributorSectionProps {
  id?: string;
}

const DistributorSection = memo(({ id }: DistributorSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [f, setF] = useState({ nome:"", email:"", telefone:"" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const r = await submitDistribuidor(f);
      if (!r.ok) throw new Error(r.error);
      toast.success('Cadastro enviado com sucesso!');
      setF({ nome:"", email:"", telefone:"" });
      setIsSubmitted(true);
    } catch (err:any) { 
      toast.error(err?.message || 'Erro ao enviar cadastro'); 
    }
    finally { setIsLoading(false); }
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "Alto Potencial de Lucro",
      description: "Produtos com margem premium e demanda crescente no mercado profissional"
    },
    {
      icon: Shield,
      title: "Suporte Completo",
      description: "Treinamento, materiais de vendas e suporte técnico especializado"
    },
    {
      icon: MapPin,
      title: "Território Exclusivo",
      description: "Proteção territorial garantida para maximizar suas oportunidades"
    },
    {
      icon: Users,
      title: "Rede Consolidada",
      description: "Faça parte de uma rede de distribuidores de sucesso"
    }
  ];

  return (
    <section id={id} className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          {/* Header */}
          <div className="text-center space-y-4 lg:space-y-6 mb-12 md:mb-16 lg:mb-20">
            <div className="space-y-3 lg:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-white tracking-tight leading-[1.1]">
                Torne-se um <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Distribuidor NIVELA®</span>
              </h2>
              <div className="h-0.5 lg:h-1 bg-gradient-accent mx-auto w-16 lg:w-24"></div>
            </div>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-3xl lg:max-w-4xl mx-auto">
              Faça parte da revolução da beleza profissional. Oportunidade exclusiva para distribuidores 
              comprometidos com a excelência.
            </p>
          </div>

          {/* Benefits Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-accent/30 hover:border-accent/60 hover:scale-[1.02] transition-[transform,box-shadow] duration-200 ease-out duration-300 group shadow-card hover:shadow-card-hover">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </StaggerContainer>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              data-gtm-event="generate_lead_distribuidor"
              className="min-h-[56px] min-w-[300px] px-8 py-4 bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black font-semibold rounded-xl hover:scale-105 focus:scale-105 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-latte/50"
              aria-label="Quero ser distribuidor NIVELA"
            >
              QUERO SER DISTRIBUIDOR
            </button>
          </div>
        </AnimatedSection>

        {/* Distributor Form Modal */}
        <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) setIsSubmitted(false); }}>
          <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[95vh] overflow-y-auto">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Obrigado!</h2>
                <p className="text-lg text-muted-foreground">Seu cadastro foi enviado com sucesso.</p>
                <p className="text-base text-muted-foreground mt-2">Nossa equipe entrará em contato em até 24 horas.</p>
                <Button 
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                  className="mt-6 px-8 py-3"
                >
                  Fechar
                </Button>
              </div>
            ) : (
              <>
                <DialogHeader className="space-y-3 pb-6">
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
                    Cadastro de Distribuidor
                  </DialogTitle>
                  <DialogDescription className="text-sm text-center text-muted-foreground">
                    Preencha as informações abaixo para se tornar um distribuidor NIVELA®
                    <br />
                    <span className="text-xs text-brand-latte font-medium">* Campos obrigatórios</span>
                  </DialogDescription>
                </DialogHeader>
            
            <form id="form-dist" data-form="distribuidor" onSubmit={onSubmit} className="space-y-6">
              {/* SIMPLIFIED - 3 FIELDS ONLY */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    placeholder="Digite seu nome completo" 
                    value={f.nome} 
                    onChange={e=>setF({...f, nome:e.target.value})} 
                    required 
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={f.email} 
                    onChange={e=>setF({...f, email:e.target.value})} 
                    required 
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    placeholder="(11) 99999-9999" 
                    value={f.telefone} 
                    onChange={e=>setF({...f, telefone:e.target.value})} 
                    required 
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 h-12 text-sm font-medium"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  data-gtm-event="form_submit_distribuidor"
                  className="flex-1 h-12 text-sm font-medium bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black hover:scale-105"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Cadastro'}
                </Button>
              </div>
            </form>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
});

DistributorSection.displayName = 'DistributorSection';

export default DistributorSection;