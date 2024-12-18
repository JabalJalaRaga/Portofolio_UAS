"use client"
import Card from '../../../../components/card';
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react';
import ConfigDialog from '../../../../components/ConfirmDialog'

export default function BalasKomen() {
  const editorRef = useRef(null);
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [dataKomentar, setDataKomentar] = useState([])
  const [data, setData] = useState({
      balaskomen:'',
  });

  const clearData = ()=>{
    setData({
      balaskomen:'',
    })
  }
  const onCancel=()=>{
    setModal(false)
    setModalTitle('')
    setModalMessage('')
    clearData()
  }
  async function onSubmitData() {
    try{
        if (editorRef.current) {
            const body = data
            body.balaskomen = editorRef.current.getContent();

            let res = await fetch('/api/komenadmin', {
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


  return (
    <>
      <Card title="Balas Komentar Netizen">
      <div className="w-full my-2">
        <label>Content</label>
        <Editor
                    id='balaskomen'
                    apiKey='hz9os6h0p1826jcqknks4q1fm8yl9khctaa7nmexkf0rnx2e'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={data.balaskomen}
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
              Save Data
          </span>
        </button>
        </Card>

        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onCancel()} 
            isOkOnly={true} />
    </>
  );
}
