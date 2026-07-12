import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/middlewares/ratelimit";
import { NextResponse } from "next/server";

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

    const result = await db.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if(result.rows.length===0){

        console.log('Usuário não encontrado')

        return Response.json({
            error:"Usuário não encontrado"
        });

    }

    const user=result.rows[0];

    console.log(user)

    const ok=await bcrypt.compare(password,user.password);

    if(!ok){

        console.log('senha incorreta')
        return Response.json({
            error:"Senha incorreta"
        });

    }

    const token=jwt.sign({

        id:user.id,
        email:user.email

    },process.env.JWT_SECRET!,{

        expiresIn:"7d"

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

export const runtime = "nodejs";