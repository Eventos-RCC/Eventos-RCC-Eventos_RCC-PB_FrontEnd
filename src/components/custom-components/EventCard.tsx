import { Calendar, Church, CircleCheck, CircleX, EllipsisVertical, Loader, SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/card";
import { EventType } from "@/types/Event";
import { formatEventDateRange } from "@/utils/formatEventDateRange";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useEvents } from "@/hooks/events-hooks";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useState } from "react";

interface EventCardProps {
    event: EventType
}

export function EventCard({ event }: EventCardProps) {

    const formattedDate = formatEventDateRange(event.startDate, event.endDate)

    const { loading, deleteEventById, getEventById } = useEvents();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDeleteEvent = async () => {
        try {
            await deleteEventById();
            const result = await getEventById();
            if (!result) {
                console.log("Evento deletado com sucesso");
                toast("Evento deletado com sucesso", {
                    duration: 5000,
                    icon: <CircleCheck className="text-white" />,
                    style: {
                        backgroundColor: "#16a34a",
                        color: "white",
                        gap: "1rem",
                    },
                });
            }
        } catch (error) {
            console.error("Erro ao deletar evento:", error);
            toast("Erro ao deletar evento", {
                duration: 5000,
                icon: <CircleX className="text-white" />,
                style: {
                    backgroundColor: "#dc2626",
                    color: "white",
                    gap: "1rem",
                },
            });
        } finally {
            setIsDeleteDialogOpen(false);
        }
    }

    return (
        <Card className="w-[330px] h-[530px] relative overflow-hidden">
            <div className="relative">
                <img
                    src="/assets/evento-rcc-imagem-exemplo.png"
                    alt="imagem exemplo de evento"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white shadow hover:cursor-pointer"
                        >
                            <EllipsisVertical className="w-5 h-5 text-gray-700 hover:cursor-pointer" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-28">
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:cursor-pointer">
                                <SquarePen className="mr-2" />
                                <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setIsDeleteDialogOpen(true);
                                }}
                                className="hover:cursor-pointer"
                            >
                                <CircleX className="mr-2" />
                                <span>Deletar</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardHeader>
                <CardTitle
                    className="text-green-600">
                    {/* Encontro Ser Coordenador é uma Benção */}
                    {event.name}
                </CardTitle>
                <CardDescription>
                    {/* Um encontro especial para os coordenadores de grupos de oração do Estado da Paraíba */}
                    {event.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex gap-2">
                        <Calendar className="text-green-600" />
                        <span
                            className="font-normal"
                        >
                            {/* 05 - 06 de abril de 2025 */}
                            {formattedDate}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Church className="text-green-600" />
                        <span
                            className="font-normal"
                        >
                            {/* Congresso estadual */}
                            {event.eventType}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    className="w-full text-green-600 border-green-600 hover:bg-green-600 hover:text-white hover:cursor-pointer"
                    variant={"outline"}>
                    Ver evento
                </Button>
            </CardFooter>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                {/* <AlertDialogTrigger>
                    <Button>
                        <CircleX className="mr-2" />
                        <span>Deletar</span>
                    </Button>
                </AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Tem certeza que deseja deletar o evento?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso excuirá o evento permanentemente e removerá seus dados de nossos servidores.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer"
                            onClick={() => handleDeleteEvent()}
                        >
                            {loading ? <Loader className="animate-spin" /> : 'Deletar evento'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </Card>
    )
}