
import "./loading.css"

export default function Loading() {
  return (
    <div className="fixed left-1/2 top-1/2 flex justify-center items-center w-full h-screen bg-white/65 -translate-y-1/2 -translate-x-1/2 transition-all duration-300">
        <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}
