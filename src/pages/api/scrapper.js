import { load } from 'cheerio'
import puppeteer from "puppeteer"

const testUrl = 'https://www.kabum.com.br/busca/rtx-4090'

export default async function scrapper(req, res) {
    const method  = req.method

    if(method === 'GET') {
        console.log(req.body)
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(testUrl)
        const html = await page.content()

        const $ = load(html)

        const products = []

        $('.productCard').each((i, el) => {
            const title = $('.nameCard', el).text()
            const price = $('.priceCard', el).text()
            const link = 'www.kabum.com.br' + $('> a',el).attr('href')
            products.push({
                title, price, link
            })
        })

        res.send(products)
    } else {
        res.send('Method not allowed')
    }
}