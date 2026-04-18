export default function ContactPage() {
    return (
        <div className="px-4 md:px-16 py-12 md:py-12 space-y-12 md:space-y-16">

            {/* 제목 */}
            <section className="text-center space-y-3 md:space-y-4">
                <h1 className="text-2xl md:text-3xl font-light tracking-wide">
                    CONTACT
                </h1>
                <p className="text-sm md:text-base text-gray-500">
                    공간 상담을 신청해보세요
                </p>
            </section>

            {/* 문의 폼 */}
            <section className="max-w-xl mx-auto space-y-4">

                <input
                    placeholder="이름"
                    className="w-full border border-gray-300 p-3 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <input
                    placeholder="연락처"
                    className="w-full border border-gray-300 p-3 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <input
                    placeholder="주소"
                    className="w-full border border-gray-300 p-3 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <input
                    placeholder="예상 공사 시기"
                    className="w-full border border-gray-300 p-3 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <textarea
                    placeholder="문의 내용"
                    className="w-full border border-gray-300 p-3 rounded-md h-40
                    focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <button
                    className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-md
                    hover:bg-gray-800 active:scale-[0.98] transition"
                >
                    상담 문의하기
                </button>

            </section>

        </div>
    );
}