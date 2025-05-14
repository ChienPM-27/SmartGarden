import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import * as FileSystem from 'expo-file-system';
import { GEMINI_API_KEY, DEFAULT_MODEL, PROMPT_TEMPLATES } from './api/gemini';

// Khởi tạo Google Generative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Cấu hình retry và rate limiting
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 2000; // 2 giây

// Chuyển đổi hình ảnh thành Base64
export const getImageAsBase64 = async (uri: string): Promise<string> => {
    try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    } catch (error) {
        console.error('Lỗi khi chuyển đổi hình ảnh:', error);
        throw error;
    }
};

// Hàm xác định MIME type từ URI của hình ảnh
export const getMimeType = (uri: string): string => {
    const extension = uri.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'webp':
            return 'image/webp';
        case 'heic':
            return 'image/heic';
        default:
            return 'image/jpeg'; // Mặc định
    }
};

// Hàm sleep để đợi giữa các lần retry
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm lấy thời gian retry từ thông báo lỗi (nếu có)
const getRetryDelay = (error: any): number => {
    try {
        const errorMessage = error.message || '';
        const retryDelayMatch = errorMessage.match(/retryDelay":"(\d+)s"/);
        if (retryDelayMatch && retryDelayMatch[1]) {
            // Chuyển đổi giây thành milli giây và thêm buffer
            return (parseInt(retryDelayMatch[1]) * 1000) + 500;
        }
    } catch (e) {
        console.log('Không thể parse retry delay từ lỗi');
    }
    return INITIAL_RETRY_DELAY;
};

// Hàm kiểm tra nếu lỗi do vượt quá quota
const isQuotaExceededError = (error: any): boolean => {
    const errorMessage = error.message || '';
    return errorMessage.includes('quota') || 
           errorMessage.includes('429') || 
           errorMessage.includes('rate limit');
};

// Xử lý fallback khi không thể kết nối với Gemini
export const getFallbackResponse = (query: string): string => {
    // Một số câu trả lời cơ bản cho các trường hợp phổ biến
    const fallbackResponses: Record<string, string> = {
        'chào': '🌱 SmartBot: Xin chào! Tôi là SmartBot của ứng dụng SmartGarden. Tôi có thể giúp gì cho bạn về cây trồng và vườn của bạn?',
        'hello': '🌱 SmartBot: Xin chào! Tôi là SmartBot của ứng dụng SmartGarden. Tôi có thể giúp gì cho bạn về cây trồng và vườn của bạn?',
        'hi': '🌱 SmartBot: Xin chào! Tôi là SmartBot của ứng dụng SmartGarden. Tôi có thể giúp gì cho bạn về cây trồng và vườn của bạn?',
        'cảm ơn': '🌱 SmartBot: Không có gì! Rất vui khi được giúp đỡ bạn. Nếu có thắc mắc gì thêm, đừng ngại hỏi nhé!',
        'thanks': '🌱 SmartBot: Không có gì! Rất vui khi được giúp đỡ bạn. Nếu có thắc mắc gì thêm, đừng ngại hỏi nhé!',
        'tưới cây': '🌱 SmartBot: Để tưới cây hiệu quả, bạn nên tưới vào buổi sáng sớm hoặc chiều muộn. Luôn kiểm tra độ ẩm của đất trước khi tưới để tránh tưới quá nhiều nước.',
        'phân bón': '🌱 SmartBot: Cây trồng cần được bón phân định kỳ. Phân hữu cơ thường an toàn hơn phân hóa học. Hãy tuân theo hướng dẫn liều lượng trên bao bì.',
        'sâu bệnh': '🌱 SmartBot: Kiểm tra cây thường xuyên để phát hiện sâu bệnh sớm. Các biện pháp tự nhiên như xà phòng, dầu neem hoặc các loài thiên địch có thể giúp kiểm soát sâu bệnh.',
    };

    // Tìm từ khóa phù hợp trong câu hỏi
    const lowercaseQuery = query.toLowerCase();
    for (const keyword in fallbackResponses) {
        if (lowercaseQuery.includes(keyword)) {
            return fallbackResponses[keyword];
        }
    }

    // Phản hồi mặc định
    return '🌱 SmartBot: Hiện tại tôi đang gặp khó khăn trong việc kết nối với dịch vụ. Tôi có thể giúp gì cho bạn về các vấn đề cơ bản như tưới cây, phân bón, hoặc phòng trừ sâu bệnh?';
};

// Kết nối và nhận phản hồi từ Gemini AI với cơ chế retry
export const getAIResponse = async (userText: string, imageUri?: string): Promise<string> => {
    let retries = 0;
    let lastError = null;

    while (retries < MAX_RETRIES) {
        try {
            // Nếu đây không phải lần thử đầu tiên, đợi một khoảng thời gian
            if (retries > 0) {
                const delayTime = lastError && isQuotaExceededError(lastError) 
                    ? getRetryDelay(lastError)
                    : INITIAL_RETRY_DELAY * Math.pow(2, retries - 1); // Exponential backoff
                
                console.log(`Đang thử lại lần ${retries + 1} sau ${delayTime}ms...`);
                await sleep(delayTime);
            }

            // Cấu hình model
            const model = genAI.getGenerativeModel({
                model: DEFAULT_MODEL,
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                ],
            });

            let result;
            
            // Xử lý khi có cả hình ảnh và văn bản
            if (imageUri) {
                // Chuyển đổi hình ảnh sang base64
                const base64Image = await getImageAsBase64(imageUri);
                const mimeType = getMimeType(imageUri);
                
                // Tạo nội dung đa phương tiện
                const imagePart = {
                    inlineData: {
                        data: base64Image,
                        mimeType: mimeType,
                    },
                };
                
                // Sử dụng prompt template phù hợp
                const prompt = userText.trim() 
                    ? PROMPT_TEMPLATES.IMAGE_WITH_TEXT.replace('{query}', userText)
                    : PROMPT_TEMPLATES.IMAGE_ONLY;
                
                // Tạo nội dung cho request
                const content = [imagePart, { text: prompt }];
                
                // Gửi request đến Gemini
                result = await model.generateContent({
                    contents: [{ role: 'user', parts: content }],
                });
            } else {
                // Xử lý khi chỉ có văn bản
                const prompt = PROMPT_TEMPLATES.TEXT_ONLY.replace('{query}', userText);
                
                const chat = model.startChat({
                    history: [
                        {
                            role: 'user',
                            parts: [{ text: 'Xin chào, bạn có thể giúp tôi chăm sóc cây trồng không?' }],
                        },
                        {
                            role: 'model',
                            parts: [{ text: 'Chào bạn! Tôi là SmartBot của ứng dụng SmartGarden. Tôi rất vui được giúp bạn chăm sóc cây trồng. Bạn cần hỗ trợ về vấn đề gì?' }],
                        },
                    ],
                });
                
                result = await chat.sendMessage(prompt);
            }

            // Xử lý kết quả
            const response = result.response;
            let text = response.text();
            
            // Đảm bảo phản hồi luôn có tiền tố SmartBot
            if (!text.includes('SmartBot')) {
                text = `🌱 SmartBot: ${text}`;
            }
            
            return text;
        } catch (error) {
            console.error(`Lỗi khi kết nối với Gemini AI (lần thử ${retries + 1}):`, error);
            lastError = error;
            retries++;
            
            // Nếu không phải lỗi quota hoặc đã hết số lần thử, không retry nữa
            if (!isQuotaExceededError(error)) {
                break;
            }
        }
    }

    // Nếu tất cả các lần thử đều thất bại, trả về phản hồi fallback
    console.log('Đã thử lại tối đa, chuyển sang phản hồi fallback');
    return getFallbackResponse(userText);
};