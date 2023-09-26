'use client';

import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import {ProductList} from "@/app/components/ProductList";

export default function Home() {
    return (
        <div>
            <Header />
            <div className='max-w-[1240px] px-4 my-0 mx-[auto] min-h-[90vh]'>
                <h1>Lojas</h1>
            </div>
            <Footer />
        </div>
    )
}
