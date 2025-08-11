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
  const [f, setF] = useState({ nome:"", email:"", empresa:"", cidade:"", estado:"", mensagem:"", experiencia_distribuicao:"" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const r = await submitDistribuidor(f);
      if (!r.ok) throw new Error(r.error);
      toast.success('Cadastro enviado com sucesso!');
      setF({ nome:"", email:"", empresa:"", cidade:"", estado:"", mensagem:"", experiencia_distribuicao:"" });
      setIsModalOpen(false);
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
    <section id={id} className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Torne-se um <span className="text-brand-latte">Distribuidor NIVELA®</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Faça parte da revolução da beleza profissional. Oportunidade exclusiva para distribuidores 
              comprometidos com a excelência.
            </p>
          </div>

          {/* Benefits Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-brand-latte/20 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-brand-latte" />
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
              className="min-h-[56px] min-w-[300px] px-8 py-4 bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black font-semibold rounded-xl hover:scale-105 focus:scale-105 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-latte/50"
              aria-label="Quero ser distribuidor NIVELA"
            >
              QUERO SER DISTRIBUIDOR
            </button>
          </div>
        </AnimatedSection>

        {/* Distributor Form Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastro de Distribuidor</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo para se tornar um distribuidor NIVELA®
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Nome completo" 
                  value={f.nome} 
                  onChange={e=>setF({...f, nome:e.target.value})} 
                  required 
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={f.email} 
                  onChange={e=>setF({...f, email:e.target.value})} 
                  required 
                />
              </div>
              <Input 
                placeholder="Empresa (se houver)" 
                value={f.empresa} 
                onChange={e=>setF({...f, empresa:e.target.value})} 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Cidade" 
                  value={f.cidade} 
                  onChange={e=>setF({...f, cidade:e.target.value})} 
                />
                <Input 
                  placeholder="Estado" 
                  value={f.estado} 
                  onChange={e=>setF({...f, estado:e.target.value})} 
                />
              </div>
              <Input 
                placeholder="Experiência em distribuição (opcional)" 
                value={f.experiencia_distribuicao} 
                onChange={e=>setF({...f, experiencia_distribuicao:e.target.value})} 
              />
              <textarea 
                className="w-full p-3 border border-input bg-background rounded-md resize-none min-h-[100px]" 
                placeholder="Mensagem (opcional)"
                value={f.mensagem} 
                onChange={e=>setF({...f, mensagem:e.target.value})}
              />
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Enviando...' : 'Enviar Cadastro'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
});

DistributorSection.displayName = 'DistributorSection';

export default DistributorSection;