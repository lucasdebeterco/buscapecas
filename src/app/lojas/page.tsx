'use client';

import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import { useEffect, useState } from 'react';
import { getApiHost } from '@/app/utils/getApiHost';
import axios from 'axios';
import { Loader } from '@/app/components/Loader/Loader';

export default function Home() {
    let [lojas, setLojas]  = useState([])
    let [isLoading, setIsLoading] = useState(true)

    function fetchLojas() {
        axios.get(`${getApiHost()}lojas`)
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

    return (
        <>
            { isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Header />
                    <div className='max-w-[1240px] px-4 my-0 mx-[auto] min-h-[90vh] py-[32px]'>
                        <h1 className='font-bold text-[20px] text-red-500'>Lojas</h1>

                        <div className='grid grid-cols-4 gap-[16px] mt-[16px]'>
                            {lojas.map((loja: any) => (
                                <div key={loja.id} className='border-[1px] border-gray-200 rounded-lg p-[16px]'>
                                    <strong>{loja.nome}</strong>

                                    <div>
                                        {loja.ratingCount ? (
                                            <span>Nota: { loja.rating / loja.ratingCount }</span>
                                        ) : (
                                            <span>Esta loja ainda não possui avaliações!</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <Footer />
                </div>
            )}
        </>
    )
}
