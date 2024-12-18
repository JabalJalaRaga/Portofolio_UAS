'use client'
import Card from '../../../../components/card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfigDialog from '../../../../components/ConfirmDialog'

export default function AdminMessage() {
    const router = useRouter();
    const [modal, setModal] = useState(false)
    const [messages, setMessage] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [isOkOnly, setIsOkOnly] = useState(true)
    const [deleteId, setDeleteId] = useState(null)

    const onConfirmDelete=(id)=>{
        setDeleteId(id)
        setIsOkOnly(false)
        setModalTitle('Confirm')
        setModalMessage('Apakah and yakin ingin menghapus data ini?')
        setModal(true)
    }

    const onCancel=()=>{
        setModal(false)
    }

    const onConfirmOk= async ()=>{
        try{
            const res = await fetch(`/api/komenblog/${deleteId}`,{method:'DELETE'});
            let responseData = await res.json()

            setIsOkOnly(true)
            setModalTitle('Info')
            setModalMessage(responseData.message)
            setModal(true)
            fetchData()
        }catch(err){
            console.error("ERR", err.message)
            setModal(true)
            setModalTitle('Err')
            setModalMessage(err.message)
        }

    }

    const fetchData = async ()=>{
        try{
            const res = await fetch('/api/komenblog');
            let responseData = await res.json()
            setMessage(responseData.data)

        }catch(err){
            console.error("ERR", err.message)
            setModal(true)
            setModalTitle('Err')
            setModalMessage(err.message)
        }
    }
    
    const gotoEditPage=()=>{
        router.push('/admin/balas')
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
      <>
        <Card title="List of Message" style="mt-5">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>#No</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Name</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Email</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Message</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Action</th>
                    </tr>
                </thead>
                <tbody>
                { messages.map((item, key)=>{
                        return (
                        <tr key={key} className='border-b border-blue-gray-50 '>
                            <td className='p-2 text-center'>{key+1}</td>
                            <td className='p-2 '>{item.nama} </td>
                            <td className='p-2 '>{item.email} </td>
                            <td className='p-2 '>{item.komentar} </td>
                            <td className='p-2 '>
                                <div className="inline-flex text-[12px]">
                                    <button className=" bg-green-300 hover:bg-green-400 text-gray-800 py-2 px-4 rounded-l">
                                        Detail
                                    </button>
                                    <button 
                                        onClick={()=>gotoEditPage()}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4">
                                        Balas
                                    </button>
                                    <button 
                                        onClick={()=>onConfirmDelete(item._id)}
                                        className="bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-4 rounded-r">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </Card>
        

        <ConfigDialog  
                    onOkOny={()=>onCancel()} 
                    showDialog={modal}
                    title={modalTitle}
                    message={modalMessage}
                    onCancel={()=>onCancel()} 
                    onOk={()=>onConfirmOk()} 
                    isOkOnly={isOkOnly} />
      </>
    );
}
  