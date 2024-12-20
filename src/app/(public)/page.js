import Image from 'next/image'; // Import komponen Image dari Next.js

const ItemService = ({ title, subTitle }) => {
  return (
    <div className="w-[310px] bg-white p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <div className="flex justify-center">
        {/* Menggunakan Image dari Next.js untuk optimasi gambar */}
        <Image 
          src="/images/coding.png" // Pastikan path gambar benar
          alt="Service Image" 
          width={300} // Tentukan ukuran lebar gambar
          height={200} // Tentukan ukuran tinggi gambar
          className="object-contain" // Sesuaikan gaya gambar jika diperlukan
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="font-semibold text-lg text-[#2D3748]">{title}</h3> {/* Changed title text color */}
        <span className="text-[15px] text-[#4A5568]">{subTitle}</span> {/* Changed subtitle text color */}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const myService = [
    { title: 'Web Development', subTitle: 'Blog, E-commerce' },
    { title: 'UI/UX Design', subTitle: 'Mobile App, Website Design' },
    { title: 'Sound Design', subTitle: 'Voice Over, Beat Making' },
    { title: 'Game Design', subTitle: 'Character Design, Props & Objects' },
    { title: 'Photography', subTitle: 'Portrait, Product Photography' },
    { title: 'Advertising', subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF7F50] to-[#DEB887] p-10"> {/* Changed gradient colors */}
      {/* Dashboard Container */}
      <div className="flex w-full bg-white rounded-xl shadow-lg p-10">
        {/* Left Side: Profile Information */}
        <div className="flex-1">
          <div className="font-extrabold text-[48px] mt-10 text-[#1A202C]"> {/* Changed text color */}
            <div>Saya Jabal Jala Raga</div>
            <div>
              <span className="text-[#DD6B20]">Manajemen</span> Informatika {/* Changed text color */}
            </div>
          </div>
          <p className="text-[#4A5568] mt-3">Saya adalah mahasiswa semester 5 tingkat 3 manajemen informatika yang mempunyai IPK 4.00 :^</p> {/* Changed text color */}
          <button className="mt-5 px-4 py-2 rounded-lg bg-[#DD6B20] text-white font-semibold">
            <span className="relative text-sm">Hear Me</span> {/* Fixed typo from "Here Me" to "Hear Me" */}
          </button>
        </div>

        {/* Right Side: Avatar */}
        <div className="flex justify-center items-center">
          {/* Menggunakan Image dari Next.js untuk avatar */}
          <Image 
            src="/images/pakvincent.jpg" // Pastikan path gambar benar
            alt="Avatar" 
            width={160} // Tentukan ukuran lebar gambar
            height={160} // Tentukan ukuran tinggi gambar
            className="rounded-full object-cover border-4 border-[#DD6B20]" // Menambahkan border dan styling
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-20 text-center">
        <h2 className="text-[32px] font-bold text-[#2D3748]">My Services</h2> {/* Changed header color */}
        <div className="flex justify-center text-[#4A5568] mt-4">
          <p className="w-1/2 text-center">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Lorem ipsum.</p>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-rows-2 grid-flow-col gap-6 mt-10">
        {myService.map((item, key) => (
          <ItemService
            key={key}
            title={item.title}
            subTitle={item.subTitle}
          />
        ))}
      </div>
    </div>
  );
}
