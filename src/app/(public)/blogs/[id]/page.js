"use client"
import { useState, useEffect } from 'react'
import Card from '../../../../components/card';
import { useParams } from 'next/navigation'
// Komentar
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import ConfigDialog from '../../../../components/ConfirmDialog'

export default function Blogsbyid(){
    // Komentar
    const [likedCommentId, setLikedCommentId] = useState(null);
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    // Komentar end
    const params = useParams();
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
     // Komentar
    const [datakomen, setDataKomen] = useState({
        nama:'',
        email:'',
        komentar:'',
        blogId: params.id
    });
    const [isLoadingKomentar, setLoadingKomentar]= useState(false)
    const [dataKomentar, setDataKomentar] = useState([])
    const clearData = ()=>{
        setDataKomen({
            nama:'',
            email:'',
            komentar:'',
            blogId: params.id
        })
    } 
    const inputHandler= (e) =>{
        setDataKomen({...datakomen, [e.target.name]: e.target.value })
    }
    // End Komentar

    const onFetchBlogs=async()=>{
        try{
            setLoading(true)
            let res = await fetch(`/api/blogs/${params.id}`)
            let data = await res.json()
            setData(data.data)
            setLoading(false)
        }catch(err){
            console.log('err', err)
            setData(null)
            setLoading(false)
        }
    }

    const onFetchKomentar=async()=>{
        try{
            setLoadingKomentar(true)
            let res = await fetch(`/api/komenblog/${params.id}`)
            let data = await res.json()
            setDataKomentar(data.data)
            setLoadingKomentar(false)
        }catch(err){
            console.log('err', err)
            setDataKomentar([])
            setLoadingKomentar(false)
        }
    }

    // Komentar
    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearData()
    }
    const toggleLike = (id) => {
        setLikedCommentId(prev => (prev === id ? null : id)); // Jika sama, hilangkan like; jika berbeda, set ke id baru
    };

    const [replyData, setReplyData] = useState({
        komentar: '',
        parentId: null
    });

    const handleReplyInput = (e, parentId) => {
        setReplyData({ ...replyData, komentar: e.target.value, parentId });
    };
    
    // end Komentar
    async function onSubmitReply() {
        try {
            const body = {
                komentar: replyData.komentar,
                parentId: replyData.parentId,
                blogId: params.id
            };
    
            let res = await fetch('/api/komenblog/reply', {
                method: 'POST',
                body: JSON.stringify(body),
            });
    
            let resData = await res.json();
            if (!resData.data) {
                throw Error(resData.message);
            }
            // Reset reply data
            setReplyData({ komentar: '', parentId: null });
            // Fetch comments again to update the list
            onFetchKomentar();
        } catch (err) {
            console.error("ERR", err.message);
        }
    }

    async function onSubmitData() {
        try{
            if (editorRef.current) {
                const body = datakomen
                body.komentar = editorRef.current.getContent();

                let res = await fetch('/api/komenblog', {
                    method:'POST',
                    body: JSON.stringify(body),
                })

                let resData = await res.json()
                if(!resData.data){
                throw Error(resData.message)
                }
                setModal(true)
                setModalTitle('Info')
                setModalMessage(resData.message)
            }
        }catch(err){
          console.error("ERR", err.message)
          setModal(true)
          setModalTitle('Err')
          setModalMessage(err.message)
        }
      }


    useEffect(()=>{
        onFetchBlogs()
        onFetchKomentar()
    },[])

    if(isLoading) return (<>Loading...</>)

    return (
        <>
            <div className='margin-0 mx-auto w-2/3'>
                <h2 className="text-center text-[32px] font-bold w-full">{data.title}</h2>
                <div className='mb-40 mt-10  ' dangerouslySetInnerHTML={{ __html: data.content }}/>
            </div>

            {/* Start Komentar */}
            <Card title="Tuliskan komentar">
            <div className="w-full my-5">
                <label>Nama</label>
                    <input 
                        name='nama'
                        value={datakomen.nama}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Email</label>
                    <input 
                        name='email'
                        value={datakomen.email}
                        onChange={inputHandler}
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Komentar</label>
                <Editor
                    id='komentar'
                    apiKey='hz9os6h0p1826jcqknks4q1fm8yl9khctaa7nmexkf0rnx2e'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={datakomen.komentar}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <button  className="btn-primary" onClick={onSubmitData}>
                <span className="relative text-sm font-semibold text-white">
                    Kirim
                </span>
            </button>
        </Card>
        
        {/* KOMENTAR */}
        {
    dataKomentar.map((komen, idx) => (
        <Card className="mt-5" key={idx} title={komen.nama}>
            <div dangerouslySetInnerHTML={{ __html: komen.komentar }} />
            <button 
                onClick={() => toggleLike(komen.id)} 
                className={`flex items-center mt-2 ${likedCommentId === komen.id ? 'text-red-500' : 'text-gray-500'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="ml-1">{likedCommentId === komen.id ? 'Liked' : 'Like'}</span>
            </button>

            {/* Input Balasan */}
            <div className="mt-2">
                <input 
                    type="text" 
                    placeholder="Balas komentar..." 
                    value={replyData.parentId === komen.id ? replyData.komentar : ''} 
                    onChange={(e) => handleReplyInput(e, komen.id)} 
                    className="w-full border my-input-text"
                />
                <button onClick={onSubmitReply} className="btn-primary mt-1">
                <span className="relative text-sm font-semibold text-white">Balas</span>
                </button>
            </div>
        </Card>
    ))
}
        

        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onCancel()} 
            isOkOnly={true} />
        {/* End Komentar */}
        </>
    );
}