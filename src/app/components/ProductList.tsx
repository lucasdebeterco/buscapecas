'use client'

import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import axios from "axios";
import {IProduct} from "@/app/types/Product.types";

export function ProductList() {
    let [productList, setProductList]  = useState([])
    let [isLoading, setIsLoading] = useState(false)

    async function getProducts(e: any) {
        e.preventDefault();
        setIsLoading(true);
        axios.get(`/api/scrapper?searchItem=${e.target.searchItem.value}`)
            .then((response: any) => {
                setProductList(response.data)
            }).catch((error: any) => {
                console.error("Error:", error);
            }).finally(() => {
            setIsLoading(false)
        });
    }

    return (
        <div className='max-w-[1240px] my-0 mx-[auto]'>
            <form onSubmit={getProducts} className='mt-8' action='#'>
                <label htmlFor='searchItem'></label>
                <input type='text'
                       name='searchItem'
                       placeholder='Pesquisar item..'
                       className='outline-0 border-[1px] py-2 px-4 rounded-[8px]'
                />
                <input className='py-2 px-4 ml-4 bg-red-500 text-white rounded-[8px] hover:bg-red-600 transition' name='submit' type='submit'/>
            </form>

            { isLoading ? (
                <>Carregando</>
            ) : productList.length ? (
                <div className='productList grid grid-cols-5 gap-6 my-8'>
                    {productList.map((product:IProduct) => {
                        return (
                            <div key={uuidv4()} className='flex flex-col justify-between border-[1px] p-4 rounded-2xl'>
                                <>
                                    <div className='flex justify-center items-center h-[180px] w-[180px]'>
                                        <img className='' src={product.image} />
                                    </div>
                                    <span className='text-[0.825rem] font-bold h-[58px] overflow-hidden'>{product.title}</span>
                                    <span className='text-[0.825rem] font-bold text-red-600 mt-2'>{product.price}</span>
                                </>
                                <a
                                    href={product.link}
                                    target='_blank'
                                    className='text-center text-white bg-red-600 mt-6 rounded-[6px] py-[6px] font-bold text-[0.75rem]'
                                >
                                    Ver produto na Loja
                                </a>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <strong>Nenhum resultado encontrado</strong>

            )}
        </div>
    )
}