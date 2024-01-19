'use client';

import { closeSidebar, decrement, increment, incrementByAmount } from '@/redux/reducer/main.reducer';
import { RootState } from '@/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const JemaatPage = () => {

  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  React.useEffect(() => {
    dispatch(closeSidebar())
  }, [])

  return (
    <div className='flex flex-col gap-3'>
      <div className='h-[100px] bg-teal-300'>isi JemaatPage</div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>

    </div>
  )
}

export default JemaatPage