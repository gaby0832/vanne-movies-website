import { compare } from "bcrypt-ts";
import { getDb } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/middlewares/ratelimit";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";

export async function POST(req: Request){
  const {
    email,
    password,
    turnstileToken,
  } = await req.json();

  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  
    const limit = 15;
    const interval = 60000; 
  
    const { success, remaining } = checkRateLimit(ip, limit, interval);
  
    if (!success) {
      return NextResponse.json(
        { message: "Too many requests, please try again later." },
        { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
      );
    }
  
  if(process.env.NODE_ENV == "production"){

  const valid = await verifyTurnstile(turnstileToken);

    if (!valid) {
      return Response.json(
        {
          error: "Falha na verificação do Turnstile.",
        },
        {
          status: 400,
        }
      );
    }
    
  }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await getDb()`
    SELECT *
    FROM users
    WHERE email = ${email}
    `;

    if(result.length===0){

        console.log('Usuário não encontrado')

        return Response.json({
            error:"Usuário não encontrado"
        });

    }

    const user=result[0];


    const ok = await compare(password,user.password);

    if(!ok){

        console.log('senha incorreta')
        return Response.json({
            error:"Senha incorreta"
        });

    }

    const token = await createToken({
  id: user.id,
  email: user.email,
});

     const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    await console.log(token)

    return Response.json({
        success: true,
    });

}

export const runtime = "edge";