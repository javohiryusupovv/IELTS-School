import { model, models, Schema } from "mongoose";



const ShopSchema = new Schema(
    {
        title: String,
        description: String,
        price: Number,
        image: String,
        activeProduct: Boolean
    },
    {timestamps:true}
)


const Shop = models.Shop || model("Shop", ShopSchema);

export default Shop