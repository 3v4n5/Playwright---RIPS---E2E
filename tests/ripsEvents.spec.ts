import { test, expect } from '@playwright/test';
import { conexionBD } from './Conexiones/postgresql';
import { conexionRabbit } from './Conexiones/rabbitMq';

test('Prueba RIPS Events', async ({ page }) => {

    await conexionRabbit()

    await page.waitForTimeout(5000);

    await conexionBD()

});




