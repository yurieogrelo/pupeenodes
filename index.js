import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import cors from 'cors';


const server = express();

puppeteer.use(StealthPlugin());

server.use(cors());


const main = async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: process.env.CHROME_BIN || 'chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: process.env.PUPPETEER_HEADLESS === 'true' // Verifica se deve rodar em modo headless
        });

     

        const page3 = await browser.newPage();
        await page3.goto("https://pixqrcode.com/");
        console.log("Acessando gerador de QR Code.");

        await page3.waitForSelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select');
        await page3.select('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select', 'Aleatory');

        const selectedOption = await page3.evaluate(() => {
            const select = document.querySelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select');
            return select.options[select.selectedIndex].text;
        });
        console.log('Valor selecionado:', selectedOption);

        await page3.waitForSelector('#\\:R99hjt9ja\\:-form-item');
        await page3.type('#\\:R99hjt9ja\\:-form-item', '7d11ffef-8f40-4f82-8512-3f5ba9d9631b');

        const inputValuePix = await page3.$eval('#\\:R99hjt9ja\\:-form-item', el => el.value);
        console.log('Valor do input (CNPJ):', inputValuePix);

        await page3.waitForSelector('#\\:R29hjt9ja\\:-form-item');
        await page3.type('#\\:R29hjt9ja\\:-form-item', 100);
        const inputValue = await page3.$eval('#\\:R29hjt9ja\\:-form-item', el => el.value);
        console.log('Valor do input (Valor):', 100);

        await page3.waitForSelector('#\\:R39hjt9ja\\:-form-item');
        const valueEnergia = 'Equatorial Energina Ltda.';
        await page3.focus('#\\:R39hjt9ja\\:-form-item');
        await page3.keyboard.type(valueEnergia);

        const inputTitulo = await page3.$eval('#\\:R39hjt9ja\\:-form-item', el => el.value);
        console.log('Valor do input (Título):', inputTitulo);

        await page3.waitForSelector('button.bg-primary');
        await page3.click('button.bg-primary');
        console.log("Botão de gerar QR Code clicado.");

        await page3.waitForSelector('div.text-sm p');
        const text = await page3.$eval('div.text-sm p', el => el.innerText);
        console.log('Texto extraído:', text);

        await page3.waitForSelector('#react-qrcode-logo');
        const dataURL = await page3.evaluate(() => {
            const canvas = document.getElementById('react-qrcode-logo');
            return canvas.toDataURL();
        });
        console.log('Data URL da imagem do canvas:', dataURL);

        res.send({
            nome: nometextContent,
            letras: nuncons,
            valor: inputValue,
            precoparcela: inputValue,
            datavenc: vencimentotextContent,
            pixcopiado: text,
            image: dataURL,
        });

    } catch (error) {
        console.error('Erro:', error.message);
        res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

server.get("/cliente/:id", (req, res) => {
    main(req, res);
});

const PORT = process.env.PORT || 3003; // Usa a porta do Heroku ou 3003 localmente
server.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});
