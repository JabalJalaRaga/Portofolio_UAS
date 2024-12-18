"use client"
import { useState, useEffect } from 'react'
const CardItem = ({
    title,
    subTitle
})=>{
    return (
        <div className="cursor-pointer hover:drop-shadow-lg drop-shadow-md bg-[#E5E5E5] w-[310px] h-[474px]">
            <div className="flex justify-center">
                <img 
                    className="h-[300px]"
                    src="/images/artik.jpg"/>
            </div>
            <div className="p-4 bg-white h-[174px]">
                <div className="text-[18px]">{title}</div>
                <div className="text-[#767676] w-full h-[50px] text-ellipsis overflow-hidden">{subTitle}</div>
                <div className="mt-3 text-[#FFB400]">
                    Learn more
                </div>
            </div>
        </div>
    )
}
const LoadingCard=()=>{ 
    return (
        <div class="w-[310px] h-[474px] border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse ">
                <div class=" bg-slate-200 h-[300px]"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-3 bg-slate-200 rounded"></div>
                    <div class="space-y-2">
                        <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-3 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-3 bg-slate-200 rounded"></div>
                    </div>
                    <div class="h-3 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    )
}
export default function Blogs(){
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const onFetchBlogs=async()=>{
        try{
            setLoading(true)
            let res = await fetch('/api/blogs')
            let data = await res.json()
            setData(data.data)
            setLoading(false)
        }catch(err){
            console.log('err', err)
            setData([])
            setLoading(false)
        }
    }
    useEffect(() => {
        onFetchBlogs()
    }, [])
    return (
        <>
            <h2 className="text-center text-[32px] font-bold w-full">Blog</h2>
                
            <p className="text-center margin-0 mx-auto w-2/3">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. lorem ipsum
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-10">
                { isLoading && <LoadingCard/> }
                { isLoading && <LoadingCard/> }
                { isLoading && <LoadingCard/> }
                {  data.map((item, key)=><div> <CardItem 
                        className="m-5 p-4 " 
                        title={item.title}
                        subTitle={item.subTitle}
                        key={key} />
                        </div>
                    )
                }
                
               
            </div>
        </>
    );
}