import { MagnifyingGlass } from '@phosphor-icons/react';
import axios from 'axios';
import { getApiHost } from '@/app/utils/getApiHost';
import Image from 'next/image';

interface ISearchForm {
    setProductList: React.Dispatch<React.SetStateAction<any>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function SearchForm({ setProductList, setIsLoading }: ISearchForm) {
    async function getProducts(e: any) {
        e.preventDefault();
        setIsLoading(true)

        axios.get(`${getApiHost()}products?searchItem=${e.target.searchItem.value}`)
            .then((response: any) => {
                console.log(response)
                setProductList(response.data)
            }).catch((error: any) => {
            console.error("Error:", error);
        }).finally(() => {
            setIsLoading(false)
        });
    }

    return (
        <div className='flex justify-between py-[80px] pr-[30px]'>
            <form onSubmit={getProducts} className='flex flex-col justify-center mt-8' action='#'>
                <label htmlFor='searchItem' className='text-[26px] text-red-500 font-bold'>Pesquisar</label>

                <span className='text-[14px]'>Pesquise por processadores, placas de vídeo, memórias,</span>
                <span className='text-[14px]'>armazenamento ou outros itens de hardware..</span>

                <div className='flex mt-[16px]'>
                    <input type='text'
                           name='searchItem'
                           placeholder='ex: rtx 4060'
                           className='h-[36px] py-1 px-4 outline-0 border-[1px] rounded-[8px] text-[14px]'
                    />
                    <button className='h-[36px] px-3 ml-2 bg-red-500 text-white rounded-[8px] hover:bg-red-600 cursor-pointer transition' name='submit' type='submit'>
                        <MagnifyingGlass color='#fff' size={20} />
                    </button>
                </div>
            </form>

            {/*<Image src='/images/illustration.jpg' className='rounded-[20px]' width={300} height={300} alt='illustration' />*/}
        </div>

    )
}