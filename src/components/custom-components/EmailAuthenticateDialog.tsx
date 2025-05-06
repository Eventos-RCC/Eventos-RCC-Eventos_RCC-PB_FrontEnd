import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUsers } from "@/hooks/users-hooks"

interface EmailAuthenticateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailAuthenticateDialog({ open, onOpenChange }: EmailAuthenticateDialogProps) {
  const [code, setCode] = useState("")
  const { loading, error, setError } = useUsers();
  const email = sessionStorage.getItem("emailToVerify") // recupera email

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "/users/verify-code",
        { codeUser: code },
        { headers: { email } }
      );

      console.log("Código verificado:", response.data);

      // Redirecionar ou notificar sucesso
      sessionStorage.removeItem("emailToVerify");
      onOpenChange(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao verificar código");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(
        "/users/verify-code",
        { resendCode: true },
        { headers: { email } }
      );
    } catch {
      setError("Erro ao reenviar código.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmação de email</DialogTitle>
          <DialogDescription>
            Enviamos um código para o seu e-mail. Digite-o abaixo para continuar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="auth_code" className="text-right">
              Código
            </Label>
            <Input
              id="auth_code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="col-span-3"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={loading} className="bg-green-600 text-white hover:bg-green-700">
            {loading ? "Verificando..." : "Confirmar"}
          </Button>
          <Button onClick={handleResend} variant="outline" disabled={loading}>
            Reenviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
