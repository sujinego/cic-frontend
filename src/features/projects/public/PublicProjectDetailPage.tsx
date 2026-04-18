import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicProject } from "../../../api/project.api.ts";
import { optimizeImage } from "../../../utils/imageUtils.ts"; // 분리한 함수 사용

export default function PublicProjectDetailPage() {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = project?.imageUrls || [];

    useEffect(() => {
        if (!projectId) return;
        getPublicProject(Number(projectId))
            .then(res => setProject(res.data))
            .catch(err => console.error("데이터 로딩 실패:", err));
    }, [projectId]);

    if (!project) return <div className="flex h-screen items-center justify-center">로딩중...</div>;
    if (!images || images.length === 0) return <div className="p-10 text-center">이미지 없음</div>;

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full h-screen overflow-hidden bg-white flex justify-center">
            <section className="h-full flex flex-col pt-8 md:pt-14 w-full max-w-[1200px] mx-auto">

                {/* 모바일 영역: 스크롤 최적화 */}
                <div className="block md:hidden space-y-4 overflow-y-auto h-full px-4">
                    {images.map((img: string, index: number) => (
                        <img
                            key={index}
                            src={optimizeImage(img, 800)} // 모바일은 조금 더 작게 최적화
                            className="w-full object-cover rounded-sm"
                            alt="mobile-img"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    ))}
                </div>

                {/* 웹 슬라이드 영역 */}
                <div className="hidden md:flex relative flex-1 w-full max-h-[75vh] items-center justify-center bg-zinc-50 overflow-hidden group rounded-md">
                    {/* 메인 이미지 */}
                    <img
                        src={optimizeImage(images[currentIndex], 1600)}
                        className="w-full h-full object-contain transition-all duration-500"
                        alt={`Project Image ${currentIndex + 1}`}
                        fetchPriority="high"
                    />

                    {/* 왼쪽 화살표 (이미지 안쪽 오버레이) */}
                    <button
                        onClick={handlePrev}
                        // absolute로 이미지 위에 띄움. 좌측 끝에서 약간 띄움(left-4)
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                               p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               hover:bg-black/10 rounded-full text-zinc-900/60 hover:text-zinc-900"
                        aria-label="Previous"
                    >
                        <span className="text-5xl font-extralight">{"<"}</span>
                    </button>

                    {/* 오른쪽 화살표 (이미지 안쪽 오버레이) */}
                    <button
                        onClick={handleNext}
                        // absolute로 이미지 위에 띄움. 우측 끝에서 약간 띄움(right-4)
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                               p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               hover:bg-black/10 rounded-full text-zinc-900/60 hover:text-zinc-900"
                        aria-label="Next"
                    >
                        <span className="text-5xl font-extralight">{">"}</span>
                    </button>

                    {/* 페이지 인디케이터 (선택사항: 현재 몇번째인지 표시) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 text-white px-3 py-1 rounded-full text-xs z-20">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* 하단 프로젝트 정보 */}
                <div className="mt-6 mb-10 text-right px-2 md:px-0 w-full">
                    <p className="text-xl font-bold text-zinc-900 tracking-tighter">
                        {project.projectCode}.
                    </p>
                    {/* leading-relaxed로 줄간격 조절, uppercase로 깔끔하게 */}
                    <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest leading-relaxed">
                        Work scope: schematic design, <br className="md:hidden" /> working design, construction
                    </p>
                </div>
            </section>
        </div>
    );
}