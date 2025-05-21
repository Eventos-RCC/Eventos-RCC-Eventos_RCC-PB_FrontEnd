import { HeaderBar } from "@/components/custom-components/HeaderBar";

export function LandingPage() {
    return (
        <>
            <HeaderBar />
            <div
                className={`flex h-[600px] w-full items-center justify-center bg-[url('/assets/rcc-landing-img.jpg')] from-transparent to-white bg-cover bg-center bg-no-repeat`}
            >
            </div>
        </>
    )
}