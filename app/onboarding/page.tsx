"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { ZodSchema } from "zod";
import { onboardingSchema } from "../utils/zodSchemas";


export default function Onbording() {

    const [lastResult, action] = useActionState(onboardUser, undefined);

    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,
    
        // Reuse the validation logic on the client
        onValidate({ formData }) {
          return parseWithZod(formData, { schema: onboardingSchema });
        },
    
        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
      });

  return (
    <>
        <div className="min-h-screen w-screen flex items-center justify-center ">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-center">
                        You are almost Finished...
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create an account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form  className="grid gap-4" action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label className="font-semibold">First Name</Label>
                                <Input name={fields.firstName.name} key={fields.firstName.key} defaultValue={fields.firstName.initialValue} placeholder="Jhon"/>
                                <p className="text-red-400 text-sm">{fields.firstName.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Last Name</Label>
                                <Input name={fields.lastName.name} key={fields.lastName.key} defaultValue={fields.lastName.initialValue} placeholder="Doe"/>
                                <p className="text-red-400 text-sm">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div className="grid gap-2 font-semibold">
                            <Label>Address</Label>
                            <Input name={fields.address.name} key={fields.address.key} defaultValue={fields.address.initialValue} placeholder="Flat No,City, State, Country, Pincode" /> 
                            <p className="text-red-400 text-sm">{fields.address.errors}</p>   
                        </div>

                        <div>
                            <SubmitButton text="Finish Onboarding.😍"/> 
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    </>
  )
}
