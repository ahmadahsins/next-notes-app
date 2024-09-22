"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const { data } = useSession();
    const { pathname } = useRouter();
    const { setTheme } = useTheme();
    const [mode, setMode] = React.useState<"light" | "dark">("light");

    const onCLickTheme = () => {
        setMode(mode === "dark" ? "light" : "dark");
        setTheme(mode);
    };

    return (
        <div className="fixed w-full flex item-center justify-between px-5 lg:px-10 py-5 z-50 bg-white dark:bg-black">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                <Link href="/">Noteify</Link>
            </h1>
            <div
                className={`${
                    pathname.split("/")[1] === "auth" ? "hidden" : "flex"
                } gap-3`}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onCLickTheme}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
                <Link
                    href="/create"
                    className={`${buttonVariants({
                        variant: "default",
                    })} hidden lg:block`}
                >
                    Create Note
                </Link>
                <Button onClick={data ? () => signOut() : () => signIn()}>
                    {data ? "Sign Out" : "Sign In"}
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
