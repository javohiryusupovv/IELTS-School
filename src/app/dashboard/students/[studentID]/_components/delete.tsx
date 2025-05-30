import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function Delete() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <MdOutlineDeleteOutline className="text-red-700 mr-6 w-5 h-5" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tarixni uchirasimi?</DialogTitle>
            <DialogDescription>
              O'qituvchini coinlar tarixini o'chirishni tasdiqlaysizmi?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="destructive"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
            >
              Yo'q
            </Button>
            <Button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md">
              Ha
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
