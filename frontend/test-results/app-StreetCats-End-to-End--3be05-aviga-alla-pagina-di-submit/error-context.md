# Test info

- Name: StreetCats End-to-End >> 10. Link Navbar "Segnala" naviga alla pagina di submit
- Location: C:\Users\falen\Desktop\streetcats\frontend\tests\e2e\app.spec.ts:77:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/submit" until "load"
============================================================
    at C:\Users\falen\Desktop\streetcats\frontend\tests\e2e\app.spec.ts:79:16
```

# Page snapshot

```yaml
- navigation:
  - link "StreetCats":
    - /url: /
  - list:
    - listitem: Segnala
    - listitem:
      - link "Login / Registrati":
        - /url: javascript:void(0)
- button "✖"
- heading "Login" [level=2]
- text: Email
- textbox "Email"
- text: Password
- textbox "Password"
- button "Login" [disabled]
- text: Non hai un account? Registrati
- heading "Gatti avvistati 🐾" [level=1]
- button "Marker"
- button "Marker"
- button "Zoom in"
- button "Zoom out"
- link "Leaflet":
  - /url: https://leafletjs.com
- text: © OpenStreetMap contributors
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const uniqueId = Date.now();
   4 | const testUser = {
   5 |   username: `play_${uniqueId}`,
   6 |   email: `user_${uniqueId}@example.com`,
   7 |   password: 'Password123!',
   8 | };
   9 |
  10 | test.use({ baseURL: 'http://localhost:4200' });
  11 |
  12 | test.describe('StreetCats End-to-End', () => {
  13 |
  14 |   test.beforeEach(async ({ page }) => {
  15 |     // Navigate to the home page before each test
  16 |     await page.goto('/');
  17 |   });
  18 |
  19 |   test('1. Home carica mappa', async ({ page }) => {
  20 |     await expect(page.locator('#map')).toBeVisible();
  21 |   });
  22 |
  23 |   test('2. Marker visibile su mappa', async ({ page }) => {
  24 |     const markerCount = await page.locator('.leaflet-marker-icon').count();
  25 |     expect(markerCount).toBeGreaterThan(0);
  26 |   });
  27 |
  28 |   test(' 3. Form commento non visibile se non loggati', async ({ page }) => {
  29 |     await page.goto('/cat/1');
  30 |     // Se non sei loggato non deve comparire il form di commento:
  31 |     const form = page.locator('form#comment-form');
  32 |     await expect(form).toHaveCount(0);
  33 |   });
  34 |
  35 |   test(' 4. Home page mostra almeno un marker gatto', async ({ page }) => {
  36 |     const markers = page.locator('img.leaflet-marker-icon');
  37 |     await expect(markers.first()).toBeVisible();
  38 |     const count = await markers.count();
  39 |     expect(count).toBeGreaterThan(0);
  40 |   });
  41 |
  42 |   test(' 5. Cliccare su un marker gatto porta alla pagina di dettaglio', async ({
  43 |     page,
  44 |   }) => {
  45 |     await page.locator('img.leaflet-marker-icon').first().click();
  46 |     // Open the popup and click the "Visualizza dettagli" link
  47 |     await page
  48 |       .locator('.leaflet-popup a', { hasText: 'Visualizza dettagli' })
  49 |       .click();
  50 |     await expect(page).toHaveURL(/\/cat\/\d+/);
  51 |     await expect(page.locator('h2')).toBeVisible();
  52 |   });
  53 |
  54 |   test(' 6. Routes sconosciute reindirizzano alla home', async ({ page }) => {
  55 |     await page.goto('/randomroute');
  56 |     await expect(page).toHaveURL('/');
  57 |   });
  58 |
  59 |   test(' 7. Modifiche non autorizzate mostrano errore', async ({
  60 |     page,
  61 |   }) => {
  62 |     await page.goto('/edit-cat/1');
  63 |     await page.locator('button[type="submit"]').click();
  64 |     await expect(page.locator('text=Errore nell’aggiornamento')).toBeVisible();
  65 |   });
  66 |
  67 |   test('8. Navbar mostra il titolo del sito', async ({ page }) => {
  68 |     const navbar = page.locator('nav');
  69 |     await expect(navbar).toContainText('StreetCats');
  70 |   });
  71 |
  72 |   test('9. Cliccando sul marker apre il popup', async ({ page }) => {
  73 |     await page.locator('img.leaflet-marker-icon').first().click();
  74 |     await expect(page.locator('.leaflet-popup')).toBeVisible();
  75 |   });
  76 |
  77 |   test('10. Link Navbar "Segnala" naviga alla pagina di submit', async ({ page }) => {
  78 |     await page.locator('nav >> text=Segnala').click();
> 79 |     await page.waitForURL('**/submit', { timeout: 5000 });
     |                ^ TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
  80 |     await expect(page).toHaveURL('/submit');
  81 |   });
  82 | });
  83 |
```