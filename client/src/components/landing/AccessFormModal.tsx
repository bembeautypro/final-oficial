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
      
      // Meta Pixel Lead Event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }
      
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
  className="
    fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    w-[92vw] max-w-[400px] min-w-[320px]
    max-h-[90vh] overflow-y-auto
    p-0 rounded-lg sm:rounded-xl
    bg-white dark:bg-gray-900
    shadow-2xl border border-gray-200 dark:border-gray-700
  "
>
        <DialogHeader className="space-y-2 pb-3 pt-4 px-4 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle className="text-base sm:text-lg font-bold text-center leading-tight">
            Solicitar Acesso Exclusivo
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-center text-muted-foreground leading-tight">
            Preencha os dados abaixo para ter acesso ao NIVELA®
            <br />
            <span className="text-xs text-brand-latte font-medium">* Campos obrigatórios</span>
          </DialogDescription>
        </DialogHeader>

        <form id="form-pro" data-form="lead" onSubmit={onSubmit} className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6 sm:space-y-5 form">
          {/* Honeypot anti-spam */}
          <input
            type="text" name="hp" id="hp"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            tabIndex={-1} autoComplete="off"
          />

          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                value={f.nome}
                onChange={(e) => setF({ ...f, nome: e.target.value })}
                required
                autoComplete="name"
                className="h-10 sm:h-12 text-sm"
                style={{ fontSize: 16 }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                E-mail <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="voce@exemplo.com"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                required
                autoComplete="email"
                className="h-10 sm:h-12 text-sm"
                style={{ fontSize: 16 }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-foreground">
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
                className="h-10 sm:h-12 text-sm"
                style={{ fontSize: 16 }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="h-10 sm:h-12 text-xs sm:text-sm order-2 sm:order-1"
              data-testid="button-cancel"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              data-gtm-event="generate_lead"
              data-testid="button-submit-access"
              className="flex-1 h-10 sm:h-12 text-xs sm:text-sm font-medium bg-gradient-to-r from-brand-caramel to-brand-latte text-brand-black hover:scale-105 order-1 sm:order-2"
            >
              {isLoading ? "Enviando..." : "Solicitar Acesso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
