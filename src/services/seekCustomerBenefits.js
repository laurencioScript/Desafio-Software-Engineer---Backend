const puppeteer = require("puppeteer");

async function login(frame, { cpf, user, password }) {
  await frame.type("input[name=usuario]", user);
  await frame.type("input[name=senha]", password);
  await frame.$eval("input[type=submit]", (elem) => elem.click());

  await frame.waitForTimeout(process.env.DELAY / 2);

  const alert = await frame.evaluate(() => {
    return document.querySelector("#alert-1-msg");
  });

  if (alert) {
    throw { showMessage: "Invalid password or username", statusCode: 404 };
  }
}

async function closeModal(frame) {
  await frame.$eval("app-modal-fila > ion-button", (elem) => elem.click());
}

async function clickButtonCPF(frame) {
  await frame.evaluate(() => {
    const button = Array.from(document.querySelectorAll("ion-button")).find(
      (x) => x.innerText == "BENEFÍCIOS DE UM CPF"
    );
    if (button) {
      button.click();
    }
  });
}

async function logout(frame) {
  await frame.evaluate(() => {
    const button = Array.from(document.querySelectorAll("ion-item")).find(
      (x) => x.innerText == "Deslogar"
    );
    if (button) {
      button.click();
    }
  });
}

async function clickButtonCPF(frame) {
  await frame.evaluate(() => {
    const button = Array.from(document.querySelectorAll("ion-button")).find(
      (x) => x.innerText == "BENEFÍCIOS DE UM CPF"
    );
    if (button) {
      button.click();
    }
  });
}

async function getGiftNumber(frame, { cpf, user, password }) {
  await frame.type("input[name='ion-input-7']", cpf);

  await frame.evaluate(() => {
    const button = Array.from(document.querySelectorAll("ion-button")).find(
      (x) => x.innerText == "PROCURAR"
    );
    if (button) {
      button.click();
    }
  });

  await frame.waitForTimeout(process.env.DELAY);

  let giftNumber = await frame.evaluate(() => {
    const found = Array.from(
      document.querySelectorAll("ion-grid ion-row ion-col ion-card ion-item")
    ).find((x) => +x.innerText > 0);

    if (!found) {
      return null;
    }

    return found.innerText;
  });

  if (!giftNumber) {
    throw { showMessage: "no benefit number found ", statusCode: 404 };
  }

  return giftNumber;
}

module.exports = async (data) => {
  const browser = await puppeteer.launch({
    headless: new Boolean(process.env.PRODUCTION) ? false : true,
    ignoreHTTPSErrors: true,
    devtools: new Boolean(process.env.PRODUCTION) ? true : false,
    args: ["--ignore-certificate-errors", "--enable-features=NetworkService"],
  });

  page = await browser.newPage();

  await page.goto("http://extratoclube.com.br");

  let frame = await page.frames()[0].childFrames()[0];

  await login(frame, data);
  await frame.waitForTimeout(process.env.DELAY);

  await closeModal(frame);
  await clickButtonCPF(frame);
  await frame.waitForTimeout(process.env.DELAY);

  let giftNumber = await getGiftNumber(frame, data);
  await browser.close();

  return giftNumber;
};
