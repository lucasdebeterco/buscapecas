'use client'

import { Loader } from '@/app/components/Loader/Loader'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IProduct } from '@/app/types/Product.types'
import { getApiHost } from '@/app/utils/getApiHost'
import { SearchForProduct } from '@/app/components/SearchForProduct'
import { SearchForm } from '@/app/components/SearchForm'

import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

interface ILoja {
    id: number
    nome: string
    notaReclameAqui: number
    rating: number
    ratingCount: number
}

export function ProductList() {
    let [productList, setProductList]  = useState([])
    let [lojas, setLojas]  = useState([])
    let [isLoading, setIsLoading] = useState(false)

    function addRating(rating: number, loja: number) {
        axios.put(`${getApiHost()}addRating`, {
            rating: rating,
            loja: loja,
        }).then(() => {
            alert(`Loja ${loja} avaliada com sucesso`)
        })
    }

    async function fetchLojas() {
        await axios.get(`${getApiHost()}lojas`)
            .then((response: any) => {
                setLojas(response.data)
            }).catch((error: any) => {
            console.error("Error:", error);
        }).finally(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        fetchLojas()
    }, [])

    console.log(lojas)

    return (
        <div className='px-[48px] my-0 min-h-[90vh]'>
            <SearchForm setProductList={setProductList} setIsLoading={setIsLoading} />

            { isLoading ? (
                <Loader />
            ) : (productList.length && lojas.length) ? (
                <div className='productList max-w-[1240px] mx-[auto] grid grid-cols-5 gap-6 my-8'>
                    {productList.map((product:IProduct) => {
                        const lojaFiltered: ILoja = lojas.filter((loja: ILoja) => product.lojaId == loja.id)[0]
                        console.log(lojaFiltered)
                        return (
                            <div key={uuidv4()} className='flex flex-col justify-between border-[2px] hover:border-red-600 p-4 rounded-2xl'>
                                <>
                                    <div className='flex justify-center items-center h-[192px]'>
                                        <img className='w-full h-auto' src={product.image} />
                                    </div>
                                    <div className='flex justify-between items-center mb-[8px]'>
                                        <img src={`/images/lojas/iconeLoja${product.lojaId}.png`} alt='Icone Loja' width={50} height={40} className='rounded-sm' />

                                        <Box sx={{'& > legend': { mt: 2 },}}>
                                            <Rating
                                                name="simple-controlled"
                                                value={((lojaFiltered.rating / lojaFiltered.ratingCount) + (lojaFiltered.notaReclameAqui/2)) / 2}
                                                onChange={(event, newValue) => {
                                                    newValue && addRating(newValue, product.lojaId)
                                                }}
                                            />
                                        </Box>
                                    </div>

                                    <span className='text-[0.825rem] font-bold h-[58px] mt-1 overflow-hidden'>{product.title}</span>
                                    <span className='text-[0.825rem] font-bold text-red-600 mt-2'>R$ {product.price}</span>
                                </>
                                <a
                                    href={product.link}
                                    target='_blank'
                                    className='text-center text-white bg-red-600 hover:bg-red-700 transition mt-6 rounded-[6px] py-[6px] font-bold text-[0.75rem]'
                                >
                                    Ver produto na Loja
                                </a>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <SearchForProduct />
            )}
        </div>
    )
}