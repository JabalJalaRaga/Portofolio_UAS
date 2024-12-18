'use client'
import { useRouter } from 'next/navigation'

export default function PublicMenu() {
    const router = useRouter()

    const onLoginPage = () => {
        router.push('/login', { scroll: false })
    }

    return (
        <header className="py-4 bg-gradient-to-r from-teal-400 to-green-500 shadow-2xl">
            <nav className="w-full">
                <div className="max-w-5xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="flex flex-wrap items-center justify-between">
                        <div>
                            <a href="/" className="text-1xl font-bold text-gray-100 hover:text-gray-200 transition duration-300">
                                Jabal Jala Raga
                            </a>
                        </div>
                        <div>
                            <ul className="flex flex-row gap-6">
                                <li className="mt-1">
                                    <a className="btn-link text-gray-200 hover:text-gray-300 transition duration-300" href="/blogs">Blogs</a>
                                </li>
                                <li className="mt-1">
                                    <a className="btn-link text-gray-200 hover:text-gray-300 transition duration-300" href="/contact">Contact</a>
                                </li>
                                <li>
                                    <button
                                        className="btn-primary bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300"
                                        onClick={onLoginPage}
                                    >
                                        <span className="relative text-sm font-semibold">
                                            Login
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
