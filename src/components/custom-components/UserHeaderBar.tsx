import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
    Bell,
    LogOut,
    Settings,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function getUserInitials(name: string): string {
    const names = name.trim().split(" ");
    const first = names[0]?.charAt(0) || "";
    const last = names.length > 1 ? names[names.length - 1].charAt(0) : "";
    return `${first}${last}`.toUpperCase();
}

export function UserHeaderBar() {

    const userName = "Aldo Albuquerque"; // Substituir pela fonte real do nome
    const initials = getUserInitials(userName);

    return (
        <div className="flex h-20 items-center justify-between px-8 shadow-md select-none">
            <Link to={"/user"}>
                <img
                    src="/assets/rccpb-01.png"
                    alt="logo-rcc-pb"
                    className="h-[56px] w-[122px]"
                    draggable="false"
                />
            </Link>
            <div className="flex items-center gap-5">
                <DropdownMenu>
                    <Button
                        variant="ghost"
                        className="font-semibold hover:cursor-pointer"
                    >
                        <Bell className="w-5 h-5" />
                    </Button>
                    <DropdownMenuTrigger asChild>
                        <button>
                            <Avatar>
                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                <AvatarFallback className="bg-green-600 text-white hover:cursor-pointer hover:bg-green-500">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:cursor-pointer">
                                <User />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:cursor-pointer">
                                <Settings />
                                <span>Configurações</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:cursor-pointer">
                            <LogOut />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}