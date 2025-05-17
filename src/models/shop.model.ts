import { model, models, Schema } from "mongoose";



const ShopSchema = new Schema(
    {
        educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter", required: true },
        title: String,
        description: String,
        price: Number,
        image: String,
        activeProduct: {type: Boolean, default: false},
    },
    {timestamps:true}
)


const Shop = models.Shop || model("Shop", ShopSchema);

export default Shop