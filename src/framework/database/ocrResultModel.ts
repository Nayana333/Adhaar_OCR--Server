import mongoose, { Document, Schema } from 'mongoose';

interface IOCRResult {
    aadhaarNumber: string;
    name: string;
    dob: string;
    address: string;
    gender: string;
}

const OCRResultSchema = new Schema({
    aadhaarNumber:
    {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    dob:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    gender:
    {
        type: String,
        required: true
    },
});

 const OCRResultModel = mongoose.model<IOCRResult & Document>('OCRResult', OCRResultSchema);

 export default OCRResultModel
