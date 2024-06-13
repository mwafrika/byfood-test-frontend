"use client";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <main className="relative h-screen flex items-center justify-center bg-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/library.jpg"
          alt="Library"
          className="object-cover w-full h-full opacity-50"
        />
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Library</h1>
        <p className="text-xl mb-8">
          Discover a world of knowledge and information. Explore our vast
          collection of books and resources.
        </p>
        <button
          onClick={handleDashboardRedirect}
          className="bg-primary text-white py-2 px-6 rounded text-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
};

export default LandingPage;
