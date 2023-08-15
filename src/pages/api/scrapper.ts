import { load } from 'cheerio'
import puppeteer from "puppeteer"
import {slugify} from "../../app/utils/slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import {IProduct} from "@/app/types/Product.types";
const URL = require('url').URL;

export default async function scrapper(req: NextApiRequest, res: NextApiResponse) {
    const kabumUrl = 'https://www.kabum.com.br/busca/'
    //const pichauUrl = 'https://www.pichau.com.br/search?q='

    const pichauUrl = new URL(`https://www.pichau.com.br/search?q=`);

    const method  = req.method
    const searchItem = req.query.searchItem && req.query.searchItem.toString()

    if(method === 'GET') {
        const products: IProduct[] = []

        const pichauUrl = new URL(`https://www.pichau.com.br/search?q=${slugify(searchItem ? searchItem : '')}`);

        //await getProducts(products, kabumUrl, '.productCard')
        await getProducts(products, pichauUrl, '.MuiGrid-item')

        //products.sort((a, b) => (parseFloat(a.price) > parseFloat(b.price)) ? 1: -1);
        res.send(products)
    } else {
        res.send('Method not allowed')
    }

    async function getProducts(products: IProduct[], searchUrl: any, selector: string) {
        const browser = await puppeteer.launch({
            headless: false,
        })

        const page = await browser.newPage()

        await page.goto(searchUrl, {
            waitUntil: 'networkidle2',
        })
        const html = await page.content()
        const $ = load(html)

        console.log(html)

        $(selector).each((i, el) => {
            const image = $('.imageCard', el).attr('src')
            const title = $('.nameCard', el).text()
            const price = $('.priceCard', el).text()
            const link = 'https://www.kabum.com.br' + $('> a',el).attr('href')

            products.push({
                lojaId: 1, image, title, price, link
            })

            console.log(products)
        })
    }
 }