import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmailAuthenticateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailAuthenticateDialog({ open, onOpenChange }: EmailAuthenticateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Confirme seu e-mail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmação de email</DialogTitle>
          <DialogDescription>
            Enviamos um código para o seu e-mail. Digite-o abaixo para continuar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              defaultValue="email@email.com"
              className="col-span-3"
            />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="auth_code" className="text-right">
              Código
            </Label>
            <Input
              id="username"
              defaultValue="0000"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer">Confirmar</Button>
          <Button
            type="submit"
            variant="outline"
            className="bg-white hover:bg-green-50 hover:cursor-pointer"
          >
            Reenviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
