"use client";

import { postShop } from "@/actions/shop.action";
import { supabase } from "@/lib/supabase";
import { ImagePlus } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function CardAddProduct() {
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null);
  const [prevImg, setPrevImg] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null); // 🆕 Faylni saqlaymiz

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPrevImg(preview);
    setImageFile(file); // 🆕 Faylni saqlaymiz
  };

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    let imageUrl: string | undefined;

    if (imageFile) {
      const filePath = `${Date.now()}_${imageFile.name}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, imageFile);

      if (error) {
        console.error("❌ Rasmni yuklashda xatolik:", error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData?.publicUrl;
    }

    const product = {
      title: data.get("title") as string,
      description: data.get("description") as string,
      price: Number(data.get("price")),
      image: imageUrl || "",
      activeProduct: false,
    };

    await toast.promise(
      postShop({...product,_id: ""}, pathname), {
      loading: "Mahsulot yuklanmoqda...",
      success: "Mahsulot yuklandi!",
      error: "Mahsulot yuklanmadi!",
    }
    )
    setPrevImg("");
    form.reset()
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmitProduct} className="flex gap-6">
        <article className="w-[400px]">
          {/* title */}
          <label className="flex flex-col gap-2 mb-4">
            <p>
              title <span className="text-red-600">*</span>
            </p>
            <input
              name="title"
              type="text"
              className="px-3 py-2 outline-none rounded-md border focus:border-orange-600"
              placeholder="namuna: Keyboard keychrone k900..."
            />
          </label>

          {/* description */}
          <label className="flex flex-col gap-2 mb-4">
            <p>
              description <span className="text-red-600">*</span>
            </p>
            <input
              name="description"
              type="text"
              className="px-3 py-2 outline-none rounded-md border focus:border-orange-600"
              placeholder="namuna: mexanik klaviatura, rangi qora, simli..."
            />
          </label>

          {/* price */}
          <label className="flex flex-col gap-3 mb-6">
            <p>
              price <span className="text-red-600">*</span>
            </p>
            <input
              name="price"
              type="text"
              className="px-3 py-2 outline-none rounded-md border focus:border-orange-600"
              placeholder="namuna: 200 (coin)"
            />
          </label>

          <button className="px-6 py-2 border rounded-md bg-orange-500 text-white font-medium hover:bg-orange-500/80 hover:border-transparent transition-all duration-200">
            Submit
          </button>
        </article>

        {/* Image preview */}
        <div
          onClick={handleClick}
          className={`group w-[250px] h-[250px] mt-5 border flex justify-center items-center flex-col rounded-md overflow-hidden cursor-pointer ${prevImg
              ? ""
              : "hover:border-[#00b7ff49] hover:shadow-blue-300 hover:shadow-sm"
            }`}
        >
          {prevImg ? (
            <img
              src={prevImg}
              alt="Mahsulot rasmi"
              className="w-full h-full object-cover cursor-not-allowed"
            />
          ) : (
            <>
              <ImagePlus className="w-10 h-10 stroke-1 stroke-gray-600 mb-3 group-hover:stroke-blue-300" />
              <p className="text-[12px] font-normal group-hover:text-blue-300">
                Mahsulot rasmini yuklang
              </p>
            </>
          )}
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </form>
    </div>
  );
}
