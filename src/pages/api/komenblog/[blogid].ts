import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
    const idParam:string = req?.query?.blogid as string || ''
    const id = new ObjectId(idParam);

    switch (req.method) {  
        case "GET":
            try{
                const komenblog = await db.collection("komenblog")
                    .find({ blogId: idParam }).toArray();
                res.json({ data: komenblog });
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
        // case "PUT":
        //     try{
        //         const filter = {_id: id }
        //         const body = JSON.parse(req.body)
        //         // const body = req.body
        //         const updateDoc = {
        //             $set: {
        //                 komentar: body.komentar,
        //                 email: body.email,
        //                 nama: body.nama
        //             },
        //           };
        //         console.log('filter',filter)
        //         const komenblog = await db.collection("komenblog")
        //                 .updateOne(filter, updateDoc, { upsert: true })

        //         res.status(200).json({data:[komenblog], message: 'data berhasil di perbaharui'});
        //     }catch(err){
        //         res.status(422).json({ message: err.message});
        //     }
        // break;
        case "DELETE":
            try{
                const resDelete = await db.collection("komenblog").deleteOne({
                    _id: id
                })

                if(resDelete.deletedCount < 1){
                    throw new Error('data tidak ditemukan')
                }

                res.json({ data: [resDelete], message:"data berhasil dihapus" });
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
        default:
            const education = await db.collection("komenblog")
                .findOne({ _id: id })
            res.json({ data: education });
        break;
    }
}