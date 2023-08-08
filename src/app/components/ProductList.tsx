'use client'

import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import axios from "axios";
import {IProduct} from "@/app/types/Product.types";

export function ProductList() {
    let [productList, setProductList]  = useState([])

    async function getProducts(e: any) {
        axios.get(`http://localhost:3000/api/scrapper?searchItem=${e.target.searchItem.value}`)
            .then((response: any) => {
                setProductList(response.data)
            }).catch((error: any) => {
                console.error("Error:", error);
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

            {productList.length ? (
                <div className='productList grid grid-cols-5 gap-6 my-8'>
                    {productList.map((product:IProduct) => {
                        return (
                            <div key={uuidv4()} className='flex flex-col h-[300px] border-[1px] p-4 rounded-2xl'>
                                <span className='text-[1rem] font-bold'>{product.title}</span>
                                <span className='text-[0.75rem] font-bold text-red-600'>{product.price}</span>
                                <span className='text-[0.75rem]'>{product.link}</span>
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