import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const server = express();
server.use(cors());

const main = async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: process.env.CHROME_BIN || 'chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
        });

        const page1 = await browser.newPage();
        await page1.goto("https://equatorialoficial.site/meusdadosapi/", { waitUntil: "load" });
        await page1.waitForSelector(".textoss");

        const nuncons = await page1.evaluate(() => document.querySelector(".texto").textContent);
        console.log(nuncons);

        const nuncpfs = await page1.evaluate(() => document.querySelector(".textos").textContent);
        console.log(nuncpfs);

        const nundata = await page1.evaluate(() => document.querySelector(".textoss").textContent);
        console.log(nundata);

        const page5 = await browser.newPage();
        await page5.goto("https://go.equatorialenergia.com.br/?utm_source=site&utm_medium=landing_page&utm_campaign=novo_site", { waitUntil: 'networkidle2' });

        // Aguardar o botão ser visível antes de clicar
        await page5.waitForSelector('button.btn-hi[type="submit"][name="envia-dados"]', { visible: true });

         // Clicar no botão
         await page5.click('button.btn-hi[type="submit"][name="envia-dados"]');

         // Esperar um pouco para garantir que a ação foi concluída
        await page5.waitForTimeout(2000); // Espera 2 segundos (ajuste conforme necessário)


        const page = await browser.newPage();
        await page.goto("https://goias.equatorialenergia.com.br/LoginGO.aspx?envia-dados=Entrar", { waitUntil: 'networkidle2' });

        // Aumentando o timeout para esperar pelo seletor
        await page.waitForSelector("input#WEBDOOR_headercorporativogo_txtUC", { timeout: 60000 });
        const consumidoras = await page.$("input#WEBDOOR_headercorporativogo_txtUC");
        if (consumidoras) {
            await consumidoras.type(nuncons, { delay: 100 });
        } else {
            console.error("Elemento consumidoras não encontrado!");
        }

        await page.waitForSelector("input#WEBDOOR_headercorporativogo_txtDocumento");
        const cpfs = await page.$("input#WEBDOOR_headercorporativogo_txtDocumento");
        if (cpfs) {
            await cpfs.type(nuncpfs, { delay: 100 });
        } else {
            console.error("Elemento cpfs não encontrado!");
        }

        await page.waitForSelector('div.align-self-end.button-banner button.button', { visible: true });
        console.log('Botão encontrado.');
        await page.click('div.align-self-end.button-banner button.button');
        console.log('Botão clicado.');

        await page.waitForSelector("input#WEBDOOR_headercorporativogo_txtData");
        const nascimentos = await page.$("input#WEBDOOR_headercorporativogo_txtData");
        if (nascimentos) {
            await nascimentos.type(nundata, { delay: 300 });
        } else {
            console.error("Elemento nascimentos não encontrado!");
        }

        await page.waitForSelector("#WEBDOOR_headercorporativogo_btnValidar");
        const clickbtn = await page.$("#WEBDOOR_headercorporativogo_btnValidar");
        if (clickbtn) {
            await clickbtn.click();
        } else {
            console.error("Botão de validar não encontrado!");
        }

        await page.waitForSelector('#upModal_promocao', { visible: true });
        await page.waitForSelector('#upModal_promocao > div > div.modal-header > button', { visible: true });
        await page.click('#upModal_promocao > div > div.modal-header > button');

        await page.waitForSelector('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label', { visible: true });
        await page.click('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label');

        await page.waitForSelector('#LinkHistoricoPagamento');
        await page.click('#LinkHistoricoPagamento');

        await page.waitForSelector('#CONTENT_btEnviar');
        await page.click('#CONTENT_btEnviar');

        await page.waitForSelector('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0');
        const nometextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0', el => el.textContent.trim());
        console.log(nometextContent);

        await page.waitForSelector('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0');
        const vencimentotextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0', el => el.textContent.trim());
        console.log(vencimentotextContent);

        const value = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblValorPago_0', el => el.textContent.trim());
        const numericValue = value.replace('R$ ', '').replace(',', '.'); // Substitui ',' por '.' para o formato correto
        console.log('Valor:', numericValue);

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

    } catch (error) {
        console.error('Erro:', error.message);
        res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

server.get("/cliente/:id", main);

const PORT = process.env.PORT || 3003; // Usa a porta do Heroku ou 3003 localmente
server.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});
