'use client';

import axios from 'axios'
import {Header} from '@/app/components/Header'
import {Footer} from '@/app/components/Footer'
import { useEffect, useState } from 'react'
import { getApiHost } from '@/app/utils/getApiHost'
import { Loader } from '@/app/components/Loader/Loader'

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
                        <h1 className='font-bold text-[1.25rem] text-red-500'>Lojas</h1>

                        <span>Abaixo estão listadas as lojas incluídas na pesquisa do buscapeça. Cada loja está acompanhada de sua nota IBC (Índice Buscapeça de Confiabilidade), esta nota é uma forma de avaliação composta pela nota do comerciante no Reclame Aqui, juntamente com as avaliações dos cliente do Buscapeça</span>

                        <div className='grid grid-cols-4 gap-[16px] mt-[16px]'>
                            {lojas.map((loja: any) => (
                                <div key={loja.id} className='flex flex-col border-[1px] border-gray-200 rounded-lg p-[16px]'>
                                    <div className='flex items-center justify-center h-[82px]'>
                                        <img src={`/images/lojas/iconeLoja${loja.id}.png`} alt='Icone Loja' width={200} className='rounded-lg' />
                                    </div>

                                    <strong className='my-[12px]'>{loja.nome}</strong>

                                    {loja.ratingCount ? (
                                        <div className='text-[0.875rem] flex flex-col'>
                                            <span>
                                                Nota IBC: {((loja.rating / loja.ratingCount) + (loja.notaReclameAqui/2)) / 2}
                                            </span>
                                            <span>Baseado em {loja.ratingCount} avaliações</span>
                                        </div>
                                    ) : (
                                        <span className='text-[0.875rem]'>Esta loja ainda não possui avaliações!</span>
                                    )}
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
