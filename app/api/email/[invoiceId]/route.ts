// import prisma from "@/app/utils/db";
// import { requireUser } from "@/app/utils/hooks";
// import { emailClient } from "@/app/utils/mailtrap";
// import { NextResponse } from "next/server";

// export async function POST(
//   request: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ invoiceId: string }>;
//   }
// ) {
//   try {
//     const session = await requireUser();

//     const { invoiceId } = await params;

//     const invoiceData = await prisma.invoice.findUnique({
//       where: {
//         id: invoiceId,
//         userId: session.user?.id,
//       },
//     });

//     if (!invoiceData) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     const sender = {
//         email: "hello@demomailtrap.co",
//         name: "Mailtrap Test",
//       };

//     emailClient.send({
//       from: sender,
//       to: [{ email: "abhinandanbiswal16rr@gmail.com" }],
//       subject: "Reminder Invoice Payment",
//       text: "Hey you forgot to pay the invoice"
//       },
//       );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to send Email reminder" },
//       { status: 500 }
//     );
//   }
// }

//there are few works to be done in this part......mailtrap template add.....for now this is jst for demo work


import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Jan Marshal",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "jan@alenix.de" }],
      template_uuid: "e27df9eb-5d12-49f1-ab49-46d8ba78ca35",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoiceMarshal",
        company_info_address: "Chad street 124",
        company_info_city: "Munich",
        company_info_zip_code: "345345",
        company_info_country: "Germany",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
