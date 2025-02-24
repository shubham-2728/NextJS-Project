import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // ✅ Get session to verify authentication
        const session = await getServerSession(authOptions); // ❌ Don't pass req

        if (!session || !session.user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // ✅ Process form data correctly
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return new Response(JSON.stringify({ error: "No file provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const text = await file.text(); // ✅ Extract text from file

        // ✅ Store extracted text in the database
        const newDocument = await prisma.document.create({
            data: {
                userEmail: session.user.email,
                originalText: text,
            },
        });

        return new Response(JSON.stringify({ message: "File uploaded", document: newDocument }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Upload error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
