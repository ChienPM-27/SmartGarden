// Cấu hình API key cho Google Gemini AI
// Thay thế bằng API key của bạn từ Google AI Studio
export const GEMINI_API_KEY = 'AIzaSyDRz9pmdBoj3WZI_mopr5DG0AB1x9bTMbM';

// Tên model - sử dụng model đơn giản hơn để giảm quota
export const DEFAULT_MODEL = 'gemini-1.0-pro-vision'; // Thay vì gemini-1.5-pro

// Cấu hình khác
export const CONFIG = {
    MAX_TOKENS: 1024, // Giảm số token tối đa
    TEMPERATURE: 0.7,
};

// Prompt template ngắn gọn hơn để tiết kiệm token
export const PROMPT_TEMPLATES = {
    TEXT_ONLY: 'Hãy trả lời ngắn gọn về cây trồng: {query}',
    IMAGE_WITH_TEXT: 'Phân tích ảnh cây trồng này. {query}',
    IMAGE_ONLY: 'Phân tích ảnh cây trồng này và cho lời khuyên.'
};

// Cấu hình cho fallback local AI (nếu có)
export const USE_FALLBACK_AI = true;