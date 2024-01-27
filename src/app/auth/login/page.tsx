'use client';

import React from "react";
import { useRouter } from 'next/navigation'
import { Input, Button, Typography } from "@material-tailwind/react";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import loginFormSchema from "@/common/validator/login-form.validator";
import { ILoginForm } from "@/common/interfaces/login-form.interfaces";

import { authLogin } from "@/services/auth";
import { handleSetCookie } from "@/utils/cookies.util";
import { JwtEnumKey } from "@/common/enum/localstorage.enum";
import { setLocalStorage } from "@/utils/localstorage.util";

export default function LoginPage() {
  const [status, setstatus] = React.useState<string>("idle")
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    resolver: yupResolver(loginFormSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: ILoginForm) => {
    try {
      setstatus('loading')
      const response = await authLogin(data.usernameOrEmail, data.password)

      // handleSetCookie(JwtEnumKey.JWT, response.data.jwt, 8)
      // setLocalStorage(JwtEnumKey.JWT, { data: response.data.jwt }, 60 * 8)
      // setLocalStorage(JwtEnumKey.PAYLOAD, response.data.payload, 60 * 8)

      handleSetCookie(JwtEnumKey.JWT, response.data.jwt, 1)
      setLocalStorage(JwtEnumKey.JWT, response.data.jwt, 60 * 1)
      setLocalStorage(JwtEnumKey.PAYLOAD, response.data.payload, 60 * 1)

      setstatus('success')
      router.push("/", { scroll: true })
    } catch (error: any) {
      setstatus('err')

      if (error?.response?.status < 500) {
        return toast.warn(error.response.data.message, { theme: "colored" })
      }

      toast.error(error.message, { theme: "colored" })
    }
  }

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
