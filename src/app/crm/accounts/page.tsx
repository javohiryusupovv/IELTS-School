import DialogsModal from "../components/Modal";
import TableUsers from "../components/TableUsers";

export default function page() {
  return (
    <div className="w-11/12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-medium text-orange-500">
          LC accounts
        </h1>
        <DialogsModal />
      </div>
      <TableUsers/>
    </div>
  );
}
