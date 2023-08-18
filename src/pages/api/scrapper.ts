import { load } from 'cheerio'
import puppeteer from "puppeteer"
import { slugify } from "../../app/utils/slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from "@/app/types/Product.types";
const URL = require('url').URL;

export default async function scrapper(req: NextApiRequest, res: NextApiResponse) {
    const method  = req.method
    const searchItem = req.query.searchItem && req.query.searchItem.toString()

    if(method === 'GET') {
        const products: IProduct[] = []

        const kabumUrl = new URL(`https://www.kabum.com.br/busca/${slugify(searchItem ? searchItem : '')}`)
        const pichauUrl = new URL(`https://www.pichau.com.br/search?q=${slugify(searchItem ? searchItem : '')}`)
        const gkUrl = new URL(`https://www.gkinfostore.com.br/buscar?q=${slugify(searchItem ? searchItem : '')}`)

        await getProducts(
            products,
            kabumUrl,
            '.productCard',
            '.imageCard',
            '.nameCard',
            '.priceCard',
            1
        )
        await getProducts(
            products,
            pichauUrl,
            'a[data-cy="list-product"]',
            '.MuiPaper-root > div > div > div > img',
            'h2.MuiTypography-root',
            '.MuiCardContent-root > div > div:nth-child(1) > div > div:nth-child(3)',
            2
        )
        await getProducts(
            products,
            pichauUrl,
            'listagem-item',
            '.imagem-produto > img',
            'a.nome-produto',
            '.desconto-a-vista',
            3
        )

        products.sort((a: IProduct, b: IProduct) => parseFloat(a.price.split('R$ ')[1]) > parseFloat(b.price.split('R$ ')[1]) ? 1: -1)
        res.send(products)
    } else {
        res.send('Method not allowed')
    }

    async function getProducts(
        products: IProduct[],
        searchUrl: any,
        selector: string,
        imageSelector:string,
        titleSelector: string,
        priceSelector: string,
        idLoja: number
    ) {
        const browser = await puppeteer.launch({})

        const page = await browser.newPage()
        //await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");

        await page.goto(searchUrl)
        const html = await page.content()
        const $ = load(html)

        $(selector).each((i, el) => {
            const image = $(imageSelector, el).attr('src')
            const title = $(titleSelector, el).text()
            const price = $(priceSelector, el).text()
            const link = 'https://www.kabum.com.br' + $('> a',el).attr('href')

            console.log(image)
            products.push({
                lojaId: idLoja, image, title, price, link
            })
        })
    }
 }