import { FcGoogle } from "react-icons/fc";

export default function Header() {
    return(
        <div className="w-[1442px] px-8 py-4 border-b border-white/10 inline-flex justify-start items-center gap-[470px]">
            <div className="flex-1 flex justify-between items-center">
                <div className="self-stretch flex justify-start items-center gap-12">
                    <div className="w-44 flex justify-center items-center gap-2.5">
                        <div className="w-5 h-1.5 bg-lime-600"></div>
                        <div className="w-7 h-3 bg-lime-600"></div>
                        <div className="w-6 h-2.5 bg-lime-600"></div>
                        <div className="w-3 h-[2.64px] bg-lime-600"></div>
                        <div className="w-6 h-2.5 bg-lime-600"></div>
                        <div className="w-5 h-1.5 bg-lime-600"></div>
                        <div className="w-3 h-[2.67px] bg-lime-600"></div>
                        <div className="justify-start text-white text-3xl font-bold font-['Mulish'] leading-10">Mave</div>
                    </div>
                    <div className="flex justify-center items-center gap-2.5">
                        <div className="justify-center text-lime-600 text-sm font-bold font-['Mulish']">Dashboard</div>
                    </div>
                    <div data-state="Default" className="flex justify-center items-center gap-2.5">
                        <div className="justify-center text-zinc-500 text-sm font-semibold font-['Mulish']">Transações</div>
                    </div>
                    <div data-state="Default" className="flex justify-center items-center gap-2.5">
                        <div className="justify-center text-zinc-500 text-sm font-semibold font-['Mulish']">Assinatura</div>
                    </div>
                </div>
                <div data-state="Default" className="min-h-10 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-start items-center gap-3">
                    <div className="w-28 flex justify-start items-center gap-2">
                        <div data-state="Default" className="w-5 h-5 relative rounded-full">
                            <div className="w-5 h-5 left-0 top-0 absolute bg-white rounded-full"></div>
                            <img className="w-5 h-5 left-0 top-0 absolute rounded-full" src="https://placehold.co/20x20" />
                        </div>
                        <div className="justify-start text-white text-sm font-semibold font-['Mulish']">Alicia Koch</div>
                    </div>
                </div>
            </div>
        </div>
    );
}