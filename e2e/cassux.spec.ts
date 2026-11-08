import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('main navigation reaches every implemented section', async ({ page }) => {
  const routes = [
    ['/play', 'Izvēlies savu domāšanas arēnu'],
    ['/learn', 'Domāšanas pamati'],
    ['/progress', 'Progress'],
    ['/profile', 'Viesa profils'],
    ['/settings', 'Iestatījumi'],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
  }
});

test('a solo session completes, supports mistake review, and persists progress after refresh', async ({ page }) => {
  await page.goto('/play/solo/cases');
  await page.getByTestId('start-session').click();

  for (let index = 0; index < 5; index += 1) {
    await page.getByRole('radio').first().check();
    await page.getByTestId('submit-answer').click();
    await expect(page.getByTestId('answer-feedback')).toBeVisible();
    await page.getByTestId('next-question').click();
  }

  await expect(page.getByTestId('session-summary')).toBeVisible();
  await expect(page.getByTestId('review-incorrect')).toBeVisible();
  await page.getByTestId('review-incorrect').click();
  await expect(page.getByTestId('incorrect-review')).toBeVisible();

  await page.goto('/progress');
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
  await page.reload();
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/XP līdz nākamajam līmenim/)).toBeVisible();
});
