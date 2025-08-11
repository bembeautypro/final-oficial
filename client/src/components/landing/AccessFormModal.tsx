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
        ...f,
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Acesso Exclusivo</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para ter acesso ao NIVELA®
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Nome completo" value={f.nome} onChange={e=>setF({...f, nome:e.target.value})} required />
          <Input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f, email:e.target.value})} required />
          <Input placeholder="WhatsApp" value={f.telefone} onChange={e=>setF({...f, telefone:e.target.value})} required />
          <Input placeholder="Tipo de estabelecimento" value={f.tipo_estabelecimento} onChange={e=>setF({...f, tipo_estabelecimento:e.target.value})} required />
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}