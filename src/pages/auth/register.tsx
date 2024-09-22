import React, { useState } from "react";
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
import { useRouter } from "next/router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import instance from "@/lib/axios/instance";

const schema = z.object({
    email: z.string().email("Invalid email"),
    name: z.string().min(1, "Name is required").max(100, "name is too long"),
    password: z
        .string()
        .min(1, "password is required")
        .max(1000, "password is too long"),
});

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = form;
    const { push } = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        setIsLoading(true);
        const result = await instance.post("/api/user/register", values);

        if (result.status === 200) {
            setIsLoading(false);
            form.reset();
            push("/auth/login");
        } else {
            setIsLoading(false);
            console.log("error");
        }
    });

    return (
        <div className="flex min-h-screen items-center justify-center mx-5">
            <Form {...form}>
                <form onSubmit={onSubmit} className="w-full max-w-lg">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl">Register</CardTitle>
                            <CardDescription>
                                Create a new account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="m@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="underline">
                                    Sign in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
};

export default RegisterPage;
