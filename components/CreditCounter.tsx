import { MinusCircle, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

export default function CreditCounter({ counter, setCounter }: { counter: number, setCounter: Dispatch<SetStateAction<number>> }) {
    return (
        <div className="flex items-center space-x-4 mx-auto [&_svg]:w-[2rem] [&_svg]:h-[3rem] py-2">
            <Button variant="ghost" onClick={() => setCounter(Math.max(counter - 1, 0))}>
                <MinusCircle className="h-8 w-8" />
                <span className="sr-only">Decrement</span>
            </Button>
            <span className="text-lg font-semibold border px-4 py-2">{counter}</span>
            <Button variant="ghost" onClick={() => setCounter(Math.min(counter + 1, 10))}>
                <PlusCircle className="h-8 w-8 " />
                <span className="sr-only">Increment</span>
            </Button>
        </div>
    )
}