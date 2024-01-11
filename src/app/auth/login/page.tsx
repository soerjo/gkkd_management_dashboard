'use client';

import React from "react";
import { useRouter } from 'next/navigation'
import { Input, Button, Typography } from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import store from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AuthLoginAsync, authDataReducer } from "@/redux/reducer/auth.reducer";
import { alertOpenAsync, resetAlert } from "@/redux/reducer/alert.reducer";


type Inputs = {
  usernameOrEmail: string
  password: string
}

const schema = yup
  .object({
    usernameOrEmail: yup.string().required('Username or Email is required').test(
      'is-email-or-string',
      'Enter a valid email or string',
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || typeof value === 'string';
      }),
    password: yup.string().required('password is required'),
  })
  .required()


export default function LoginPage() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { status } = useSelector(authDataReducer)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const router = useRouter()

  const onSubmit = async (data: Inputs) => {
    const response = await dispatch(AuthLoginAsync({
      usernameOrEmail: data.usernameOrEmail,
      password: data.password
    })) as any

    if (response.error)
      return dispatch(alertOpenAsync({ options: "error", message: response.error.message }))

    return router.push("/", { scroll: true })
  }

  React.useEffect(() => {
    () => { dispatch(resetAlert()) }
  }, [dispatch])

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mx-auto mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your username or email and password to Sign In.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium" >
                Your username or email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                label=""
                {...register('usernameOrEmail')}
                error={errors.usernameOrEmail && true}
              />
              {errors.usernameOrEmail && <div className="text-red-500 text-sm">{errors.usernameOrEmail.message}</div>}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                label=""
                {...register('password')}
                error={errors.password && true}
              />
              {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
            </div>
          </div>
          <div className="h-[30px]" />

          <Button className="mt-0" type="submit" disabled={status === "loading"} fullWidth>
            Sign In
          </Button>
        </form>
      </div>
    </section>
  );
}
