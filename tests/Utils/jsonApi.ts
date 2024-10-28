
export const jsonGenerar = {
    "datosFev": {
        "aplicacion": "ERPOPC",
        "semilla": "2024-10-08T16:26:09-0500",
        "token": "token=",
        "sociedad": 2200,
        "tipoDocumento": "FV"
    },
    "rips": true,
    "fevXml": true,
    "fechaFactura": "2024-09-23T16:41:51Z",
    "resolucion": 1036,
    "numeroFactura": `${Math.floor(Math.random() * 9999999999)}`,
    "numeroIdObligado": 2003960,
    "numeroNota": "",
    "tipoNota": "",
    "aplicacionOrigen": "OPC",
    "tipoFactura": "L",
    "planFactura": "OPC",
    "nombreEntidad": "EPS SURAMERICANA S.A.",
    "codEntidadAdmin": 8000887022,
    "nitDeudor": 8000887022,
    "valorPagoCompartido": 0,
    "valorNeto": 0,
    "modalidadPago": "04",
    "fechaInicioFinPeriodo": "( Fecha Inicial: 01.01.2012 - Fecha Final: 23.10.2024 )",
    "tipoIdentificacionPrestador": 31,
    "numeroIdentificacionPrestador": 8110078325,
    "razonSocialPrestador": "SERVICIOS DE SALUD IPS SURAMERICANA S.A.S",
    "autorizaciones": [
        {
            "codigoPrestador": "056150425916",
            "fechaAutorizacion": "2024-09-30T20:43:10Z",
            "numeroAutorizacion": 4433015238,
            "numeroAutorizacionAsegurador": "932-514144610",
            "numeroHistoriaClinica": "",
            "sistema": "SW",
            "tipoPlan": "PO",
            "valorGlosado": "",
            "valorPagoModerador": 0
        }
    ],
    "datosTecnicos": {
        "appDestino": "OPC",
        "webhook": "https://webhook.site/6470e7be-a6b3-478f-bda5-fe7b64d4002c"
    }
}

export const jsonConsultar = {
    "documentoConsultar": `${jsonGenerar.numeroFactura}`,
    "tipoDocumentoConsultar": "factura"
}

export const jsonDescargar = {
    "numeroFactura": `${jsonGenerar.numeroFactura}`,
    "aplicacionOrigen": "OPC"
}