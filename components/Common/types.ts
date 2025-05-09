import { MaterialIcons } from '@expo/vector-icons';

export interface Plant {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  type: string;
  progress: string;
  photoUri?: string;        // Ảnh do người dùng upload
  imageUri?: string;        // Ảnh mặc định hoặc từ API
  scientificName?: string;  // Tên khoa học của cây
  waterStatus?: string;     // Trạng thái tưới cây
  temperature?: string;     // Nhiệt độ
}

export const initialPlantsData: Plant[] = [
    {
      id: '1',
      name: 'Cây Mía',
      description: 'Cây trồng lâu năm',
      icon: 'grass',
      type: 'Cây thân gỗ',
      progress: 'Đã thu hoạch',
      imageUri: 'https://example.com/sugarcane.jpg',
      scientificName: 'Saccharum officinarum',
      waterStatus: 'Đã tưới 3/3 tuần',
      temperature: '28°C',
    },
    {
      id: '2',
      name: 'Cây Xanh',
      description: 'Cây mới trồng',
      icon: 'grass',
      type: 'Cây bụi',
      progress: 'Giai đoạn phát triển',
      imageUri: 'https://example.com/greenplant.jpg',
      scientificName: 'Ficus benjamina',
      waterStatus: 'Chưa tưới 1 tuần',
      temperature: '25°C',
    },
    {
      id: '3',
      name: 'Cây Lá',
      description: 'Cây trong nhà',
      icon: 'grass',
      type: 'Cây cảnh',
      progress: 'Giai đoạn sinh trưởng',
      imageUri: 'https://example.com/indoorplant.jpg',
      scientificName: 'Monstera deliciosa',
      waterStatus: 'Đã tưới 2/3 tuần',
      temperature: '27°C',
    },
    {
      id: '4',
      name: 'Cây Hoa',
      description: 'Cây ngoài vườn',
      icon: 'grass',
      type: 'Cây hoa',
      progress: 'Giai đoạn ra hoa',
      imageUri: 'https://example.com/flower.jpg',
      scientificName: 'Rosa chinensis',
      waterStatus: 'Đã tưới 1/2 tuần',
      temperature: '26°C',
    },
  ];
  