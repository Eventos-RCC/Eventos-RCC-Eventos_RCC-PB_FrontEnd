import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "@/components/custom-components/MaskedInput";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { maskDate } from "@/utils/masks";
import { toast } from "sonner";

const createEventSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9\s]+$/, "Nome inválido"),
  description: z.string().regex(/^[a-zA-Z0-9\s]+$/, "Descrição inválida"),
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

export function CreateEventCard() {
  const { loading, createEvent } = useEvents();

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      eventType: undefined,
      diocese: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createEventSchema>) => {
    try {
      const response = await createEvent(data);
      console.log("Evento criado com sucesso", response);
      toast("Evento criado com sucesso", {
        duration: 5000,
        icon: <CircleCheck className="text-white" />,
        style: {
          backgroundColor: "#16a34a",
          color: "white",
          gap: "1rem",
        },
      });
    } catch (error) {
      console.error("Erro ao criar evento", error);
      toast("Erro ao criar evento", {
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

  return (
    <Card className="w-4xl p-6 mx-auto">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle>Crie um evento</CardTitle>
        <CardDescription>
          Preencha as informações corretamente para criar um evento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modalidade do evento</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="diocese"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diocese</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
            </div>
              <CardFooter className="flex justify-end w-full gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-48 hover:bg-green-50 hover:cursor-pointer">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="w-48 bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer">
                  {loading ? <Loader className="animate-spin" /> : "Prosseguir"}
                </Button>
              </CardFooter>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
