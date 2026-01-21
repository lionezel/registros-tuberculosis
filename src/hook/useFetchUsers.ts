import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/cofing";


export interface AppUser {
    uid: string;
    displayName: string;
    email: string;
    phone?: string;
}

export const useFetchUsers = () => {
    const [users, setUsers] = useState<AppUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const snap = await getDocs(collection(db, "users"));
            const list: AppUser[] = snap.docs.map((doc) => ({
                uid: doc.id,
                ...(doc.data() as any),
            }));

            setUsers(list);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return { users, loading };
};
