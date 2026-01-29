export interface IECForm {
    paciente: string;
    direccion: string;
    telefono: string;


    tipoId: string;
    numeroId: string;


    sexo: string;
    edad: string;
    fechaNotificacion: string;
    semana: string;
    ano: number;


    departamento: string;
    municipioProcedencia: string;
    municipioResidencia: string;
    ZonaUrbana: string;
    ZonaRural: string;
    ZonaRuralDispersa: string;
    areaGeografica: string;
    tipoVivienda: string;

    ocupacion: string;
    etnia: string;
    escolaridad: string;
    estadoCivil: string;



    personasViven: string;
    calidadVivienda: string;
    personasDependen: string;
    tipoTrabajo: string;
    serviciosVivienda: string[],


    ingresosMensuales: string;
    comidasDia: string;
    recibeSubsidio: string;


    regimenSalud: string;
    nombreEAPB: string;


    grupoPoblacional: string;

    tipoTuberculosis: string;
    condicionIngreso: string;

    cultivo: string;
    pruebaMolecular: string;
    resistente: string;
    tipoCaso: string;
    fechaDiagnostico: string;
    situacionFirma: string;
    fechaFirma: string;
    nombreFirma: string;
    nombrePersonalAcompanante: string;

    firmaPersonalApoyo: string;
    firmaPersonalRealiza: string;

    cuantasPersonasVivenConUsted: string;
    georreferenciacion: string;
    fotoEvidencia: string;
}

export const initialForm: IECForm = {
    paciente: "",
    direccion: "",
    telefono: "",


    tipoId: "CC",
    numeroId: "",


    sexo: "",
    edad: "",
    fechaNotificacion: "",
    semana: "",
    ano: new Date().getFullYear(),


    departamento: "ANTIOQUIA",
    municipioProcedencia: "BELLO",
    municipioResidencia: "BELLO",
    ZonaUrbana: "",
    ZonaRural: "",
    ZonaRuralDispersa: "",


    ocupacion: "",
    etnia: "N/A",
    escolaridad: "Bachillerato",
    estadoCivil: "Soltero",
    areaGeografica: "ZonaUrbana",
    tipoVivienda: "",


    personasViven: "",
    calidadVivienda: "",
    personasDependen: "",
    tipoTrabajo: "Empleado",
    serviciosVivienda: [],


    ingresosMensuales: "",
    comidasDia: "",
    recibeSubsidio: "",


    regimenSalud: "Contributivo",
    nombreEAPB: "EPS SURAMERICANA S.A",


    grupoPoblacional: "Ninguno",


    tipoTuberculosis: "",
    condicionIngreso: "",

    cultivo: "",
    pruebaMolecular: "",
    resistente: "",
    tipoCaso: "",
    fechaDiagnostico: "",
    situacionFirma: "",
    fechaFirma: "",
    nombreFirma: "",
    nombrePersonalAcompanante: "",

    firmaPersonalApoyo: "",
    firmaPersonalRealiza: "",

    cuantasPersonasVivenConUsted: "",
    georreferenciacion: "",
    fotoEvidencia: "",
};