export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
      <div className="flex items-center text-9xl font-bold">
        <span>4</span>
        <div className="relative w-32 h-32">
          <img src="/cat-404.jpeg" alt="0" className="object-cover w-full h-full rounded-full" />
        </div>
        <span>4</span>
      </div>
      <p className="mt-4 text-lg text-gray-600">Oops... looks like you got lost</p>
      <div className="mt-6 bg-gray-900 text-white rounded-md p-2" onClick={() => (window.location.href = "/")}>
        Back to Home
      </div>
    </div>
  )
}