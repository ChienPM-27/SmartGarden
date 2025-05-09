
import { MaterialIcons } from '@expo/vector-icons';

export interface Plant {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    type: string;
    progress: string;
    photoUri?: string; 
}

export const initialPlantsData: Plant[] = [
    {
        id: '1',
        name: 'Cây Mía',
        description: 'Cây trồng lâu năm',
        icon: 'grass',
        type: 'Cây thân gỗ',
        progress: 'Đã thu hoạch',
    },
    {
        id: '2',
        name: 'Cây Xanh',
        description: 'Cây mới trồng',
        icon: 'grass',
        type: 'Cây bụi',
        progress: 'Giai đoạn phát triển',
    },
    {
        id: '3',
        name: 'Cây Lá',
        description: 'Cây trong nhà',
        icon: 'grass',
        type: 'Cây cảnh',
        progress: 'Giai đoạn sinh trưởng',
    },
    {
        id: '4',
        name: 'Cây Hoa',
        description: 'Cây ngoài vườn',
        icon: 'grass',
        type: 'Cây hoa',
        progress: 'Giai đoạn ra hoa',
    },
];
