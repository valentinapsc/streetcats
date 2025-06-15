import { test, expect } from '@playwright/test';

const uniqueId = Date.now();
const testUser = {
  username: `play_${uniqueId}`,
  email: `user_${uniqueId}@example.com`,
  password: 'Password123!',
};

test.use({ baseURL: 'http://localhost:4200' });

test.describe('StreetCats End-to-End', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('1. Home carica mappa', async ({ page }) => {
    await expect(page.locator('#map')).toBeVisible();
  });

  test('2. Marker visibile su mappa', async ({ page }) => {
    const markerCount = await page.locator('.leaflet-marker-icon').count();
    expect(markerCount).toBeGreaterThan(0);
  });

  test(' 3. Form commento non visibile se non loggati', async ({ page }) => {
    await page.goto('/cat/1');
    // Se non sei loggato non deve comparire il form di commento:
    const form = page.locator('form#comment-form');
    await expect(form).toHaveCount(0);
  });

  test(' 4. Home page mostra almeno un marker gatto', async ({ page }) => {
    const markers = page.locator('img.leaflet-marker-icon');
    await expect(markers.first()).toBeVisible();
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });

  test(' 5. Cliccare su un marker gatto porta alla pagina di dettaglio', async ({
    page,
  }) => {
    await page.locator('img.leaflet-marker-icon').first().click();
    // apre il popup e clicca il link "Visualizza dettagli"
    await page
      .locator('.leaflet-popup a', { hasText: 'Visualizza dettagli' })
      .click();
    await expect(page).toHaveURL(/\/cat\/\d+/);
    await expect(page.locator('h2')).toBeVisible();
  });

  test(' 6. Routes sconosciute reindirizzano alla home', async ({ page }) => {
    await page.goto('/randomroute');
    await expect(page).toHaveURL('/');
  });

  test('7. Modifiche non autorizzate mostrano errore', async ({ page }) => {
    await page.goto('/edit-cat/1');

    // Lascia i campi come sono oppure modifica se necessario
    // Prova a inviare il form senza autorizzazione
    await page.locator('button[type="submit"]').click();

    // Attendi eventuali richieste di rete
    await page.waitForTimeout(500); // o meglio: aspetta l'evento giusto se disponibile

    // Controlla che l'errore sia visibile
    await expect(page.locator('p.error')).toHaveText('Errore nell’aggiornamento');
  });

  test('8. Navbar mostra il titolo del sito', async ({ page }) => {
    const navbar = page.locator('nav');
    await expect(navbar).toContainText('StreetCats');
  });

  test('9. Cliccando sul marker apre il popup', async ({ page }) => {
    await page.locator('img.leaflet-marker-icon').first().click();
    await expect(page.locator('.leaflet-popup')).toBeVisible();
  });
});
