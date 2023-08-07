'use client';

import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import {ProductList} from "@/app/components/ProductList";

export default function Home() {
    return (
        <div className='h-screen'>
            <Header />
            <ProductList />
            <Footer />
        </div>
    )
}
