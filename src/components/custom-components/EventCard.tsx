import {
    Calendar,
    Church,
    CircleCheck,
    CircleX,
    EllipsisVertical,
    Loader,
    SquarePen,
    Trash2
} from "lucide-react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useEvents } from "@/hooks/events-hooks";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "../ui/alert-dialog";
import { useState } from "react";
import { EventUpdateDialog } from "./EventUpdateDialog";
import { isValidEventType } from "@/utils/isValidEventType";
import { isValidDiocese } from "@/utils/isValidDiocese";

interface EventCardProps {
    event: EventType;
    onDeleted: () => void;
    onUpdated: () => void;
}

export function EventCard({ event, onDeleted, onUpdated }: EventCardProps) {

    const formattedDate = formatEventDateRange(event.startDate, event.endDate)

    const { deleteEventById } = useEvents();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteEvent = async () => {
        setIsDeleting(true);
        try {
            await deleteEventById(event.id);
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
            onDeleted();
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
            setIsDeleting(false);
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
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white shadow hover:cursor-pointer"
                        >
                            <EllipsisVertical className="w-5 h-5 text-gray-700 hover:cursor-pointer" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-28">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setIsUpdateDialogOpen(true)
                                }}
                                className="hover:cursor-pointer"
                            >
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
                                <Trash2 className="mr-2 text-red-600" />
                                <span className="text-red-600">Deletar</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardHeader>
                <CardTitle
                    className="text-green-600">
                    {event.name}
                </CardTitle>
                <CardDescription>
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
                            {formattedDate}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Church className="text-green-600" />
                        <span
                            className="font-normal"
                        >
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
                <EventUpdateDialog
                    open={isUpdateDialogOpen}
                    onOpenChange={setIsUpdateDialogOpen}
                    onUpdated={onUpdated}
                    eventId={event.id}
                    eventData={{
                        name: event.name,
                        description: event.description,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        eventType: isValidEventType(event.eventType) ? event.eventType : "Retiro",
                        diocese: isValidDiocese(event.diocese) ? event.diocese : "Outra",
                    }}
                />
                <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
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
                                className="hover:cursor-pointer"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer"
                                onClick={() => handleDeleteEvent()}
                            >
                                {isDeleting ? <Loader className="animate-spin" /> : 'Deletar evento'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </Card>
    )
}