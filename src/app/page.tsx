import Image from 'next/image'

export default function Home() {
    return (
        <div className='h-screen'>
            <header className='flex justify-center bg-red-500 py-2'>
                <h1 className='text-white font-bold'>BUSCAPECA</h1>
            </header>

            <form>
                <label htmlFor='pesquisar'></label>
                <input type='text' name='pesquisar' placeholder='Pesquisar item..'/>

                <label htmlFor='submit'></label>
                <input name='submit' type='submit'/>
            </form>

            <div className='productList'>
                Área de listagem de produtos
            </div>

            <footer className='flex justify-center bg-red-500 py-8'>
                <h1 className='text-white font-bold'>Trabalho de Conclusão de Curso - 2023</h1>
            </footer>
        </div>
    )
}
