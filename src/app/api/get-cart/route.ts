import { NextResponse } from 'next/server';
import { CartProductI } from '../../_interfaces/cartProductI';
import { getUserToken } from '@/Helpers/getUserToken';
export async function GET() {
    const token = await getUserToken();
     const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{
                    token:token!
                }
            })
    const data:CartProductI = await res.json()
    return NextResponse.json(data);
}