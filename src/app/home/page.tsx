'use client';

import { resetAlert } from '@/redux/reducer/alert.reducer';
import { decrement, increment, incrementByAmount } from '@/redux/reducer/main.reducer';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {

  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  React.useEffect(() => {
    () => { dispatch(resetAlert()) }
  }, [])

  return (
    <div className='flex flex-col gap-3'>
      <Image src={"/android-chrome-192x192.png"} alt='gambar' width={192} height={192} />
      <div className='h-[100px] bg-teal-300'>isi HomePage</div >
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>

    </div>
  )
}

export default HomePage