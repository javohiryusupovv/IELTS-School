import { model, models, Schema } from "mongoose";



const ShopSchema = new Schema(
    {
        title: String,
        description: String,
        price: Number,
        image: String,
        activeProduct: {type: Boolean, default: false},
        educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter"},
    },
    {timestamps:true}
)


const Shop = models.Shop || model("Shop", ShopSchema);

export default Shop