import { Client } from 'pg'
import { mensajesOPC } from '../Utils/jsonEvents';
import dotenv from 'dotenv';

dotenv.config()

export async function conexionBD() {
    // Conectar a PostgreSQL
    const client = new Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
        }
    });

    await client.connect();

    // Verificar que los datos se han guardado en la base de datos
    for (const mensaje of mensajesOPC) {
        console.log('Consulta en BD:', mensaje.dataOtrosCampos.numAutorizacion)
        const aut = await client.query(`SELECT * FROM trip_rips_autorizaciones WHERE dsnumautorizacion = '${mensaje.dataOtrosCampos.numAutorizacion}'`);
        console.log(aut.rows);
    }

    await client.end();
}  