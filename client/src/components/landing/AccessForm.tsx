import React, { memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { LoadingState } from "@/components/ui/loading-state";
import { toast } from "sonner";
import { submitLead } from "@/lib/submit";

interface AccessFormProps { id?: string; }

const AccessForm = memo(({ id }: AccessFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nome:"", email:"", telefone:"" });
  const [errors, setErrors] = useState({ nome:"", email:"", telefone:"" });

  const validateForm = () => {
    const e = { nome:"", email:"", telefone:"" }; let ok = true;
    const nameOk = /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(formData.nome.trim());
    if (!nameOk) { e.nome = "Nome inválido"; ok = false; }
    const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!mailOk) { e.email = "Email inválido"; ok = false; }
    const telDigits = formData.telefone.replace(/\D/g,'');
    if (!(telDigits.length>=10 && telDigits.length<=11)) { e.telefone = "WhatsApp deve ter 10–11 dígitos"; ok = false; }
    setErrors(e); return ok;
  };

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const utm = new URLSearchParams(window.location.search);
      const res = await submitLead({
        ...formData,
        utm_source: utm.get('utm_source'),
        utm_medium: utm.get('utm_medium'),
        utm_campaign: utm.get('utm_campaign')
      });
      if (!res.ok) throw new Error(res.error);
      setIsSubmitted(true);
      toast.success('Solicitação enviada!');
    } catch (err:any) {
      toast.error(err?.message || 'Erro ao enviar. Tente novamente.');
    } finally { setIsLoading(false); }
  }

  const set = (k:string, v:string)=>setFormData(p=>({...p,[k]:v}));
  const maskWhats = (v:string)=>{ const n=v.replace(/\D/g,''); if(n.length<=2)return`(${n}`; if(n.length<=7)return`(${n.slice(0,2)}) ${n.slice(2)}`; return`(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7,11)}`; };

  if (isSubmitted) return (
    <section className="py-12 px-4" id={id||"acesso"}>
      <div className="max-w-lg mx-auto text-center bg-card/50 border rounded-3xl p-12">
        <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Obrigado!</h2>
        <p className="text-lg text-muted-foreground">Sua solicitação foi enviada com sucesso.</p>
        <p className="text-base text-muted-foreground mt-2">Nossa equipe entrará em contato em até 24 horas.</p>
      </div>
    </section>
  );

  return (
    <section className="py-12 px-4" id={id||"acesso"}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Solicite seu acesso exclusivo</h2>
          <p className="text-lg text-muted-foreground">Preencha 3 campos essenciais.</p>
        </div>
        <LoadingState isLoading={isLoading} variant="skeleton" className="h-96"
          fallback={<div className="space-y-4 animate-pulse"><div className="h-12 bg-muted/20 rounded-xl"/><div className="h-12 bg-muted/20 rounded-xl"/><div className="h-12 bg-muted/20 rounded-xl"/><div className="h-12 bg-muted/20 rounded-xl"/></div>}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="sr-only" htmlFor="nome">Nome completo (obrigatório)</label>
              <Input 
                id="nome"
                placeholder="Nome completo *" 
                value={formData.nome} 
                onChange={e=>set('nome',e.target.value)} 
                required 
                className="h-14 text-base"
                data-testid="input-nome"
                aria-describedby={errors.nome ? "nome-error" : undefined}
                aria-invalid={!!errors.nome}
              />
              {errors.nome && <p id="nome-error" className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.nome}</p>}
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Email profissional (obrigatório)</label>
              <Input 
                id="email"
                type="email" 
                placeholder="Email profissional *" 
                value={formData.email} 
                onChange={e=>set('email',e.target.value)} 
                required 
                className="h-14 text-base"
                data-testid="input-email"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.email}</p>}
            </div>
            <div>
              <label className="sr-only" htmlFor="telefone">WhatsApp para contato (obrigatório)</label>
              <Input 
                id="telefone"
                inputMode="tel" 
                placeholder="WhatsApp *" 
                value={formData.telefone} 
                onChange={e=>set('telefone',maskWhats(e.target.value))} 
                required 
                className="h-14 text-base"
                data-testid="input-telefone"
                aria-describedby={errors.telefone ? "telefone-error" : undefined}
                aria-invalid={!!errors.telefone}
              />
              {errors.telefone && <p id="telefone-error" className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.telefone}</p>}
            </div>
            <Button 
              type="submit" 
              variant="premium" 
              size="xl" 
              className="w-full h-16 text-lg font-semibold mt-8"
              data-testid="button-enviar-solicitacao"
            >
              ENVIAR SOLICITAÇÃO
            </Button>
          </form>
        </LoadingState>
      </div>
    </section>
  );
});
AccessForm.displayName = 'AccessForm';
export default AccessForm;