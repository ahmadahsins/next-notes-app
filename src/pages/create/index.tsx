import React, { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import instance from "@/lib/axios/instance";
import { useRouter } from "next/router";

const schema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    note: z.string().min(1, "Note is required"),
});

const CreatePage = () => {
    const [notes, setNotes] = useState<any>([]);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = form;
    const { push } = useRouter();

    useEffect(() => {
        instance
            .get("/api/note")
            .then((res) => {
                setNotes(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onSubmit = handleSubmit(async (values) => {
        const data = {
            notes: [
                ...notes,
                {
                    id: `${Date.now()}-${Math.random().toString(16)}`,
                    title: values.title,
                    note: values.note,
                },
            ],
        };

        try {
            const res = await instance.put("/api/note", { data });
            if (res.status === 200) {
                form.reset();
                push("/notes");
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className="flex min-h-screen flex-col items-center justify-center mx-5">
            <Form {...form}>
                <form
                    onSubmit={onSubmit}
                    className="space-y-8 w-full max-w-xl shadow-md p-10"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Add title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Note</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Note something..."
                                        className="min-h-[30vh]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </div>
    );
};

export default CreatePage;
