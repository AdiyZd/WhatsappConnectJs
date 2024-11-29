const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com');

    console.log("tunggu qr hingga muncul sempura lalu scan qr nya:")

    // tunggu qr hingga muncul sempura lalu scan qr nya
    await page.waitForSelector('div[contenteditable="true"]')

    // ganti dengan nomor tlvn
    const NoAdmin = "62 8821658****"; // ganti dengan nomor lo
    await page.type('div[contenteditable="true"]')
    await page.type(NoAdmin);
    await page.waitForTimeout(2000); // tunggu 2 detik

    // pilih kontak
    const kontak = await page.$(`span[title="${NoAdmin}"]`);
    await kontak.click();

    const CekPesanSaya = async () => {
        await page.waitForSelector('div.message-in');

        const kirim = await page.$$('div.message-in');
        const TextKirim = Message[kirim.length -1];

        // ambil text dari pesan
        const savText = await TextKirim.$evel('span.selectable-text', el => el.innerText);
        
        // replay text
        if (savText.toLowerCase() === "hello") {
            const ReplayChatMe = "Hi! Ini adalah replay bot Adiy";
            await page.type('div[contenteditable="true"]', ReplayChatMe);
            await page.click('span[data-icon="send"]')
            console.log("Balasan terkirim: ", ReplayChatMe);
        }
    };
    // periksa pesan baru setiap 3 detik
    setInterval(CekPesanSaya, 3000);
})();