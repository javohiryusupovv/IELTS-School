// models/purchase.model.ts
import { Schema, model, models } from "mongoose";

const PurchaseSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Purchase = models.Purchase || model("Purchase", PurchaseSchema);
export default Purchase;
