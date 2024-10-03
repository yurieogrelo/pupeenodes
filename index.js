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
        console.log("Número de consumidoras:", nuncons);

        const nuncpfs = await page1.evaluate(() => document.querySelector(".textos").textContent);
        console.log("Número de CPFs:", nuncpfs);

        const nundata = await page1.evaluate(() => document.querySelector(".textoss").textContent);
        console.log("Data de nascimento:", nundata);

        await page1.waitForTimeout(10000); // Espera 10 segundos (ajuste conforme necessário)

        const page = await browser.newPage();
        console.log("Iniciando navegação para a página de login...");

        await page.goto("https://goias.equatorialenergia.com.br/LoginGO.aspx?envia-dados=Entrar", { waitUntil: 'networkidle2' });
        console.log("Navegação concluída. Página de login carregada.");

        // Aguardar o seletor do input de UC
        console.log("Aguardando o seletor do input de UC...");
        try {
            await page.waitForSelector('.container .header input#WEBDOOR_headercorporativogo_txtUC', { visible: true });
            console.log("Seletor de UC encontrado. Colocando o foco no input.");
            
            const ucElement = await page.$('.container .header input#WEBDOOR_headercorporativogo_txtUC');
            if (ucElement) {
                await ucElement.focus();
                await ucElement.type(nuncons, { delay: 100 });
                console.log("Texto escrito no campo de UC.");
            } else {
                console.error("Elemento de UC não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao encontrar o seletor de UC:", error);
        }
        

        // Aguardar o seletor do CPF
        console.log("Aguardando o seletor do input de CPF...");
        await page.waitForSelector("input#WEBDOOR_headercorporativogo_txtDocumento");
        const cpfElement = await page.$("input#WEBDOOR_headercorporativogo_txtDocumento");
        if (cpfElement) {
            await cpfElement.focus();
            await cpfElement.type(nuncpfs, { delay: 100 });
            console.log("Texto escrito no campo de CPF.");
        } else {
            console.error("Elemento de CPF não encontrado!");
        }

        // Clicar no botão "Entrar"
        console.log("Aguardando o botão de login...");
        await page.waitForSelector('button.btn-hi[type="submit"][name="envia-dados"]', { visible: true });
        await page.click('button.btn-hi[type="submit"][name="envia-dados"]');
        console.log("Botão de login clicado.");

        // Espera a navegação até a próxima página
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log("Navegação para a próxima página concluída.");

        // Aguardar o seletor do input de Data
        await page.waitForSelector("input#WEBDOOR_headercorporativogo_txtData");
        const dataElement = await page.$("input#WEBDOOR_headercorporativogo_txtData");
        if (dataElement) {
            await dataElement.focus();
            await dataElement.type(nundata, { delay: 300 });
            console.log("Texto escrito no campo de Data.");
        } else {
            console.error("Elemento de Data não encontrado!");
        }

        // Clicar no botão de validar
        await page.waitForSelector("#WEBDOOR_headercorporativogo_btnValidar");
        const clickbtn = await page.$("#WEBDOOR_headercorporativogo_btnValidar");
        if (clickbtn) {
            await clickbtn.click();
            console.log("Botão de validar clicado.");
        } else {
            console.error("Botão de validar não encontrado!");
        }

        await page.waitForSelector('#upModal_promocao', { visible: true });
        await page.click('#upModal_promocao > div > div.modal-header > button');
        console.log("Modal de promoção fechado.");

        await page.waitForSelector('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label', { visible: true });
        await page.click('#ctl05 > div.row.no-margin.table-row.bg-menu > div.col-md-3.full-height > div > div.multi-level > div:nth-child(1) > label');
        console.log("Histórico de Pagamento selecionado.");

        await page.waitForSelector('#LinkHistoricoPagamento');
        await page.click('#LinkHistoricoPagamento');
        console.log("Acessando histórico de pagamento.");

        await page.waitForSelector('#CONTENT_btEnviar');
        await page.click('#CONTENT_btEnviar');
        console.log("Solicitando envio.");

        await page.waitForSelector('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0');
        const nometextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblNomeCliente_0', el => el.textContent.trim());
        console.log("Nome do cliente:", nometextContent);

        await page.waitForSelector('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0');
        const vencimentotextContent = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblVencimento_0', el => el.textContent.trim());
        console.log("Data de vencimento:", vencimentotextContent);

        const value = await page.$eval('#CONTENT_gridHistoricoPagamentoFatura_gridLblValorPago_0', el => el.textContent.trim());
        const numericValue = value.replace('R$ ', '').replace(',', '.'); // Substitui ',' por '.' para o formato correto
        console.log('Valor:', numericValue);

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
