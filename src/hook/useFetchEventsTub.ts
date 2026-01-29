import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/cofing";

export type EventTub = {
    id: string;
    condicionIngreso: string;
    tipoId: string;
    numeroId: string;
    paciente: string;
    fechaNotificacion: string;
    semanas: number;
    edad: number;
    sexo: string;
    barrio: string;
};

export const useFetchEventsTub = () => {
    const [events, setEvents] = useState<EventTub[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const q = query(
                collection(db, "events-tub"),
                orderBy("fechaNotificacion", "desc")
            );

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const data: EventTub[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...(doc.data() as Omit<EventTub, "id">),
                    }));

                    setEvents(data);
                    setLoading(false);
                },
                (err) => {
                    console.error("Error leyendo events-tub:", err);
                    setError("Error cargando eventos");
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (e) {
            console.error(e);
            setError("Error inicializando listener");
            setLoading(false);
        }
    }, []);

    return {
        events,
        loading,
        error,
    };
};
