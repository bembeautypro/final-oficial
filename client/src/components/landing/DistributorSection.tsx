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
  const [f, setF] = useState({ nome:"", email:"", telefone:"", empresa:"", cidade:"", estado:"", mensagem:"" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const r = await submitDistribuidor(f);
      if (!r.ok) throw new Error(r.error);
      toast.success('Cadastro enviado com sucesso!');
      setF({ nome:"", email:"", telefone:"", empresa:"", cidade:"", estado:"", mensagem:"" });
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
    <section id={id} className="py-20 lg:py-28 bg-gradient-to-b from-secondary/30 via-background to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(185,128,96,0.1),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(207,155,128,0.08),transparent_40%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          {/* Header */}
          <div className="text-center space-y-8 mb-20">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-brand-latte/10 border border-brand-latte/20 rounded-full">
                <span className="text-sm font-medium text-brand-latte">Oportunidade Exclusiva</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Torne-se um <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-brand-caramel to-brand-latte bg-clip-text text-transparent">
                  Distribuidor NIVELA®
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Faça parte da revolução da beleza profissional e construa um negócio sólido 
              com produtos premium de tecnologia internacional.
            </p>
          </div>

          {/* Benefits Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-brand-latte/30 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-brand-latte/10">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-caramel/20 to-brand-latte/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-brand-latte/20">
                      <IconComponent className="w-10 h-10 text-brand-latte group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-latte transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </StaggerContainer>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center space-y-6">
              <p className="text-white/60 text-sm uppercase tracking-wider font-medium">
                Comece agora sua jornada de sucesso
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative min-h-[64px] min-w-[350px] px-10 py-5 bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black font-bold text-lg rounded-2xl hover:scale-110 focus:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-latte/30 focus:outline-none focus:ring-4 focus:ring-brand-latte/50 overflow-hidden"
                aria-label="Quero ser distribuidor NIVELA"
              >
                <span className="relative z-10">QUERO SER DISTRIBUIDOR</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <p className="text-white/50 text-xs max-w-md leading-relaxed">
                * Processo de cadastro rápido e sem compromisso inicial
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Distributor Form Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[95vh] overflow-y-auto">
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
            
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                  Dados Pessoais
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                      Email profissional <span className="text-red-500">*</span>
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
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    WhatsApp/Telefone <span className="text-red-500">*</span>
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

              {/* Dados Empresariais */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                  Dados Empresariais
                </h3>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    Nome da empresa <span className="text-gray-500 text-xs">(opcional)</span>
                  </label>
                  <Input 
                    placeholder="Nome da sua empresa ou estabelecimento" 
                    value={f.empresa} 
                    onChange={e=>setF({...f, empresa:e.target.value})} 
                    className="h-12"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">
                      Cidade <span className="text-gray-500 text-xs">(opcional)</span>
                    </label>
                    <Input 
                      placeholder="Sua cidade" 
                      value={f.cidade} 
                      onChange={e=>setF({...f, cidade:e.target.value})} 
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">
                      Estado <span className="text-gray-500 text-xs">(opcional)</span>
                    </label>
                    <Input 
                      placeholder="Seu estado" 
                      value={f.estado} 
                      onChange={e=>setF({...f, estado:e.target.value})} 
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Mensagem */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                  Informações Adicionais
                </h3>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    Mensagem <span className="text-gray-500 text-xs">(opcional)</span>
                  </label>
                  <textarea 
                    className="w-full p-4 border border-input bg-background rounded-xl resize-none min-h-[120px] text-sm focus:ring-2 focus:ring-brand-latte/50 focus:border-brand-latte transition-all" 
                    placeholder="Conte-nos sobre sua experiência no setor de beleza, objetivos como distribuidor, ou qualquer informação relevante..."
                    value={f.mensagem} 
                    onChange={e=>setF({...f, mensagem:e.target.value})}
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
                  className="flex-1 h-12 text-sm font-medium bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black hover:scale-105"
                >
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