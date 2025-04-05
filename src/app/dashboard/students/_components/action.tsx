"use client"

import { deleteStudent } from '@/actions/student.action';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props{
    studentId: string,
    courseId: string
}

export default function Action({studentId, courseId}: Props) {
    const handleDelete = async () => {
        try {
            await toast.promise(deleteStudent(studentId, courseId, "/dashboard/students"), {
                loading: "O'chirilmoqda...",
                success: "Talaba o'chirildi",
                error: "O'chirishda xatolik",
            });
        } catch (error) {
            console.error("O'chirishda xatolik:", error);
            toast.error("O'chirishda xatolik");
        }
    };

    return (
        <button onClick={handleDelete}>
            <Trash2 className='p-1 border bg-[#d71717] cursor-pointer rounded-xl stroke-white' width={35} />
        </button>
    )
}
