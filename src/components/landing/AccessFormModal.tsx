import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitLead } from "@/lib/submit";

export default function AccessFormModal() {
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
    } catch (err:any) { toast.error(err?.message || 'Erro'); }
    finally { setIsLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input placeholder="Nome completo" value={f.nome} onChange={e=>setF({...f, nome:e.target.value})} required />
      <Input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f, email:e.target.value})} required />
      <Input placeholder="WhatsApp" value={f.telefone} onChange={e=>setF({...f, telefone:e.target.value})} required />
      <Input placeholder="Tipo de estabelecimento" value={f.tipo_estabelecimento} onChange={e=>setF({...f, tipo_estabelecimento:e.target.value})} required />
      <Button type="submit" disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</Button>
    </form>
  );
}
