
function Profile() {
    const user = "Yusupov Javohir"
  return (
    <div className="flex items-center gap-3">
        <p className="text-[20px] hidden sm:flex">Salom, <span className="font-bold">{user}!</span></p>
        <article className="w-[50px] h-[50px] rounded-full bg-yellow-500"></article>
    </div>
  )
}

export default Profile
