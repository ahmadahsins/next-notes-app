import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "./ui/button";

const ButtonAdd = () => {
    return (
        <div className="lg:hidden absolute bottom-0 right-0 m-5">
            <Link
                href="/create"
                className={buttonVariants({ variant: "default" })}
            >
                <Plus className="w-6 h-6" />
            </Link>
        </div>
    );
};

export default ButtonAdd;
