import mongoose from "mongoose";

const { Schema } = mongoose;

const reportSchema = new Schema(
  { 
    doctorsID : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    patientName: {
      type: String,
      required: true
    },

    Image1: {
      data: Buffer,
      contentType: String,
    },

    Image2: {
        data: Buffer,
        contentType: String
    },

    Diagnosis:{
        type: String
    }
  },
  {timestamps: true}
)

export default mongoose.models.Report || mongoose.model("Report", reportSchema)