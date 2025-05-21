import { Calendar, Church } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/card";
//import { EventType } from "@/types/Event";

// interface EventCardProps {
//     event: EventType
// }

export function EventCard() {
    return (
        <Card className="w-[330px] h-[530px]">
            <img
                src="/assets/evento-rcc-imagem-exemplo.png"
                alt="imagem exemplo de evento" />
            <CardHeader>
                <CardTitle
                    className="text-green-600">
                    Encontro Ser Coordenador é uma Benção
                    {/* {name} */}
                </CardTitle>
                <CardDescription>
                    Um encontro especial para os coordenadores de grupos de oração do Estado da Paraíba
                    {/* {description} */}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex gap-2">
                        <Calendar className="text-green-600" />
                        <span
                            className="font-normal"
                        >
                            05 - 06 de abril de 2025
                            {/* {new Date(start_date).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                            })} - {new Date(end_date).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                            })} */}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Church className="text-green-600" />
                        <span
                            className="font-normal"
                        >
                            Congresso estadual
                            {/* {event_type} */}
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
        </Card>
    )
}