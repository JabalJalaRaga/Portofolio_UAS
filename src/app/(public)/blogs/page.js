'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';  // Import komponen Image dari Next.js

const CardItem = ({ title }) => {
  return (
    <div className="cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 w-[280px] rounded-lg">
      <div className="flex justify-center">
        {/* Ganti dengan Image component untuk optimasi */}
        <Image 
          className="h-[120px] w-[120px] rounded-full border-4 border-white shadow-lg" 
          src="/images/icon.png" 
          alt="Icon image"  // Menambahkan alt untuk aksesibilitas
          width={120}  // Tentukan ukuran gambar
          height={120}  // Tentukan ukuran gambar
        />
      </div>
      <div className="p-4 bg-white rounded-b-lg shadow-md">
        <div className="text-lg font-semibold text-gray-800 truncate">{title}</div>
      </div>
    </div>
  )
}

export default function Blogs() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onFetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs');
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();
      setData(data.data);
      setError(false); // Reset error state
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setData([]);
      setError(true); // Set error state if failed
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onFetchBlogs();
  }, []);  // Hanya dijalankan sekali saat component mount

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    router.push(`/search?query=${searchTerm}`);
  }, [searchTerm, router]);  // Menggunakan useCallback agar tidak membuat fungsi baru setiap render

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-indigo-400 p-8">
      <h2 className="text-center text-5xl font-extrabold w-full mt-24 text-yellow-600 hover:text-yellow-400 transition duration-300 ease-in-out">
        Web Blog JABAL
      </h2>

      <p className="text-center text-lg mx-auto w-3/5 mt-4 text-gray-600">
        Cari artikel yang anda inginkan
      </p>

      {/* Start Search Box */}
      <form onSubmit={handleSearchSubmit} className="flex items-center justify-center my-6 bg-white rounded-lg shadow-xl p-2 w-full max-w-lg mx-auto">
        <input 
          type="search" 
          name="blogsearch"
          className="block w-full p-4 text-lg text-gray-900 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="Search blogs..."
          onChange={(e) => setSearchTerm(e.target.value)}
          required 
        />
      </form>
      {/* End Search Box */}

      {isLoading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : isError ? (
        <div className="text-center text-xl text-red-500">Failed to load blogs. Please try again later.</div>
      ) : (
        <div className="flex justify-center gap-12 flex-wrap mt-10">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div 
                key={item._id}  // Gunakan ID unik sebagai key
                onClick={() => router.push(`/blogs/${item._id}`)} 
              > 
                <CardItem 
                  title={item.title}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500">No blogs found for &quot;{searchTerm}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
}
