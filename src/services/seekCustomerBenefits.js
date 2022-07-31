const puppeteer = require('puppeteer');

module.exports = async ({cpf, user, password}) => {
    try {

        let browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            defaultViewport: null,
            devtools:true,
            args: [ '--ignore-certificate-errors',  '--enable-features=NetworkService',  '--window-size=1600,1000',]
            // slowMo: 80,
        });

        let page = await browser.newPage();

        await page.goto('http://extratoclube.com.br');

        let frame =  await page.frames()[0].childFrames()[0];
        
        await frame.type('input[name=usuario]', user)
        await frame.type('input[name=senha]', password)
        await frame.$eval('input[type=submit]', elem => elem.click())
        console.log('step - login')
        await frame.waitForTimeout(process.env.DELAY);
        
        await frame.$eval('app-modal-fila > ion-button', elem => elem.click())
        console.log('step - close modal')
        await frame.evaluate( () => {
            const button = Array.from(document.querySelectorAll('ion-button')).find(x => x.innerText == "BENEFÍCIOS DE UM CPF")
            if(button){
                button.click();
            }
        })

        await frame.waitForTimeout(process.env.DELAY);

        await frame.type("input[name='ion-input-7']", cpf);

        console.log('step - search cpf')

        await frame.evaluate( () => {
            const button = Array.from(document.querySelectorAll('ion-button')).find(x => x.innerText == "PROCURAR")
            if(button){
                button.click();
            }
        });

        await frame.waitForTimeout(process.env.DELAY);
     
        giftNumber = await frame.evaluate(() => {
            let giftNumber = '0';
            const found = Array.from(document.querySelectorAll('ion-grid ion-row ion-col ion-card ion-item')).find(x => +x.innerText > 0);
            console.log('>>> found', found);
            if(found){
                giftNumber = found.innerText
            }

            return giftNumber
        });

        

        return giftNumber;

        // await browser.close();


       } catch (error) {
        console.log('>>> error', error);
       }
}