export const extractNumeroId = (text: string) =>
    text.match(/\b\d{7,12}\b/)?.[0] || "";


export const extractSexo = (text: string) => {
    if (text.includes("MASCULINO") || text.includes("HOMBRE")) return "M";
    if (text.includes("FEMENINO") || text.includes("MUJER")) return "F";
    return "";
};


export const extractEdad = (text: string) => {
    const match = text.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
    if (!match) return "";


    const year = parseInt(match[0].split("/")[2]);
    return (new Date().getFullYear() - year).toString();
};