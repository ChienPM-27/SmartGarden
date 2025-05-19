
export const GEMINI_API_KEY = 'AIzaSyDRz9pmdBoj3WZI_mopr5DG0AB1x9bTMbM';


export const DEFAULT_MODEL = 'gemini-2.0-flash';

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