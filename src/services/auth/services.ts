import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
    userData: {
        email: string;
        name: string;
        password: string;
        notes?: any[];
        archivedNotes?: any[];
    },
    callback: Function
) {
    const data = await retrieveDataByField("users", "email", userData.email);
    if (data.length > 0) {
        callback(false);
    } else {
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.notes = [];
        userData.archivedNotes = [];
        await addData("users", userData, (result: boolean) => {
            callback(result);
        });
    }
}

export async function signIn(email: string) {
    const data = await retrieveDataByField("users", "email", email);

    if (data) {
        return data[0];
    } else {
        return null;
    }
}
