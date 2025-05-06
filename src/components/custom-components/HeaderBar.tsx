import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function HeaderBar() {
    return (
        <div className="flex h-20 items-center justify-between px-8 shadow-md select-none">
            <Link to={"/"}>
                <img
                    src="/assets/rccpb-01.png"
                    alt="logo-rcc-pb"
                    className="h-[56px] w-[122px]"
                    draggable="false"
                />
            </Link>
            <div className="flex items-center gap-5">
                <Button
                    variant="ghost"
                    className="font-semibold hover:cursor-pointer"
                >
                    Sobre
                </Button>
                <Button
                    variant="ghost"
                    className="font-semibold hover:cursor-pointer"
                >
                    Cadastrar
                </Button>
                <Button
                    className="w-28 bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer"
                >
                    Login
                </Button>
            </div>
        </div>

    )
}