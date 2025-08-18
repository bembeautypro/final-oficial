import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitLead } from "@/lib/submit";

interface AccessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessFormModal({ isOpen, onClose }: AccessFormModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [f, setF] = React.useState({ nome: "", email: "", telefone: "" });

  // trava o scroll do body quando o modal está aberto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await submitLead({ nome: f.nome, email: f.email, telefone: f.telefone });
      if (!res.ok) throw new Error(res.error);
      toast.success("Solicitação enviada!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        // um único className
        className="
          w-[95vw] max-w-md
          max-h-[90dvh] overflow-auto
          p-0 sm:rounded-xl
        "
      >
        <DialogHeader className="space-y-3 pb-4 pt-6 px-6">
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">
            Solicitar Acesso Exclusivo
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-muted-foreground">
            Preencha os dados abaixo para ter acesso ao NIVELA®
            <br />
            <span className="text-xs text-brand-latte font-medium">* Campos obrigatórios</span>
          </DialogDescription>
        </DialogHeader>

        <form id="form-pro" data-form="lead" onSubmit={onSubmit} className="space-y-5 px-6 pb-6 form">
          {/* Honeypot anti-spam */}
          <input
            type="text" name="hp" id="hp"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            tabIndex={-1} autoComplete="off"
          />

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                value={f.nome}
                onChange={(e) => setF({ ...f, nome: e.target.value })}
                required
                autoComplete="name"
                className="h-12"
                style={{ fontSize: 16 }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                E-mail <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="voce@exemplo.com"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                required
                autoComplete="email"
                className="h-12"
                style={{ fontSize: 16 }}
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
                onChange={(e) => setF({ ...f, telefone: e.target.value })}
                required
                autoComplete="tel"
                className="h-12"
                style={{ fontSize: 16 }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="h-12 text-sm">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              data-gtm-event="generate_lead"
              className="flex-1 h-12 text-sm font-medium bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black hover:scale-105"
            >
              {isLoading ? "Enviando..." : "Solicitar Acesso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
