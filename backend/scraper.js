// const puppeteer = require('puppeteer-electron')
const puppeteer = require('puppeteer')
const { ipcMain } = require('electron')

const pagePromise = puppeteer.launch({ headless: false }).then(b => b.newPage())

async function login (username, password) {
  const page = await pagePromise

  await page.goto('https://soundcloud.com')
  await page.waitForSelector('.frontHero__loginButton', { timeout: 20000 })
  await page.click('.frontHero__loginButton')

  await page.waitForSelector('#formControl_250', { timeout: 20000 })
  await page.type('#formControl_250', username)
  await page.click('.signinForm__cta.signinForm__checkIdentifierCTA.sc-button-cta.sc-button.sc-button-large')

  await page.waitForSelector('#formControl_262', { timeout: 20000 })
  await page.type('#formControl_262', password)

  await page.waitForSelector('.signinWithPassword > .signinForm__cta', { timeout: 20000 })
  await page.click('.signinWithPassword > .signinForm__cta')
}

ipcMain.on('login', (event, arg) => {
  console.log(JSON.parse(arg))
  const data = JSON.parse(arg)
  login(data.email, data.password)
})
