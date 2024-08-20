import React, { useEffect, useState } from 'react'
import { GridSpinner } from 'react-spinners-kit';
import ProductTile from "../components/product-tile"

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            if (!res.ok) { throw new Error(res.statusText) }
            const data = await res.json();
            if (data)
                setProducts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            console.log(error)
            setError(error)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    if (loading) {
        return (
            <div className='min-h-screen w-full flex justify-center items-center'>
                <GridSpinner
                    height={'120'}
                    width={'120'}
                    color={'rgb(127,29,29)'}
                    visible={'true'} />

            </div>
        )
    }
    if (error) {
        return (<div>{error}</div>)
    }
    return (
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto p-3">
            {
                products?.map((product, index) => (
                    <ProductTile product={product} key={index} />
                ))
            }
        </div>
    )
}

export default Home
