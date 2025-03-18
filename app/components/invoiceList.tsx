import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceActions } from "./invoiceActions";

export default function InvoiceList(){
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
                    <TableRow>
                        <TableCell>#1</TableCell>
                        <TableCell>Abhi</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell>paid</TableCell>
                        <TableCell>22-11-2024</TableCell>
                        <TableCell className="text-right">
                            <InvoiceActions/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}