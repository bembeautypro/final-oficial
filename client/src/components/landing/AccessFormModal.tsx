import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { submitLead } from "@/lib/submit";

interface AccessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessFormModal({ isOpen, onClose }: AccessFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [f, setF] = useState({ nome:"", email:"", telefone:"", tipo_estabelecimento:"" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setIsLoading(true);
    try {
      const utm = new URLSearchParams(window.location.search);
      const r = await submitLead({
        nome: f.nome,
        email: f.email,
        telefone: f.telefone,
        tipoEstabelecimento: f.tipo_estabelecimento || undefined,
        utm_source: utm.get('utm_source'),
        utm_medium: utm.get('utm_medium'),
        utm_campaign: utm.get('utm_campaign')
      });
      if (!r.ok) throw new Error(r.error);
      toast.success('Enviado com sucesso!');
      setF({ nome:"", email:"", telefone:"", tipo_estabelecimento:"" });
      onClose(); // Fechar modal após sucesso
    } catch (err:any) { toast.error(err?.message || 'Erro'); }
    finally { setIsLoading(false); }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4">
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">
            Solicitar Acesso Exclusivo
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-muted-foreground">
            Preencha os dados abaixo para ter acesso ao NIVELA®
            <br />
            <span className="text-xs text-brand-latte font-medium">* Campos obrigatórios</span>
          </DialogDescription>
        </DialogHeader>
        <form id="form-pro" data-form="lead" onSubmit={onSubmit} className="space-y-5">
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
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                Tipo de estabelecimento <span className="text-red-500">*</span>
              </label>
              <Input 
                placeholder="Ex: Salão de beleza, Barbearia, Clínica estética" 
                value={f.tipo_estabelecimento} 
                onChange={e=>setF({...f, tipo_estabelecimento:e.target.value})} 
                required 
                className="h-12"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 text-sm font-medium"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              data-gtm-event="generate_lead"
              className="flex-1 h-12 text-sm font-medium bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black hover:scale-105"
            >
              {isLoading ? 'Enviando...' : 'Solicitar Acesso'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}