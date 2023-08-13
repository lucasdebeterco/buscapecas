'use client';

import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import {ProductList} from "@/app/components/ProductList";

export default function Home() {
    return (
        <div>
            <Header />
            <ProductList />
            <Footer />
        </div>
    )
}
