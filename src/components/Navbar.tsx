import { signIn, signOut, useSession } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
    const { data } = useSession();
    return (
        <div className="fixed w-full flex item-center justify-between px-5 lg:px-10 py-5 z-50 bg-white dark:bg-black">
            <h1 className="text-3xl font-bold">
                <Link href="/">NotesApp</Link>
            </h1>
            <div className="flex gap-3">
                <Link
                    href="/create"
                    className={buttonVariants({ variant: "default" })}
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
