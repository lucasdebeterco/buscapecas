'use client'

import Link from 'next/link';

export function Header() {
    return (
        <header className='flex justify-between px-[28px] bg-red-500 py-6'>
            <Link href={'/'}>
                <h1 className='text-white font-bold text-3xl'>BUSCAPECA</h1>
            </Link>

            <Link href={'/lojas'} className='text-white text-[18px] font-bold'>
                Lojas
            </Link>
        </header>
    )
}