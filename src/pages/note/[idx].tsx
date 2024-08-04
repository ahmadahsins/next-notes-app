import instance from "@/lib/axios/instance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NoteDetailPage = () => {
    const { idx }: any = useRouter().query;
    const [notes, setNotes] = useState<any>([]);
    const [note, setNote] = useState<any>({});

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
        setNote(notes[Number(idx)]);
    }, [idx]);

    return <div className="pt-32">{note?.note}</div>;
};

export default NoteDetailPage;
