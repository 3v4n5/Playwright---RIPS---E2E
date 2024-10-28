import amqp from 'amqplib';
import { mensajesOPC } from '../Utils/jsonEvents';
import { expect } from 'playwright/test';
import dotenv from 'dotenv';

dotenv.config()

export async function conexionRabbit() {

    const QUEUE_NAME = process.env.QUEUE || ''

    try {
        // Conectar a RabbitMQ
        const conexion = await amqp.connect({
            protocol: 'amqp',
            hostname: 'ecorabbitmqlab.suranet.com',
            port: 5672,
            username: 'segsocial.ipsa.usr',
            password: '9hf4OSePwrKmEQ91Peql',
            vhost: 'eps.vh',
        });
        const channel = await conexion.createChannel();

        // Asegurar que la cola existe
        //await channel.assertQueue(QUEUE_NAME, { durable: true });

        // Enviar el mensaje a la cola
        console.log('Mensaje enviado a la cola')

        for (const mensaje of mensajesOPC) {

            const mensajeBuffer = Buffer.from(JSON.stringify(mensaje));
            channel.sendToQueue(QUEUE_NAME, mensajeBuffer);

            console.log('\nNumero Autorizacion:', mensaje.dataOtrosCampos.numAutorizacion,
                'Segmento:', mensaje.dataConsultas.vrServicios[0].segmento);
            }
            
        console.log('')

        setTimeout(() => {
            channel.close();
            conexion.close();
        }, 500);
    } catch (error) {
        console.error('Error enviando mensaje:', error);
    }

}






