import { Button, buttonVariants } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { Plus } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <div
            className={`relative flex min-h-screen flex-col items-center justify-center text-2xl md:text-4xl lg:text-6xl font-bold ${inter.className}`}
        >
            Keep Your Notes in Sync.
            <Link
                href={"/create"}
                className={`${buttonVariants()} lg:hidden absolute bottom-5 right-5`}
            >
                <Plus className="h-6 w-6" />
            </Link>
        </div>
    );
}
