export default function AppLogo() {
    return (
        <>
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md">
                <img
                    src="/images/smkn-babussalam.png"
                    alt="SMK Babussalam"
                    className="size-8 object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
                <img
                    src="/images/kabasa.png"
                    alt="Kabasa"
                    className="h-8 w-auto object-contain object-left"
                />
            </div>
        </>
    );
}
