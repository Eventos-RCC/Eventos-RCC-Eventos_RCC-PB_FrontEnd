import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { MaskedInput } from "@/components/custom-components/MaskedInput";
import { maskDate } from "@/utils/masks";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEvents } from "@/hooks/events-hooks";
import { CircleCheck, CircleX, Loader } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

const updateEventSchema = z.object({
    name: z.string().regex(/^[\p{L}\p{M}0-9\s]+$/u, "Nome inválido"),
    description: z.string().regex(/^[\p{L}0-9\s.,!?()-]+$/u, "Descrição inválida"),
    startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida"),
    endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida"),
    eventType: z.enum([
        "Retiro",
        "Congresso Estadual",
        "Congresso Diocesano",
        "Jesus no Litoral",
        "Jesus no Sertão",
        "Seminário de Vida no Espírito Santo",
    ]),
    diocese: z.enum([
        "Arquidiocese da Paraíba",
        "Diocese de Guarabira",
        "Diocese de Campina Grande",
        "Diocese de Patos",
        "Diocese de Cajazeiras",
        "Outra",
    ]),
});

interface EventUpdateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdated: () => void;
    eventId: string;
    eventData: {
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        eventType: "Retiro" | "Congresso Estadual" | "Congresso Diocesano" | "Jesus no Litoral" | "Jesus no Sertão" | "Seminário de Vida no Espírito Santo";
        diocese: "Arquidiocese da Paraíba" | "Diocese de Guarabira" | "Diocese de Campina Grande" | "Diocese de Patos" | "Diocese de Cajazeiras" | "Outra";
    }
}

export function EventUpdateDialog({
    open,
    onOpenChange,
    onUpdated,
    eventId,
    eventData
}: EventUpdateDialogProps) {

    const { loading, updateEvent } = useEvents();

    const form = useForm<z.infer<typeof updateEventSchema>>({
        resolver: zodResolver(updateEventSchema),
        defaultValues: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            eventType: undefined,
            diocese: undefined,
        },
    });

    useEffect(() => {
        if (open && eventData) {
            form.reset({
                name: eventData.name,
                description: eventData.description,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                eventType: eventData.eventType,
                diocese: eventData.diocese,
            })
        }
    }, [open, eventData, form]);

    const onSubmit = async (data: z.infer<typeof updateEventSchema>) => {
        console.log('submit', data);
        try {
            const response = await updateEvent({ ...data, id: eventId });
            console.log("Evento atualizado com sucesso:", response);
            toast("Evento atualizado com sucesso", {
                duration: 5000,
                icon: <CircleCheck className="text-white" />,
                style: {
                    backgroundColor: "#16a34a",
                    color: "white",
                    gap: "1rem",
                },
            });
            onOpenChange(false);
            onUpdated();
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
            toast("Erro ao atualizar evento", {
                duration: 5000,
                icon: <CircleX className="text-white" />,
                style: {
                    backgroundColor: "#dc2626",
                    color: "white",
                    gap: "1rem",
                },
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormProvider {...form}>
                <DialogContent className="sm:max-w-[425px] scroll-auto">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Editar evento</DialogTitle>
                            <DialogDescription>
                                Faça as alterações que desejar e depois clique em 'salvar' para confirmar
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex.: Encontro Estadual Ser Coordenador é uma Benção"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex.: Um encontro especial para os coordenadores de grupos de oração do Estado da Paraíba"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Data de início</FormLabel>
                                            <FormControl>
                                                <MaskedInput
                                                    placeholder="Ex.: 01/01/2000"
                                                    mask={maskDate}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Data de encerramento</FormLabel>
                                            <FormControl>
                                                <MaskedInput
                                                    placeholder="Ex.: 01/01/2000"
                                                    mask={maskDate}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="eventType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Modalidade do evento</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione a modalidade do evento" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Retiro">Retiro</SelectItem>
                                                            <SelectItem value="Congresso Estadual">
                                                                Congresso Estadual
                                                            </SelectItem>
                                                            <SelectItem value="Congresso Diocesano">
                                                                Congresso Diocesano
                                                            </SelectItem>
                                                            <SelectItem value="Jesus no Litoral">
                                                                Jesus no Litoral
                                                            </SelectItem>
                                                            <SelectItem value="Jesus no Sertão">
                                                                Jesus no Sertão
                                                            </SelectItem>
                                                            <SelectItem value="Seminário de Vida no Espírito Santo">
                                                                Seminário de Vida no Espírito Santo
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="diocese"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Diocese</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione a diocese" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Arquidiocese da Paraíba">
                                                                Arquidiocese da Paraíba
                                                            </SelectItem>
                                                            <SelectItem value="Diocese de Guarabira">
                                                                Diocese de Guarabira
                                                            </SelectItem>
                                                            <SelectItem value="Diocese de Campina Grande">
                                                                Diocese de Campina Grande
                                                            </SelectItem>
                                                            <SelectItem value="Diocese de Patos">
                                                                Diocese de Patos
                                                            </SelectItem>
                                                            <SelectItem value="Diocese de Cajazeiras">
                                                                Diocese de Cajazeiras
                                                            </SelectItem>
                                                            <SelectItem value="Outra">Outra</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose onClick={() => onOpenChange(false)}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="hover:cursor-pointer"
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer"
                                >
                                    {loading ? <Loader className="animate-spin" /> : "Salvar"}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </FormProvider>
        </Dialog >
    )
}