import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { checkRateLimit } from "@/lib/middlewares/ratelimit";

export async function GET(req: Request) {
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


  const user = await getCurrentUser();

  return NextResponse.json(user);
}


export const runtime = "edge";