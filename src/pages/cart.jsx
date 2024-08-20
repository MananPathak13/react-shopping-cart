import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CartTile from '../components/cart-tile';

const Cart = () => {
    const [totalCart, setTotalCart] = useState(0);
    const { cart } = useSelector(state => state);

    useEffect(() => {
        setTotalCart(cart.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart]);


    return (
        <>
            {
                cart && cart.length ?
                    (
                        <div className='flex'>
                            <div className="min-h-[80vh] grid s md:grid-cols-2 max-w-6xl mx-auto">
                                <div className='flex flex-col justify-center items-centerp-3'>
                                    {cart.map((item, index) => (
                                        <CartTile cartItem={item} key={index} />
                                    )
                                    )
                                    }
                                </div>
                                <div className="w-[300px]">
                                    <div className='flex flex-col justify-center items-end p-5 space-y-5 mt-14'>
                                        <h1 className='font-bold text-lg text-red-800'>Your Cart summary</h1>
                                        <p>
                                            <span className='text-gray-800 font-bold'>Total Item</span>
                                            <span>: {cart.length}</span>
                                        </p>
                                        <p>
                                            <span className='text-gray-800 font-bold'>Total amount</span>
                                            <span>{totalCart}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='min-h-[80vh] flex flex-col items-center justify-center'>
                            <div className='text-gray-800 font-bold text-xl mb-2'>
                                Cart is Empty
                            </div>
                            <Link to={"/home"}>
                                <button
                                    className='bg-red-950 text-white border-2 rounded-lg font-bold p-4 hover:bg-red-700'>
                                    Shop now
                                </button>
                            </Link>
                        </div>
                    )
            }
        </>
    )
}

export default Cart
