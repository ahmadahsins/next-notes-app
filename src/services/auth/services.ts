import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
    userData: {
        email: string;
        name: string;
        password: string;
        notes?: any[];
        archivedNotes?: any[];
        created_at?: Date;
        updated_at?: Date;
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
        userData.created_at = new Date();
        userData.updated_at = new Date();
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

export async function loginWithGoogle(data: any, callback: Function) {
    const user = await retrieveDataByField("users", "email", data.email);

    if (user.length > 0) {
        callback(user[0]);
    } else {
        data.notes = [];
        data.archivedNotes = [];
        data.created_at = new Date();
        data.updated_at = new Date();
        data.password = "";
        await addData("users", data, (status: boolean, res: any) => {
            data.id = res.path.replace("users/", "");
            if (status) {
                callback(data);
            }
        });
    }
}
