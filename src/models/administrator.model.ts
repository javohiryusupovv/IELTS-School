import { model, models, Schema } from "mongoose";

const AdminsSchema = new Schema(
    {
        fullname: { type: String, required: true},
        login: { type: String, required: true, unique: true},
        password: { type: String, required: true, unique: true},
        phone: { type: String, required: true, unique: true},
        role: { type: String, default: "administrator" },
        educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter"}
    },
    { timestamps: true }
)

const AdministratorModel = models.AdministratorModel || model("AdministratorModel", AdminsSchema);
export default AdministratorModel;