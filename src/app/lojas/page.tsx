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

    function addRating(loja: number) {
        axios.put(`${getApiHost()}addRating`, {
            loja: loja
        }).then(() => {
            fetchLojas()
        })
    }

    return (
        <>
            { isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Header />
                    <div className='max-w-[1240px] px-4 my-0 mx-[auto] min-h-[90vh]'>
                        <h1>Lojas</h1>

                        {lojas.map((loja: any) => (
                            <div key={loja.id}>
                                Nome: {loja.nome}
                                Likes: {loja.likes}
                                <button onClick={() => addRating(loja.id)}>Curtir Loja</button>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            )}
        </>
    )
}
