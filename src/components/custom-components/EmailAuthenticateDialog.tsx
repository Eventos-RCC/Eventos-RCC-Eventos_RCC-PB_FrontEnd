import { useState } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
  const email = sessionStorage.getItem("emailToVerify"); // recupera email

  const handleConfirm = async () => {
    try {
      const response = await axios.post("/users/verify-code", { codeUser: code, email });
      console.log("Código verificado com sucesso");
      console.log(response.data);
      toast("Evento criado com sucesso", {
        duration: 5000,
        icon: <CircleCheck className="text-white" />,
        style: {
          backgroundColor: "green-600",
          color: "white",
        }
      });
      <Link to={"/user"} />
      sessionStorage.removeItem("emailToVerify");
      onOpenChange(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao verificar código");
      toast("Erro ao criar evento", {
        duration: 5000,
        icon: <CircleX className="text-white" />,
        style: {
          backgroundColor: "red-600",
          color: "white",
        }
      })
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("/users/verify-code", { resendCode: true, email });
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
