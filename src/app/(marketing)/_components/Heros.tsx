import Image from "next/image";

export const Heros = () =>{
    return(
        <>
          <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                    src={"/Documents-light.png"}
                    alt="Document icon"
                    className="object-contain dark:hidden"
                    fill
                    />
                    <Image
                    src={"/Documents-dark.png"}
                    alt="Document icon"
                    className="object-contain hidden dark:block"
                    fill
                    />
                </div>
                {/* <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] hidden md:block">
                <Image
                    src={"/Reading-light.png"}
                    alt="Reading"
                    className="object-contain dark:hidden"
                    fill
                    />
                    <Image
                    src={"/Reading-dark.png"}
                    alt="Reading"
                    className="object-contain hidden dark:block"
                    fill
                    />
                </div> */}
            </div>
          </div>
        </>
    )
}
