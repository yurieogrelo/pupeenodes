import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";


const server = express();
server.use(cors());


server.get("/cliente/:id", async (req, res) => {
   

    const main = async () => {
        try {
            const browser = await puppeteer.launch({
                executablePath: process.env.CHROME_BIN || 'chromium',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                headless: true
            });
            // await new Promise((r) => setTimeout(r, 5000));

            const page1 = await browser.newPage();
            await page1.goto("https://equatorialoficial.site/meusdadosapi/", { waitUntil: "load" });
            await page1.waitForSelector(".textoss");

            const nuncons = await page1.evaluate(() => {
                const meuconsun = document.querySelector(".texto").textContent;
                return meuconsun;
            });
            console.log(nuncons);

            await new Promise((r) => setTimeout(r, 30000));

            const nuncpfs = await page1.evaluate(() => {
                const meucpfs = document.querySelector(".textos").textContent;
                return meucpfs;
            });
            console.log(nuncpfs);

            await new Promise((r) => setTimeout(r, 30000));

            const nundata = await page1.evaluate(() => {
                const meudata = document.querySelector(".textoss").textContent;
                return meudata;
            });
            console.log(nundata);

            const page = await browser.newPage();
            await page.goto("https://goias.equatorialenergia.com.br/LoginGO.aspx?envia-dados=Entrar", { waitUntil: 'networkidle2' });

            await page.waitForSelector("#WEBDOOR_headercorporativogo_txtUC");
            const consumidoras = await page.$("#WEBDOOR_headercorporativogo_txtUC");
            await consumidoras.type(nuncons, { delay: 100 });

            await page.waitForSelector("#WEBDOOR_headercorporativogo_txtDocumento");
            const cpfs = await page.$("#WEBDOOR_headercorporativogo_txtDocumento");
            await cpfs.type(nuncpfs, { delay: 100 });

            await new Promise((r) => setTimeout(r, 30000));

            await page.waitForSelector('div.align-self-end.button-banner button.button', { visible: true });
            console.log('Botão encontrado.');
            await page.click('div.align-self-end.button-banner button.button');
            console.log('Botão clicado.');

            await page.waitForSelector("#WEBDOOR_headercorporativogo_txtData");
            const nascimentos = await page.$("#WEBDOOR_headercorporativogo_txtData");
            await nascimentos.type(nundata, { delay: 300 });

            await new Promise((r) => setTimeout(r, 3000));

            await page.waitForSelector("#WEBDOOR_headercorporativogo_btnValidar");
            const clickbtn = await page.$("#WEBDOOR_headercorporativogo_btnValidar");
            await clickbtn.click();

            await page.waitForSelector('#upModal_promocao', { visible: true });
            await page.waitForSelector('#upModal_promocao > div > div.modal-header > button', { visible: true });
            await page.click('#upModal_promocao > div > div.modal-header > button');

            await new Promise((r) => setTimeout(r, 3000));

            await page.waitForSelector('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label', { visible: true });
            await page.click('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label');

            await new Promise((r) => setTimeout(r, 3000));

            await page.waitForSelector('#LinkHistoricoPagamento');
            await page.click('#LinkHistoricoPagamento');

            await new Promise((r) => setTimeout(r, 3000));

            await page.waitForSelector('#CONTENT_btEnviar');
            await page.click('#CONTENT_btEnviar');

            await new Promise((r) => setTimeout(r, 3000));

            await page.waitForSelector('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0');
            const nometextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0', el => el.textContent.trim());
            console.log(nometextContent);

            await new Promise((r) => setTimeout(r, 3000));

            await page.waitForSelector('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0');
            const vencimentotextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0', el => el.textContent.trim());
            console.log(vencimentotextContent);

            await new Promise((r) => setTimeout(r, 3000));

            const value = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblValorPago_0', el => el.textContent.trim());
            const numericValue = value.replace('R$ ', '').replace(',', '.'); // Substitui ',' por '.' para o formato correto
            console.log('Valor:', numericValue);
            await new Promise((r) => setTimeout(r, 3000));

            const page3 = await browser.newPage();
            await page3.goto("https://pixqrcode.com/");

            await page3.waitForSelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select');
            await page3.select('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select', 'Aleatory');

            const selectedOption = await page3.evaluate(() => {
                const select = document.querySelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.p-6.pt-0.mt-5.pb-0 > div.flex.flex-col.sm\\:flex-row > div.flex-none.w-full.sm\\:w-\\[10rem\\] > div > select');
                return select.options[select.selectedIndex].text;
            });
            console.log('Valor selecionado:', selectedOption);

            await page3.waitForSelector('#\\:R99hjt9ja\\:-form-item');
            await page3.type('#\\:R99hjt9ja\\:-form-item', '7d11ffef-8f40-4f82-8512-3f5ba9d9631b');

            await new Promise((r) => setTimeout(r, 3000));
            const inputValuePix = await page3.$eval('#\\:R99hjt9ja\\:-form-item', el => el.value);
            console.log('Valor do input (CNPJ):', inputValuePix);

            await page3.waitForSelector('#\\:R29hjt9ja\\:-form-item');
            await page3.type('#\\:R29hjt9ja\\:-form-item', numericValue);
            const inputValue = await page3.$eval('#\\:R29hjt9ja\\:-form-item', el => el.value);
            console.log('Valor do input (Valor):', inputValue);

            await page3.waitForSelector('#\\:R39hjt9ja\\:-form-item');
            const valueEnergia = 'Equatorial Energina Ltda.';
            await page3.focus('#\\:R39hjt9ja\\:-form-item');
            await page3.keyboard.type(valueEnergia);

            const inputTitulo = await page3.$eval('#\\:R39hjt9ja\\:-form-item', el => el.value);
            console.log('Valor do input (Título):', inputTitulo);

            await page3.waitForSelector('button.bg-primary');
            await page3.click('button.bg-primary');

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

            await new Promise((r) => setTimeout(r, 5000));
            await browser.close();
        } catch (error) {
            console.error('Erro:', error.message);
            res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação.' });
        }
    };

    main();
});



const PORT = process.env.PORT || 3003; // Usa a porta do Heroku ou 3003 localmente
server.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});
