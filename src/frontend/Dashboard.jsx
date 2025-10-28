import AnnouncementBar from "./components/AnnouncementBar";

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-[80vh] px-4">
      <h2 className="text-5xl font-extrabold text-orange-600 mb-4">
        Welcome to our store!
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Are you ready to shop now?
      </p>
      <button className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition">
        Shop Now
      </button>

      <div class = "w-full text-white overflow-hidden py-2 mt-8">
        <div class="whitespace-nowrap animate-scroll-left">
          <AnnouncementBar />
        </div>
      </div>
    </div>
  );
}