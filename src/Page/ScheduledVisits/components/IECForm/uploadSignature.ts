import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/cofing";

export const uploadSignature = async (
    base64: string,
    formId: string
): Promise<string> => {
    const fileRef = ref(storage, `firmas/${formId}.png`);

    await uploadString(fileRef, base64, "data_url");

    const url = await getDownloadURL(fileRef);

    return url;
};
