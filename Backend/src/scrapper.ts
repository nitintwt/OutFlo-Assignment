import puppeteer, { Browser, Page } from 'puppeteer';

interface Profile {
  fullName: string | null;
  profileUrl: string | null;
  headline: string | null;
  location: string | null;
  imageUrl: string | null;
}

async function scrapeLinkedInProfiles(url: string): Promise<Profile[]> {
  const browser: Browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    args: ['--start-maximized'],
  });

  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('ul[role="list"]');

  await autoScroll(page);

  const profiles: Profile[] = await page.$$eval('ul[role="list"] > li', (nodes) => {
    return nodes.map((node) => {
      const nameElement = node.querySelector('span.t-16');
      const linkElement = node.querySelector<HTMLAnchorElement>('a[href*="/in/"]');
      const headlineElement = node.querySelector('div.t-14.t-black.t-normal');
      const locationElement = node.querySelector('div.t-14.t-normal');
      const imgElement = node.querySelector<HTMLImageElement>('img');

      return {
        fullName: nameElement ? nameElement.textContent?.trim() || null : null,
        profileUrl: linkElement ? linkElement.href : null,
        headline: headlineElement ? headlineElement.textContent?.trim() || null : null,
        location: locationElement ? locationElement.textContent?.trim() || null : null,
        imageUrl: imgElement ? imgElement.src : null,
      };
    });
  });

  console.log(profiles);

  await browser.close();
  return profiles;
}

async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

// Example usage
const url = 'https://www.linkedin.com/search/results/people/?geoUrn=%5B%22103644278%22%5D&industry=%5B%221594%22%2C%221862%22%2C%2280%22%5D&keywords=%22lead%20generation%20agency%22&origin=GLOBAL_SEARCH_HEADER&sid=z%40k&titleFreeText=Founder';

scrapeLinkedInProfiles(url);
