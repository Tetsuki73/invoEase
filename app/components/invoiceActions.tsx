import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloud, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";



interface iAppProps {
    id: string;
    status: string;
}

export function InvoiceActions({id}: iAppProps) {
    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary">
                        <MoreHorizontal className=""size-4/>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/invoices/${id}`}>
                            <Pencil className="size-4 mr-2"/> Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/api/invoice/${id}`} target="_blank">
                            <DownloadCloud className="size-4 mr-2"/> Download invoice
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="">
                            <Mail className="size-4 mr-2"/> Reminder Email
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="">
                            <Trash className="size-4 mr-2"/> Delete
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="">
                            <CheckCircle className="size-4 mr-2"/> Mark as Paid
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}