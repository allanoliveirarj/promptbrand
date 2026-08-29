import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const SP = process.argv[2];
const arts = [
  { id: 'art-169', w: 1920, h: 1080, name: 'angra-health-qr-16x9', dsf: 2 },
  { id: 'art-916', w: 1080, h: 1920, name: 'angra-health-qr-9x16', dsf: 2 },
  { id: 'art-11',  w: 1200, h: 1200, name: 'angra-health-qr-1x1',  dsf: 2.5 },
];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const a of arts) {
  const ctx = await browser.newContext({ viewport: { width: a.w + 120, height: a.h + 120 }, deviceScaleFactor: a.dsf });
  const page = await ctx.newPage();
  await page.goto('file://' + SP + '/design.html', { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const el = await page.$('#' + a.id);
  await el.screenshot({ path: `${SP}/out/${a.name}.png` });
  await ctx.close();
}
// PDFs vetoriais (uma página por formato)
for (const a of arts) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto('file://' + SP + '/design.html', { waitUntil: 'load' });
  await page.evaluate((id) => {
    document.querySelectorAll('.art').forEach(x => { if (x.id !== id) x.remove(); });
    document.querySelector('.page').style.padding = '0';
    document.querySelector('.page').style.gap = '0';
    document.body.style.background = '#fff';
  }, a.id);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.pdf({ path: `${SP}/out/${a.name}.pdf`, width: a.w + 'px', height: a.h + 'px',
                   printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
  await ctx.close();
}
await browser.close();
console.log('done');
