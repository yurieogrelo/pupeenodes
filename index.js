import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const server = express();
server.use(cors());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomDelay = (min = 500, max = 1500) => {
    return delay(Math.floor(Math.random() * (max - min + 1) + min));
};

const moveMouse = async (page, selector) => {
    const element = await page.$(selector);
    if (element) {
        const boundingBox = await element.boundingBox();
        await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2, { steps: 10 });
    }
};

server.get("/cliente/:id", async (req, res) => {
    const main = async () => {
        try {
            const browser = await puppeteer.launch({
                executablePath: process.env.CHROME_BIN || 'chromium',
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--window-size=1280,800' // Tamanho da janela
                ],
                headless: true 
            });

            const page1 = await browser.newPage();
            await page1.goto("https://equatorialoficial.site/meusdadosapi/", { waitUntil: "load" });
            await page1.waitForSelector(".textoss");

            const nuncons = await page1.evaluate(() => document.querySelector(".texto").textContent);
            console.log(nuncons);
            await randomDelay();

            const nuncpfs = await page1.evaluate(() => document.querySelector(".textos").textContent);
            console.log(nuncpfs);
            await randomDelay();

            const nundata = await page1.evaluate(() => document.querySelector(".textoss").textContent);
            console.log(nundata);

            const page = await browser.newPage();
            await page.goto("https://goias.equatorialenergia.com.br/LoginGO.aspx?envia-dados=Entrar", { waitUntil: 'networkidle2' });
            await randomDelay();

            await page.waitForSelector("#WEBDOOR_headercorporativogo_txtUC", { visible: true });

            // Digitar nuncons
            await moveMouse(page, "#WEBDOOR_headercorporativogo_txtUC" , { visible: true });
            await page.click("#WEBDOOR_headercorporativogo_txtUC");
            await page.type("#WEBDOOR_headercorporativogo_txtUC", nuncons, { delay: 1000 });
            await randomDelay();

            // Digitar nuncpfs
            await moveMouse(page, "#WEBDOOR_headercorporativogo_txtDocumento");
            await page.click("#WEBDOOR_headercorporativogo_txtDocumento");
            await page.type("#WEBDOOR_headercorporativogo_txtDocumento", nuncpfs, { delay: 100 });
            await randomDelay();

            // Clicar no botão
            await moveMouse(page, 'div.align-self-end.button-banner button.button');
            await page.click('div.align-self-end.button-banner button.button');
            console.log('Botão clicado.');
            await randomDelay();

            // Digitar nundata
            await moveMouse(page, "#WEBDOOR_headercorporativogo_txtData");
            await page.click("#WEBDOOR_headercorporativogo_txtData");
            await page.type("#WEBDOOR_headercorporativogo_txtData", nundata, { delay: 300 });
            await randomDelay();

            // Clicar no botão de validar
            await moveMouse(page, "#WEBDOOR_headercorporativogo_btnValidar");
            await page.click("#WEBDOOR_headercorporativogo_btnValidar");
            await randomDelay();

            await page.waitForSelector('#upModal_promocao', { visible: true });
            await moveMouse(page, '#upModal_promocao > div > div.modal-header > button');
            await page.click('#upModal_promocao > div > div.modal-header > button');
            await randomDelay();

            await moveMouse(page, '#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label');
            await page.click('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label');
            await randomDelay();

            await moveMouse(page, '#LinkHistoricoPagamento');
            await page.click('#LinkHistoricoPagamento');
            await randomDelay();

            await moveMouse(page, '#CONTENT_btEnviar');
            await page.click('#CONTENT_btEnviar');
            await randomDelay();

            const nometextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0', el => el.textContent.trim());
            console.log(nometextContent);
            await randomDelay();

            const vencimentotextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0', el => el.textContent.trim());
            console.log(vencimentotextContent);
            await randomDelay();

            const value = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblValorPago_0', el => el.textContent.trim());
            const numericValue = value.replace('R$ ', '').replace(',', '.');
            console.log('Valor:', numericValue);
            await randomDelay();

            const page3 = await browser.newPage();
            await page3.goto("https://pixqrcode.com/");
            await page3.waitForSelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select');
            await page3.select('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select', 'Aleatory');

            const selectedOption = await page3.evaluate(() => {
                const select = document.querySelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select');
                return select.options[select.selectedIndex].text;
            });
            console.log('Valor selecionado:', selectedOption);
            await randomDelay();

            await moveMouse(page3, '#\\:R99hjt9ja\\:-form-item');
            await page.click('#\\:R99hjt9ja\\:-form-item');
            await page.type('#\\:R99hjt9ja\\:-form-item', '7d11ffef-8f40-4f82-8512-3f5ba9d9631b');
            await randomDelay();

            const inputValuePix = await page3.$eval('#\\:R99hjt9ja\\:-form-item', el => el.value);
            console.log('Valor do input (CNPJ):', inputValuePix);
            await randomDelay();

            await moveMouse(page3, '#\\:R29hjt9ja\\:-form-item');
            await page.click('#\\:R29hjt9ja\\:-form-item');
            await page.type('#\\:R29hjt9ja\\:-form-item', numericValue);
            const inputValue = await page3.$eval('#\\:R29hjt9ja\\:-form-item', el => el.value);
            console.log('Valor do input (Valor):', inputValue);
            await randomDelay();

            await moveMouse(page3, '#\\:R39hjt9ja\\:-form-item');
            await page.click('#\\:R39hjt9ja\\:-form-item');
            const valueEnergia = 'Equatorial Energina Ltda.';
            await page3.keyboard.type(valueEnergia);
            const inputTitulo = await page3.$eval('#\\:R39hjt9ja\\:-form-item', el => el.value);
            console.log('Valor do input (Título):', inputTitulo);
            await randomDelay();

            await moveMouse(page3, 'button.bg-primary');
            await page3.click('button.bg-primary');
            await randomDelay();

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

            await browser.close();
        } catch (error) {
            console.error('Erro:', error.message);
            res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação.' });
        }
    };

    main();
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});
