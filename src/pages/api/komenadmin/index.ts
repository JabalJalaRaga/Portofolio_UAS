import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
        case "POST":
            try{
                // const body = req.body
                const body = JSON.parse(req.body)
                if(typeof body !== "object"){
                    throw new Error('invalid request')
                }
                
                if( body.balaskomen == ""){
                    throw new Error('title is required')
                }

                let komenadmin = await db.collection("komenadmin").insertOne(body);
                res.status(200).json({ data: komenadmin, message:'data berhasil di simpan' });

            }catch(err){
                res.status(422).json({ message: err.message});
            }
            break;
        default:
            const blogsDataBalasKomen = await db.collection("komenadmin").find({}).toArray();
            res.json({ data: blogsDataBalasKomen });
        break;
    }
}