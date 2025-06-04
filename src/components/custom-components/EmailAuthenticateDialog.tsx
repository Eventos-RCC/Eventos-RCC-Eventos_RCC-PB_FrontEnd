import { useState } from "react";
import api from "@/apis/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUsers } from "@/hooks/users-hooks";
import { CircleCheck, CircleX, Loader } from "lucide-react";
import { MaskedInput } from "@/components/custom-components/MaskedInput";
import { maskVerificationCode } from "@/utils/masks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface EmailAuthenticateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailAuthenticateDialog({
  open,
  onOpenChange,
}: EmailAuthenticateDialogProps) {
  const [code, setCode] = useState("");
  const { loading, error, setError } = useUsers();

  const navigate = useNavigate();
  const email = sessionStorage.getItem("emailToVerify"); // recupera email

  const handleConfirm = async () => {
    try {
      const response = await api.post("/users/verify-code", { codeUser: code, email });
      console.log("Código verificado com sucesso");
      console.log(response.data);
      sessionStorage.removeItem("emailToVerify");
      onOpenChange(false);
      toast("Código verificado com sucesso e usuário registrado", {
        duration: 5000,
        icon: <CircleCheck className="text-white" />,
        style: {
          backgroundColor: "#16a34a",
          color: "white",
          gap: "1rem",
        },
      });
      navigate("/user");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao verificar código");
      toast("Erro ao verificar código", {
        duration: 5000,
        icon: <CircleX className="text-white" />,
        style: {
          backgroundColor: "#dc2626",
          color: "white",
          gap: "1rem",
        },
      });
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/users/verify-code", { resendCode: true, email });
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
            Enviamos um código para o seu e-mail. Digite-o abaixo para
            continuar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="auth_code" className="text-right">
              Código
            </Label>
            <MaskedInput
              mask={maskVerificationCode}
              id="auth_code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="col-span-3"
              autoComplete="off"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? <Loader className="animate-spin" /> : "Confirmar"}
          </Button>
          <Button onClick={handleResend} variant="outline" disabled={loading}>
            Reenviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
