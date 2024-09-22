import { Inter } from "next/font/google";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import instance from "@/lib/axios/instance";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ButtonAdd from "@/components/ButtonAdd";
import { Edit, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import ModalEditNote from "@/components/ModalEditNote";

const inter = Inter({ subsets: ["latin"] });

const NotesPage = () => {
    const [notes, setNotes] = useState<any>([]);

    const getNotes = async () => {
        instance
            .get("/api/note")
            .then((res) => {
                setNotes(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getNotes();
    }, []);

    const handleDelete = async (id: any) => {
        const newNotes = notes.filter((note: any) => note.id !== id);
        setNotes(newNotes);
        const data = {
            notes: newNotes,
        };

        await instance
            .put(`/api/note`, { data })
            .then(() => {
                getNotes();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div
            className={`relative flex min-h-screen flex-col items-center justify-between px-10 pt-24 ${inter.className}`}
        >
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4">
                {notes?.map((note: any) => (
                    <Card
                        className="w-full h-full flex flex-col justify-between border border-zinc-700"
                        key={note.id}
                    >
                        <CardHeader className="-mb-2">
                            <CardTitle className="text-lg md:text-xl line-clamp-1">
                                {note.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm md:text-base line-clamp-4">
                                {note.note}
                            </p>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size={"icon"}>
                                        <Trash />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure to delete this note?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your note
                                            from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                handleDelete(note.id);
                                            }}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Link
                                href={`/note/${note.id}`}
                                className={buttonVariants({ size: "icon" })}
                            >
                                <Edit />
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <ButtonAdd />
        </div>
    );
};

export default NotesPage;
