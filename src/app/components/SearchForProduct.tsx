export function SearchForProduct() {
    return (
        <div className='flex flex-col gap-2 justify-center items-center h-[30vh]'>
            <img src={`/images/logoIcon.svg`} alt='Icone Loja' width={80} height={80} />
            <span className='text-gray-600'>Pesquise por um produto!</span>
        </div>
    )
}