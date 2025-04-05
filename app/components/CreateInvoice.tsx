"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Files } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";




export function CreateInvoice() {



    const [lastResult, action] = useActionState(createInvoice, undefined);

    const [form, fields] = useForm({
        lastResult, 

        onValidate({formData}){
            return parseWithZod(formData, {
                schema: invoiceSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [rate, setRate] = useState("")
    const [quantity, setQuantity] = useState("");

    const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);

    return(
        <> 
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-6">
                    <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>

                        <input 
                            type="hidden"
                            name={fields.date.name}
                            value={selectedDate.toISOString()}
                        
                        />

                        <input 
                            type="hidden"
                            name={fields.total.name}
                            value={calculateTotal}
                        
                        />

                        

                        <div className="flex flex-col gap-1 w-fit mb-6">
                            <div className="flex items-center gap-4">
                                <Badge variant="secondary">Draft</Badge>
                                <Input name={fields.invoiceName.name} key={fields.invoiceName.key} defaultValue={fields.invoiceName.initialValue} placeholder="test123"/>
                            </div>
                            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label >Invoice No.</Label>
                                <div className="flex">
                                    <span className="px-3 border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                                    <Input 
                                    name={fields.invoiceNumber.name}
                                    key={fields.invoiceNumber.key}
                                    defaultValue={fields.invoiceNumber.initialValue} 
                                    placeholder="5" 
                                    className="rounded-l-none"/>
                                </div>
                                <p className="text-red-500 text-sm">{fields.invoiceNumber.errors}</p>
                            </div>

                            <div>
                                <Label>Currency</Label>
                                <Select defaultValue="INR" name={fields.currency.name} key={fields.currency.key}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select currency"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="INR">
                                            Indian INR -- Rupees
                                        </SelectItem>
                                        <SelectItem value="USD">
                                            United states Dollar -- USD
                                        </SelectItem>
                                        <SelectItem value="EUR">
                                            European Euros 
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-red-500">{fields.currency.errors}</p>
                            </div>
                        </div>

                        <div className="grid grid:md-cols-2 gap-6">
                        <div>
                            <Label className="mb-2">From</Label>
                            <div className="space-y-2">
                                <Input name={fields.fromName.name} key={fields.fromName.key} placeholder="Your Name" />
                                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                                <Input name={fields.fromEmail.name} key={fields.fromEmail.key} placeholder="Your Email" />
                                <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>
                                <Input name={fields.fromAddress.name} key={fields.fromAddress.key} placeholder="Your Address" />
                                <p className="text-sm text-red-500">{fields.fromAddress.errors}</p>
                            </div>
                        </div>

                        <div>
                            <Label className="mb-2">To</Label>
                            <div className="space-y-2">
                                <Input name={fields.clientName.name} key={fields.clientName.key} placeholder="Client Name" />
                                <p className="text-sm text-red-500">{fields.clientName.errors}</p>
                                <Input name={fields.clientEmail.name} key={fields.clientEmail.key} placeholder="Client Email" />
                                <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>
                                <Input name={fields.clientAddress.name} key={fields.clientAddress.key} placeholder="Client Address" />
                                <p className="text-sm text-red-500">{fields.clientAddress.errors}</p>
                            </div>
                        </div>
                        </div>

                        <div className="grid grid:md-cols-2 gap-6 mt-6">
                            <div className="">
                                <div>
                                    <Label>Date</Label>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">
                                        <CalendarIcon />
                                            {selectedDate ? (
                                            new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(selectedDate)
                                            ) : (
                                            <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar 
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => setSelectedDate(date || new Date())}
                                        fromDate={new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <p className="text-sm text-red-500">{fields.date.errors}</p>
                            </div>

                            <div>
                                <Label>Invoice Due</Label>
                                <Select name={fields.dueDate.name} key={fields.dueDate.key} defaultValue={fields.dueDate.initialValue}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select due date"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">
                                            Due on reciept
                                        </SelectItem>
                                        <SelectItem value="1">
                                            Net 15
                                        </SelectItem>
                                        <SelectItem value="2">
                                            Net 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
                            </div>
                        </div>



                        <div className="w-full overflow-x-auto">
                            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                                <p className="col-span-6">Description</p>
                                <p className="col-span-2">Quantity</p>
                                <p className="col-span-2">Rate</p>
                                <p className="col-span-2">Amount</p>
                            </div>

                            <div className="grid grid-cols-12 gap-4 mb-4">
                                <div className="col-span-6">
                                    <Textarea
                                        name={fields.invoiceItemDescription.name}
                                        key={fields.invoiceItemDescription.key}
                                        defaultValue={fields.invoiceItemDescription.initialValue}
                                        placeholder="Item Name and Description"/>
                                    <p className="text-sm text-red-500">{fields.invoiceItemDescription.errors}</p>
                                </div>
                                <div className="col-span-2"> 
                                    <Input 
                                        name={fields.invoiceItemQuantity.name}
                                        key={fields.invoiceItemQuantity.key}
                                        type="number" placeholder="0"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    <p className="text-sm text-red-500">{fields.invoiceItemQuantity.errors}</p>
                                </div>
                                <div className="col-span-2"> 
                                    <Input
                                        name={fields.invoiceItemRate.name}
                                        key={fields.invoiceItemRate.key}
                                        type="number" placeholder="0"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        />
                                    <p className="text-sm text-red-500">{fields.invoiceItemRate.errors}</p>
                                </div>
                                <div className="col-span-2"> 
                                    <Input
                                        value={calculateTotal} 
                                        disabled/>
                                </div>

                            </div>
                        </div>


                        <div className="flex justify-end">
                            <div className="w-1/3">
                                <div className="flex justify-between py-2">
                                    <span className="font-bold">SubTotal:</span>
                                    <span>₹{calculateTotal}</span>
                                </div>

                                <div className="flex justify-between py-2 border-t">
                                    <span>Total(INR)</span>
                                    <span className="font-medium underline">₹{calculateTotal}</span>
                                </div>
                            </div>
                        </div>


                        <div>
                            <Label>Note</Label>
                            <Textarea name={fields.note.name}  key={fields.note.key} defaultValue={fields.note.initialValue} placeholder="this is the place to write your note."/>
                            <p className="text-sm text-red-500">{fields.note.errors}</p>
                        </div>


                        <div className="flex items-center justify-end mt-6">
                            <div>
                                <SubmitButton text="Send invoice to client"/>
                            </div>
                        </div>     
                    </form>                
                </CardContent>
            </Card>
        </>
    )

}