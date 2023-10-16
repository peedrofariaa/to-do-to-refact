export default function Layout({children}) {
  return (
    <>
      <header className="w-full sticky top-0 px-10 py-5 text-center bg-gray-800 text-white font-bold text-2xl">
        To<span className="text-orange-200">Do</span>
      </header>

      {children}
    </>
  )
}
