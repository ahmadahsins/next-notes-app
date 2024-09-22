import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Textarea } from "./ui/textarea";
import instance from "@/lib/axios/instance";

const schema = z.object({
    title: z.string(),
    note: z.string(),
});

type PropType = {
    note: any;
    notes: any;
    idx: number;
    getNotes: () => void;
};

const ModalEditNote = (props: PropType) => {
    const { note, idx, notes, getNotes } = props;
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = form;

    const onSubmit = handleSubmit(async (values) => {
        notes[idx] = {
            title: values.title,
            note: values.note,
        };
        const data = {
            notes: notes,
        };

        try {
            const res = await instance.put("/api/note", { data });
            if (res.status === 200) {
                getNotes();
                form.reset();
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"}>
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit note</DialogTitle>
                    <DialogDescription>
                        Make changes to your note here. Click save when you are
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex-col items-center gap-4 w-full">
                                    <FormControl>
                                        <Input
                                            defaultValue={note?.title}
                                            className="col-span-3"
                                            {...field}
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
                                <FormItem className="flex-col items-center gap-4">
                                    <FormControl>
                                        <Textarea
                                            defaultValue={note?.note}
                                            className="col-span-3 min-h-[50vh]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditNote;
