'use client'

import { useTestQuery } from "./test-api-slice"

export const TestQuery=()=>{
    const {data}=useTestQuery(undefined)
    console.log(data)
    return <div>
        TestQuery
    </div>
}