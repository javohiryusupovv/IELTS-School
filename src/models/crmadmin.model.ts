import { model, models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const CrmSchema = new Schema(
    {
        fullname: { type: String, required: true},
        login: { type: String, required: true},
        password: { type: String, required: true, unique: true},
        phone: { type: String, required: true},
        role: {type: String, enum: ['owner', 'adminstrator'], required: true },
    },
    { timestamps: true }
)

const CrmAccount = models.CRMAccounts || model("CRMAccounts", CrmSchema);
export default CrmAccount;