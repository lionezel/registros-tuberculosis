import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/cofing";

export const useUserRole = () => {
    const [role, setRole] = useState<"admin" | "trabajador" | null>(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const fetchRole = async () => {
            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) {
                setRole(snap.data().role);
            }
        };

        fetchRole();
    }, []);

    return role;
};
