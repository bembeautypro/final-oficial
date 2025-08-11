import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitDistribuidor } from "@/lib/submit";

export default function DistributorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [f, setF] = useState({ nome:"", email:"", empresa:"" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setIsLoading(true);
    try {
      const r = await submitDistribuidor(f);
      if (!r.ok) throw new Error(r.error);
      toast.success('Cadastro enviado!');
      setF({ nome:"", email:"", empresa:"" });
    } catch (err:any) { toast.error(err?.message || 'Erro'); }
    finally { setIsLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input placeholder="Nome" value={f.nome} onChange={e=>setF({...f, nome:e.target.value})} required />
      <Input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f, email:e.target.value})} required />
      <Input placeholder="Empresa (opcional)" value={f.empresa} onChange={e=>setF({...f, empresa:e.target.value})} />
      <Button type="submit" disabled={isLoading}>{isLoading ? 'Enviando...' : 'Quero ser distribuidor'}</Button>
    </form>
  );
}
