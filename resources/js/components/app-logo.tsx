export default function AppLogo() {
    return (
        <>
            <div className="flex size-8 items-center justify-center overflow-hidden rounded-md">
                <img
                    src="/images/smkn-babussalam.png"
                    alt="SMKN Babussalam"
                    className="size-8 object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <img
                    src="/images/kabasa.png"
                    alt="Kabasa"
                    className="h-5 w-auto object-contain object-left"
                />
            </div>
        </>
    );
}
