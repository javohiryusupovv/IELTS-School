import { model, models, Schema } from "mongoose";



const ShopSchema = new Schema(
    {
        title: String,
        description: String,
        price: Number,
        image: String,
        totalQuantity: { type: Number, default: 0 },
        remainingQuantity: { type: Number, default: 0 },
        educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter"},
    },
    {timestamps:true}
)


const Shop = models.Shop || model("Shop", ShopSchema);

export default Shop