
interface Props{
  filterDay: (dayType: string)=> void,
  selectDay: string
}

export default function OddEvenDayFilter({selectDay, filterDay}: Props) {
  return (
    <div>
      <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Dars kunlari*
              <select onChange={(e)=> filterDay(e.target.value)} value={selectDay} className="text-gray-500 font-normal w-full py-2 rounded-md border">
                <option value="toq">Toq kun</option>
                <option value="juft">Juft kun</option>
              </select>
            </label>

    </div>
  )
}
