import mongoose, { Document, Schema } from 'mongoose';

interface IUploadedImage {
    frontImage: string;
    backImage: string;
    uploadDate: Date;
    ocrResult: mongoose.Types.ObjectId;
}

const UploadedImageSchema = new Schema({
    frontImage: {
        type: String,
        required: true
    },
    backImage: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    ocrResult: { type: Schema.Types.ObjectId, ref: 'OCRResult', required: true }
});

const UploadedImageModel = mongoose.model<IUploadedImage & Document>('UploadedImage', UploadedImageSchema);

export default UploadedImageModel