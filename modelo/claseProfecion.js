import { ProfecionData } from "./profecionData.js";

class Profecion {
    constructor(idProfecion, nombreProfecion) {
        this.idProfecion = idProfecion;
        this.nombreProfecion = nombreProfecion;
    }

    async alta() {
        return await ProfecionData.altaProfecion(this);
    }

    static async consulta() {
        return await ProfecionData.consultaProfecion();
    }

    async modificarActivo() {
        this.activoProfecion = !this.activoProfecion;
        return await ProfecionData.modificarActivoProfecion(this);
    }

    async modificarNombre() {
        return await ProfecionData.modificarNombreProfecion(this);
    }
}

export { Profecion };
