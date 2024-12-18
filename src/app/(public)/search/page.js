"use client"
import { useParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

export default function Search() {
    const params = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Mendefinisikan onFetchBlogs sebagai useCallback agar tidak berubah antar render
    const onFetchBlogs = useCallback(async () => {
        try {
            setLoading(true)
            let res = await fetch(`/api/blogs/${params.id}`)
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            let data = await res.json()
            setData(data.data) // Asumsi bahwa `data.data` adalah data yang kamu inginkan
        } catch (err) {
            console.error('Error:', err)
            setError(err.message)
            setData(null)
        } finally {
            setLoading(false)
        }
    }, [params.id]) // Masukkan params.id ke dalam dependency array

    useEffect(() => {
        onFetchBlogs()
    }, [onFetchBlogs]) // Memasukkan onFetchBlogs sebagai dependency

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='margin-0 mx-auto w-2/3'>
            <h2 className="text-center text-[32px] font-bold w-full">{data ? data.title : 'Blog not found'}</h2>
            <div className='mb-40 mt-10' dangerouslySetInnerHTML={{ __html: data ? data.content : '' }} />
        </div>
    );
}
