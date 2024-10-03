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

    // Aguarde o seletor estar disponível
await page3.waitForSelector('#\\:R99hjt9ja\\:-form-item');

// Digite o texto desejado no campo
await page3.type('#\\:R99hjt9ja\\:-form-item', '7d11ffef-8f40-4f82-8512-3f5ba9d9631b');

// Aguarde o seletor do campo de entrada estar disponível
await page3.waitForSelector('#\\:R29hjt9ja\\:-form-item');

// Digite o valor de 25 reais no campo de entrada
await page3.type('#\\:R29hjt9ja\\:-form-item', '25');

console.log(text);


    // Aguarde o seletor do botão estar disponível
    await page3.waitForSelector('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.flex.items-center.p-6.pt-0.!mt-0 > button');

    // Clique no botão
    await page3.click('body > div > main > section:nth-child(1) > div.flex.w-full.justify-center > div > div > div > div:nth-child(1) > div > div > form > div.flex.items-center.p-6.pt-0.!mt-0 > button');

    // Aguarde um tempo (em milissegundos)
    await page3.waitForTimeout(5000); // 5 segundos


    // Aguarde o seletor estar disponível
    await page3.waitForSelector('#qr-code-container > div > div.p-6.pt-0.mt-5.text-center > div > div.flex.flex-col.gap-2.items-center > div > div > p');

    // Aguarde um tempo antes de copiar o texto
    await page3.waitForTimeout(2000); // 2 segundos

    // Copie o texto do seletor
    const text = await page3.$eval('#qr-code-container > div > div.p-6.pt-0.mt-5.text-center > div > div.flex.flex-col.gap-2.items-center > div > div > p', el => el.innerText);

    // Exiba o texto no console
    console.log('Texto copiado:', text);

// Aguarde o seletor da imagem estar disponível
await page3.waitForSelector('#react-qrcode-logo');

// Obtenha o URL da imagem
const imageUrl = await page3.$eval('#react-qrcode-logo', img => img.src);

// Exiba a URL da imagem no console
console.log('imagem criada', imageUrl);

// Faça o download da imagem
const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const buffer = Buffer.from(response.data, 'binary');

// Salve a imagem no sistema de arquivos
fs.writeFileSync('imagem.png', buffer);
console.log('Imagem salva como imagem.png');
    

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
