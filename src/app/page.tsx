import Image from 'next/image'

interface ProductProps {
    nome: string
}

// Buscar aprender sobre conceito de crawlers e web scraping

export default function Home() {
    const productList = [
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'},
        {'nome': 'teste'}
    ]

    return (
        <div className='h-screen'>
            <header className='flex justify-center bg-red-500 py-6'>
                <h1 className='text-white font-bold text-3xl'>BUSCAPECA</h1>
            </header>

            <form className='h-20 mt-3'>
                <label htmlFor='pesquisar'></label>
                <input type='text' name='pesquisar' placeholder='Pesquisar item..'/>

                <label htmlFor='submit'></label>
                <input className='py-2 px-4 bg-red-500 text-white rounded-[8px] hover:bg-red-600 transition' name='submit' type='submit'/>
            </form>

            <div className='productList flex gap-8 flex-wrap p-4'>
                {productList.map((product:ProductProps) => {
                    return (
                        <div className='h-72 w-64 border-2 p-4 rounded-2xl'>
                            <span>{product.nome}</span>
                        </div>
                    )
                })}
            </div>

            <footer className='flex justify-center bg-red-500 py-8'>
                <h1 className='text-white font-bold'>Trabalho de Conclusão de Curso - 2023</h1>
            </footer>
        </div>
    )
}
