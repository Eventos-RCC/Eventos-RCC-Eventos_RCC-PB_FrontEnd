import { HeaderBar } from "@/components/custom-components/HeaderBar";

export function LandingPage() {
    return (
        <>
            <HeaderBar />
            <div
                className={`flex h-[600px] w-full items-center justify-center bg-[url('/assets/rcc-landing-img.png')] from-transparent to-white bg-cover bg-center bg-no-repeat`}
            >
                <h1 className="text-white text-4xl font-bold text-center">
                    Encontre e participe de eventos da Renovação<br/>Carismática Católica da Paraíba
                </h1>
            </div>
        </>
    )
}