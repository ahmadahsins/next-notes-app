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
import { Trash } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import ModalEditNote from "@/components/ModalEditNote";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

    const handleDelete = async (idx: number) => {
        const newNotes = notes;
        newNotes.splice(idx, 1);
        setNotes(newNotes);
        const data = {
            notes: notes,
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
                {notes
                    ? notes.map((note: any, index: number) => (
                          //   <Link href={`/note/${index}`} key={index}>
                          <Card
                              className="w-full h-full flex flex-col justify-between border border-primary hover:border-2"
                              key={index}
                          >
                              <CardHeader className="-mb-2">
                                  <CardTitle className="text-xl line-clamp-1">
                                      {note.title}
                                  </CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="line-clamp-3">{note.note}</p>
                              </CardContent>
                              <CardFooter className="flex gap-2">
                                  <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                          <Button
                                              variant="destructive"
                                              size={"icon"}
                                          >
                                              <Trash />
                                          </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                          <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                  Are you sure to delete this
                                                  note?
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                  This action cannot be undone.
                                                  This will permanently delete
                                                  your note from our servers.
                                              </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                              <AlertDialogCancel>
                                                  Cancel
                                              </AlertDialogCancel>
                                              <AlertDialogAction
                                                  onClick={() => {
                                                      handleDelete(index);
                                                  }}
                                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                              >
                                                  Delete
                                              </AlertDialogAction>
                                          </AlertDialogFooter>
                                      </AlertDialogContent>
                                  </AlertDialog>
                                  <ModalEditNote
                                      note={note}
                                      idx={index}
                                      notes={notes}
                                      getNotes={getNotes}
                                  />
                              </CardFooter>
                          </Card>
                          //   </Link>
                      ))
                    : "No notes"}
            </div>
            <ButtonAdd />
        </div>
    );
}
