import { Schema, model, models } from "mongoose";


const PaymentQushish = new Schema({
    educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter", required: true },
    managerName: String, 
    markazTitle: String,
    lastPayment: String,
    cashStatus: { type: String, enum: ["pending", "success"]},
    cashType: String

  }, {timestamps: true});
  
  const PaymentAdd = models.PaymentAdd || model("PaymentAdd", PaymentQushish);
  export default PaymentAdd;
  