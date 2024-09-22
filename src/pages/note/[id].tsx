import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import instance from "@/lib/axios/instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    title: z.string(),
    note: z.string(),
});

const NoteDetailPage = () => {
    const { id }: any = useRouter().query;
    const [note, setNote] = useState<any>({});
    const { push } = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = form;

    const onSubmit = handleSubmit(async (values) => {
        const data = {
            id: note.id,
            title: values.title,
            note: values.note,
        };
        try {
            const res = await instance.put(`/api/note/${id}`, { data });
            if (res.status === 200) {
                form.reset();
                push("/notes");
            }
        } catch (error) {
            console.log(error);
        }
    });

    const getNote = async () => {
        instance
            .get(`/api/note/${id}`)
            .then((res) => {
                setNote(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getNote();
    }, [id]);

    return (
        <div className="flex justify-center pt-32 px-24 min-h-screen">
            <Form {...form}>
                <form
                    className="w-full flex flex-col gap-6"
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-col items-center gap-4 w-full">
                                <FormControl>
                                    <Textarea
                                        defaultValue={note?.title}
                                        className="text-3xl md:text-4xl lg:text-5xl font-bold h-14"
                                        {...field}
                                        spellCheck="false"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem className="flex-col items-center gap-4 w-full">
                                <FormControl>
                                    <Textarea
                                        className="text-xl h-[60vh]"
                                        defaultValue={note?.note}
                                        {...field}
                                        spellCheck="false"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NoteDetailPage;
