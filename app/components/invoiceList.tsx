import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceActions } from "./invoiceActions";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "@/components/ui/badge";


async function getDtata(userId: string) {
    const data = await prisma.invoice.findMany({
        
        where: {
            userId: userId,
        },
        select:{
            id: true,
            clientName: true,
            total: true,
            status: true,
            invoiceNumber: true,
            currency: true,
            createdAt: true,
        },
        orderBy:{
            createdAt: 'desc',

        }
    });

    return data;
}

export default async function InvoiceList(){
    const session = await requireUser();
    const data = await getDtata(session.user?.id as string);
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                {data.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>#{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  {formatCurrency({
                    amount: invoice.total,
                    currency: invoice.currency as any,
                  })}
                </TableCell>
                <TableCell>
                  <Badge>{invoice.status}</Badge>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                  }).format(invoice.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <InvoiceActions id={invoice.id} status={""}/>
                </TableCell>
              </TableRow>
            ))}
                </TableBody>
            </Table>
        </>
    )
}