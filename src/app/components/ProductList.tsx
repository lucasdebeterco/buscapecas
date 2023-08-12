'use client'

import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import axios from "axios";
import {IProduct} from "@/app/types/Product.types";
import {MagnifyingGlass} from "@phosphor-icons/react";

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
        <div className='max-w-[1240px] px-4 my-0 mx-[auto]'>
            <form onSubmit={getProducts} className='flex column items-center mt-8' action='#'>
                <label htmlFor='searchItem'></label>
                <input type='text'
                       name='searchItem'
                       placeholder='Pesquisar item..'
                       className='outline-0 border-[1px] h-[36px] py-1 px-4 rounded-[8px]'
                />
                <button className='h-[36px] px-3 ml-2 bg-red-500 text-white rounded-[8px] hover:bg-red-600 cursor-pointer transition' name='submit' type='submit'>
                    <MagnifyingGlass color='#fff' size={20} />
                </button>
            </form>

            { isLoading ? (
                <>Carregando</>
            ) : productList.length ? (
                <div className='productList grid grid-cols-5 gap-6 my-8'>
                    {productList.map((product:IProduct) => {
                        return (
                            <div key={uuidv4()} className='flex flex-col justify-between border-[2px] hover:border-red-600 p-4 rounded-2xl'>
                                <>
                                    <div className='flex justify-center items-center'>
                                        <img className='w-full h-auto' src={product.image} />
                                    </div>
                                    <span className='text-[0.825rem] font-bold h-[58px] overflow-hidden'>{product.title}</span>
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
                <strong>Nenhum resultado encontrado</strong>
            )}
        </div>
    )
}