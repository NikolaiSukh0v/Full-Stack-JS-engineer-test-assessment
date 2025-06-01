import { NextResponse } from "next/server";
import axios from 'axios'
export async function GET(request) {
    axios.get('http://localhost:3000/recipes/')
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}