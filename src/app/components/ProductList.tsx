'use client'

import { Loader } from '@/app/components/Loader/Loader'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import axios from 'axios'
import { IProduct } from '@/app/types/Product.types'
import { Star } from '@phosphor-icons/react'
import { getApiHost } from '@/app/utils/getApiHost'
import { SearchForProduct } from '@/app/components/SearchForProduct'
import { SearchForm } from '@/app/components/SearchForm'

export function ProductList() {
    let [productList, setProductList]  = useState([])
    let [isLoading, setIsLoading] = useState(false)

    function addRating(rating: number, loja: number) {
        axios.put(`${getApiHost()}addRating`, {
            rating: rating,
            loja: loja,
        }).then(() => {
            alert(`Loja ${loja} avaliada com sucesso`)
        })
    }

    return (
        <div className='px-[48px] my-0 min-h-[90vh]'>
            <SearchForm setProductList={setProductList} setIsLoading={setIsLoading} />

            { isLoading ? (
                <Loader />
            ) : productList.length ? (
                <div className='productList max-w-[1240px] mx-[auto] grid grid-cols-5 gap-6 my-8'>
                    {productList.map((product:IProduct) => {
                        return (
                            <div key={uuidv4()} className='flex flex-col justify-between border-[2px] hover:border-red-600 p-4 rounded-2xl'>
                                <>
                                    <div className='flex justify-center items-center'>
                                        <img className='w-full h-auto' src={product.image} />
                                    </div>
                                    <>
                                        <img src={`/images/lojas/iconeLoja${product.lojaId}.png`} alt='Icone Loja' width={50} height={40} className='rounded-sm' />

                                        <div>
                                            <button onClick={() => addRating(1, product.lojaId)}><Star weight='fill' color='#f59e0b' /></button>
                                            <button onClick={() => addRating(2, product.lojaId)}><Star weight='fill' color='#f59e0b' /></button>
                                            <button onClick={() => addRating(3, product.lojaId)}><Star weight='fill' color='#f59e0b' /></button>
                                            <button onClick={() => addRating(4, product.lojaId)}><Star weight='fill' color='#f59e0b' /></button>
                                            <button onClick={() => addRating(5, product.lojaId)}><Star weight='fill' color='#f59e0b' /></button>
                                        </div>

                                    </>

                                    <span className='text-[0.825rem] font-bold h-[58px] mt-1 overflow-hidden'>{product.title}</span>
                                    <span className='text-[0.825rem] font-bold text-red-600 mt-2'>{product.price}</span>
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