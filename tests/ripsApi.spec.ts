import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import { jsonGenerar, jsonConsultar, jsonDescargar } from './Utils/jsonApi';

dotenv.config()


const HOST = process.env.HOST_
const BASEURL = process.env.BASE_URL
const AUTHORIZATION = process.env.AUTHORIZATION

test('Prueba de generacion RIPS E2E', async ({ page, request }) => {

    await test.step('Paso 1: Realizar la solicitud de generacion del RIPS', async () => {
        const response = await request.post(`${HOST}/${BASEURL}/generar`, {
            headers: {
                'Authorization': `Basic ${AUTHORIZATION}`,  // Header de autorización
                'Content-Type': 'application/json',
            },
            data: jsonGenerar
        })
        // Verificar que la respuesta sea 202 (creado)
        expect(response.status()).toBe(202)

        console.log('Solicitud RIPS enviada correctamente')
        console.log('')
        console.log('Factura:', jsonGenerar.numeroFactura,
            '\nIdObligado:', jsonGenerar.numeroIdObligado, 
            '\nAutorizacion:', jsonGenerar.autorizaciones[0].numeroAutorizacionAsegurador)
        console.log('')
        // Obtener el cuerpo de la respuesta como JSON
        console.log(await response.json())

    });

    await page.waitForTimeout(10000);

    await test.step('Paso 2: Consultar RIPS generado', async () => {
        const response = await request.post(`${HOST}/${BASEURL}/consultar`, {
            headers: {
                'Authorization': `Basic ${AUTHORIZATION}`,  // Header de autorización
                'Content-Type': 'application/json',
            },
            data: jsonConsultar
        })
        expect(response.status()).toBe(200)
        console.log('')
        console.log('Consultar RIPS')
        console.log(await response.json())
    });

    await test.step('Paso 3: Descargar RIPS generado', async () => {
        const response = await request.post(`${HOST}/${BASEURL}/descargar`, {
            headers: {
                'Authorization': `Basic ${AUTHORIZATION}`,  // Header de autorización
                'Content-Type': 'application/json',
            },
            data: jsonDescargar
        })
        expect(response.status()).toBe(200)
        console.log('')
        console.log('Descargar RIPS')
        console.log(await response.json())
        
        let res = await response.json()
        let base64Rips = res.archivo
        
        const jsonString = Buffer.from(base64Rips, 'base64').toString('utf-8')
        const RIPS = JSON.parse(jsonString)
        console.log(JSON.stringify(RIPS, null, 2))

        // Verificar que la respuesta contiene los datos esperados
        // expect(post.title).toBe(newPost.title);
        // expect(post.body).toBe(newPost.body);
        // expect(post.userId).toBe(newPost.userId);
        // console.log('Datos validados correctamente');
    });

});
