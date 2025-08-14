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
  const [f, setF] = useState({ nome:"", email:"", telefone:"" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    
    // GTmetrix: Check honeypot anti-spam
    const formElement = e.currentTarget as HTMLFormElement;
    const honeypot = formElement.querySelector('input[name="hp"]') as HTMLInputElement;
    if (honeypot?.value) return; // Silent reject if bot filled honeypot
    
    setIsLoading(true);
    try {
      const r = await submitLead({
        nome: f.nome,
        email: f.email,
        telefone: f.telefone,
      });
      if (!r.ok) throw new Error(r.error);
      toast.success('Enviado com sucesso!');
      setF({ nome:"", email:"", telefone:"" });
      onClose(); // Fechar modal após sucesso
    } catch (err:any) { toast.error(err?.message || 'Erro'); }
    finally { setIsLoading(false); }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto modal-form">
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
        <form id="form-pro" data-form="lead" onSubmit={onSubmit} className="space-y-5 form">
          {/* GTmetrix: Honeypot anti-spam */}
          <input type="text" name="hp" className="honeypot" tabIndex={-1} autoComplete="off" />
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <Input 
                type="text"
                placeholder="Digite seu nome completo" 
                value={f.nome} 
                onChange={e=>setF({...f, nome:e.target.value})} 
                required 
                autoComplete="name"
                className="h-12"
                style={{fontSize: '16px'}}
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
                autoComplete="email"
                className="h-12"
                style={{fontSize: '16px'}}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <Input 
                type="tel"
                inputMode="tel"
                placeholder="(11) 99999-9999" 
                value={f.telefone} 
                onChange={e=>setF({...f, telefone:e.target.value})} 
                required 
                autoComplete="tel"
                className="h-12"
                style={{fontSize: '16px'}}
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