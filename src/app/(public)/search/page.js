"use client"
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Search() {
    const params = useParams();
    const [data, setData] = useState(null)

    const onFetchBlogs=async()=>{
        try{
            setLoading(true)
            let res = await fetch(`/api/blogs/${params.id}`)
            let data = await res.json()
            setData(data.data)
        }catch(err){
            console.log('err', err)
            setData(null)
        }
    }

    useEffect(()=>{
        onFetchBlogs()
    },[])

    return (
        <div className='margin-0 mx-auto w-2/3'>
        <h2 className="text-center text-[32px] font-bold w-full">{data}</h2>
        <div className='mb-40 mt-10  ' dangerouslySetInnerHTML={{ __html: data}}/>
    </div>
    );
}
  