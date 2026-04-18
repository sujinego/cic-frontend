/**
 * Cloudinary 이미지 최적화 함수
 * @param url 원본 이미지 URL
 * @param width 원하는 이미지 너비 (기본값 1920)
 */
export const optimizeImage = (url?: string, width: number = 1920) => {
    if (!url) return "";
    if (!url.includes("/upload/")) return url;

    // dpr_auto: 사용자 기기 화질에 맞춤
    // f_auto: 최적 포맷(WebP 등) 변환
    // q_auto:good: 화질과 용량의 최적 밸런스
    return url.replace(
        "/upload/",
        `/upload/f_auto,q_auto:good,w_${width},c_limit,dpr_auto/`
    );
};