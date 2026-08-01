'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Plus, ChevronLeft, ChevronRight, HeartHandshake, Trash2, CheckCircle2 } from 'lucide-react';

// URL Logo thương hiệu
const LOGO_URL = 'Logo.png';

// ── TELEGRAM CONFIG ──
const TG_BOT_TOKEN = '8873216327:AAGdcmLe7r91CgL-EAVuilQFdrEX381s7Ec';
const TG_CHAT_ID = '8818170775';

async function sendTelegramNotification(message: string) {
  try {
    const params = new URLSearchParams({
      chat_id: TG_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    });
    await fetch(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?${params.toString()}`,
      { method: 'GET', mode: 'no-cors' }
    );
  } catch (err) {
    console.error('Telegram error:', err);
  }
}

// DEFINITION OF ITEM TYPE FOR TYPESCRIPT SAFETY
interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  isBunCha?: boolean;
}

// MENU ĂN SÁNG
const BREAKFAST_DISHES: MenuItem[] = [
  {
    id: 'dac-biet',
    name: 'Đặc Biệt (Đủ loại bò)',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    description: 'Nước dùng ninh xương 12 tiếng thơm nức, đầy đủ thịt bò tái, nạm, gầu, bò viên và sườn bò ninh nhừ giòn ngọt.',
  },
  {
    id: 'bo-tai',
    name: 'Phở / Bún Bò Tái',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    description: 'Thịt bò thăn tươi sống được chần tái trực tiếp bằng nước dùng nóng hổi, giữ trọn độ mềm ngọt tự nhiên.',
  },
  {
    id: 'bo-nam',
    name: 'Phở / Bún Bò Nạm',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    description: 'Nạm bò luộc chín tới, vừa có độ giòn nhẹ vừa béo ngậy, cắt lát vừa ăn.',
  },
  {
    id: 'bo-vien',
    name: 'Phở / Bún Bò Viên',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    description: 'Bò viên gân giòn sần sật, đậm vị thịt bò tươi kết hợp nước dùng thanh ngọt.',
  },
  {
    id: 'bo-sot-vang',
    name: 'Phở / Bún Bò Sốt Vang',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    description: 'Thịt dẻ sườn hầm mềm với vang đỏ và quế hồi, nước dùng sánh quyện màu cam đỏ hấp dẫn.',
  },
  {
    id: 'gau-bo',
    name: 'Phở / Bún Gầu Bò',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    description: 'Gầu bò giòn thơm, xen kẽ giữa mỡ và thịt không hề gây ngấy.',
  },
  {
    id: 'tai-lan',
    name: 'Phở / Bún Tái Lăn',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    description: 'Bò tươi xào nhanh trên lửa lớn với tỏi và hành lá, thơm lừng béo ngậy.',
  },
  {
    id: 'tim-cat',
    name: 'Phở / Bún Tim Cật',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    description: 'Tim cật tươi chần giòn, làm sạch sấy thơm, ăn kèm nước dùng đậm đà.',
  },
  {
    id: 'suon',
    name: 'Phở / Bún Sườn Bò',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    description: 'Sườn bò cây lớn ninh mềm róc xương, thịt đậm đà tan trong miệng.',
  },
  {
    id: 'thit-nuong',
    name: 'Bún Thịt Nướng',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    description: 'Thịt nướng than hoa thơm lừng tẩm ướp vừng mè gia truyền.',
  },
  {
    id: 'cha-cham',
    name: 'Bún Chả Chấm',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1634864562115-9d3326164287?w=800',
    description: 'Chả viên và chả miếng nướng cháy xèo, nước chấm chua ngọt kèm đu đủ giòn.',
    isBunCha: true,
  },
];

// MENU COMBO
const COMBO_DISHES: MenuItem[] = [
  {
    id: 'combo-2-nguoi',
    name: 'Combo Hẹn Hò (2 Người)',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    description: 'Bao gồm: 1 Lẩu Bò Uyên Ương (2 người) + 1 Đĩa Bò Viên Chiên + 2 Lon Pepsi / 7Up mát lạnh.',
  },
  {
    id: 'combo-4-nguoi',
    name: 'Combo Phố Hội (4 Người)',
    price: 599000,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    description: 'Bao gồm: 1 Lẩu Bò Lớn (4 người) + 1 Bò Nướng Ngũ Vị + 1 Đĩa Tim Cật Xào + 4 Đồ uống tùy chọn.',
  },
  {
    id: 'combo-8-nguoi',
    name: 'Combo Đại Tiệc 888 (8 Người)',
    price: 1199000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    description: 'Bao gồm: 2 Nồi Lẩu Lớn tùy chọn + 1 Bò Múa Lửa + 1 Bò Đắp Chăn + 1 Bò Tắm Thảo Mộc + 2 Chai Rượu Men Lá.',
  },
];

// MENU ĐỒ UỐNG
const DRINK_DISHES: MenuItem[] = [
  { id: 'pepsi', name: 'Pepsi', price: 15000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800', description: 'Pepsi ướp lạnh sảng khoái' },
  { id: 'rockstar', name: 'Nước Tăng Lực Rockstar', price: 15000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=800', description: 'Tăng lực bù đắp năng lượng' },
  { id: 'aquafina', name: 'Nước Suối Aquafina', price: 10000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800', description: 'Nước khoáng tinh khiết 500ml' },
  { id: 'sting-vang', name: 'Sting Vàng', price: 10000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800', description: 'Nước tăng lực Sting vị nhân sâm' },
  { id: 'sting-do', name: 'Sting Đỏ', price: 10000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800', description: 'Nước tăng lực Sting hương dâu' },
  { id: '7up', name: '7Up', price: 15000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800', description: 'Nước ngọt có ga vị chanh mát lạnh' },
  { id: 'twister-cam', name: 'Nước Cam Twister', price: 15000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800', description: 'Nước tép cam tươi giàu Vitamin C' },
  { id: 'revive', name: 'Revive', price: 15000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800', description: 'Nước khoáng bù khoáng tức thì' },
  { id: 'twister-sua-trai-cay', name: 'Sữa Trái Cây Twister', price: 15000, category: 'Đóng chai', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800', description: 'Sữa trái cây thơm ngon bổ dưỡng' },
  { id: 'tra-chanh-tac', name: 'Trà Chanh / Trà Tắc', price: 20000, category: 'Pha chế', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800', description: 'Trà pha tươi mát lạnh, giải nhiệt' },
  { id: 'cafe-den', name: 'Cà Phê Đen', price: 20000, category: 'Pha chế', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800', description: 'Cà phê nguyên chất đậm đà' },
  { id: 'cafe-sua', name: 'Cà Phê Sữa', price: 25000, category: 'Pha chế', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800', description: 'Cà phê phin hòa quyện sữa đặc béo ngậy' },
  { id: 'bac-siu', name: 'Bạc Sỉu', price: 25000, category: 'Pha chế', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800', description: 'Nhiều sữa ít cà phê, thơm ngọt dễ uống' },
  { id: 'chanh-tuoi', name: 'Nước Chanh Tươi', price: 20000, category: 'Pha chế', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800', description: 'Chanh tươi vắt đường đá sảng khoái' },
  { id: 'bia-ha-noi', name: 'Bia Lon Hà Nội', price: 20000, category: 'Đồ có cồn', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800', description: 'Bia Hà Nội lon ướp lạnh' },
  { id: 'bia-sai-gon', name: 'Bia Lon Sài Gòn', price: 20000, category: 'Đồ có cồn', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800', description: 'Bia Sài Gòn lon ướp lạnh' },
  { id: 'ruou-men-la', name: 'Rượu Men Lá', price: 25000, category: 'Đồ có cồn', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800', description: 'Rượu men lá truyền thống (Chai)' },
  { id: 'ruou-thao-duoc', name: 'Rượu Ngâm Thảo Dược', price: 60000, category: 'Đồ có cồn', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800', description: 'Rượu ngâm thảo dược bổ dưỡng (Chai)' },
];

// MENU ĐỒ NHẬU
const NHAN_DISHES: MenuItem[] = [
  { id: 'bo-nuong-ngu-vi', name: 'Bò Nướng Ngũ Vị', price: 120000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', description: 'Thịt bò tươi ướp gia vị ngũ vị hương thơm lừng nướng xèo' },
  { id: 'bo-mua-lua', name: 'Bò Múa Lửa', price: 150000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', description: 'Món bò xào lửa lớn giữ trọn độ mềm mọng và hương vị đặc trưng' },
  { id: 'bo-tam-thao-moc', name: 'Bò Tắm Thảo Mộc', price: 100000, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', description: 'Thịt bò chần/hầm nhẹ cùng các loại thảo mộc thanh ngọt' },
  { id: 'bo-dap-chan', name: 'Bò Đắp Chăn', price: 120000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', description: 'Thịt bò cuộn/phủ lớp gia vị đặc biệt thơm ngon đậm đà' },
  { id: 'bo-vien-chien', name: 'Bò Viên Chiên', price: 100000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800', description: 'Bò viên chiên giòn rụm bên ngoài, dai ngọt bên trong' },
  { id: 'bo-sot-vang-nhau', name: 'Bò Sốt Vang', price: 100000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', description: 'Bò hầm vang sốt sánh quyện, món nhậu chuẩn vị' },
  { id: 'bo-xao-abc', name: 'Bò Xào Món Phụ', price: 120000, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', description: 'Thịt bò xào mềm thơm kết hợp rau củ tươi' },
  { id: 'thit-lon-nuong', name: 'Thịt Lợn Nướng', price: 100000, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800', description: 'Thịt lợn tẩm ướp đậm đà nướng cháy cạnh thơm phức' },
  { id: 'tim-cat-xao', name: 'Tim Cật Xào', price: 120000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800', description: 'Tim cật tươi xào giòn sần sật béo ngậy' },
];

// MENU LẨU
const LAU_DISHES: MenuItem[] = [
  { id: 'lau-bo-888', name: 'Lẩu Bò 888', price: 252513.25, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800', description: 'Nước dùng độc quyền 888, đầy đủ bắp bò, nạm, gầu, bò viên tươi' },
  { id: 'lau-bo-thuoc-bac', name: 'Lẩu Bò Thuốc Bắc Đông Trùng', price: 252513.25, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', description: 'Nước lẩu tiềm thuốc bắc và đông trùng hạ thảo đại bổ, thơm dịu' },
  { id: 'lau-bo-nhung-dam', name: 'Lẩu Bò Nhúng Dấm', price: 252513.25, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', description: 'Nước dùng chua thanh vị dấm mần, nhúng bò tái ăn kèm bánh tráng rau sống' },
  { id: 'lau-thai-chua-cay', name: 'Lẩu Thái Chua Cay', price: 252513.25, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', description: 'Nước lẩu Tomyum đậm đà chua cay bùng nổ vị giác' },
];

// CÁC TÙY CHỌN LẨU
const LAU_OPTIONS = [
  { id: 'uyen-uong', name: 'Lẩu Uyên Ương (2 người)', price: 252513.25 },
  { id: 'lau-lon', name: 'Lẩu Lớn (4 người)', price: 500000 },
];

// POPUP THÔNG BÁO QUY TRÌNH
const QUICK_SIDE_ITEMS = [
  { id: 'quay', name: 'Quẩy', price: 10000 },
  { id: 'pepsi', name: 'Pepsi', price: 15000 },
  { id: 'aquafina', name: 'Aquafina', price: 10000 },
  { id: 'trung_tran', name: 'Trứng Trần', price: 15000 },
  { id: 'vit_lon', name: 'Trứng Vịt Lộn', price: 15000 },
];

// Tùy chọn ăn sáng
const NOODLE_TYPES = ['Phở', 'Bún', 'Mỳ'];
const COOKING_METHODS = [
  { name: 'Nước béo', priceOffset: 0 },
  { name: 'Nước trong', priceOffset: 0 },
  { name: 'Xào', priceOffset: 10000 },
  { name: 'Trộn', priceOffset: 0 },
];
const GREEN_ONION_OPTIONS = ['Có hành', '0 hành'];
const PORTION_SIZES = [
  { name: 'Trẻ em', priceOffset: -5000 },
  { name: 'Bình thường', priceOffset: 0 },
  { name: 'Suất lớn', priceOffset: 10000 },
];

const EXTRA_TOPPINGS = [
  { id: 'tai', name: 'Thịt Tái', price: 10000 },
  { id: 'nam', name: 'Thịt Nạm', price: 10000 },
  { id: 'bo_vien', name: 'Bò Viên', price: 10000 },
  { id: 'sot_vang', name: 'Sốt Vang', price: 10000 },
  { id: 'gau', name: 'Gầu Bò', price: 10000 },
  { id: 'tim_cat', name: 'Tim Cật', price: 10000 },
  { id: 'thit_nuong', name: 'Thịt Nướng', price: 10000 },
  { id: 'gan', name: 'Gân Bò', price: 10000 },
  { id: 'quay', name: 'Quẩy', price: 10000 },
  { id: 'trung_ga', name: 'Trứng Gà', price: 8000 },
  { id: 'trung_vit', name: 'Trứng Vịt', price: 10000 },
  { id: 'gio', name: 'Giò', price: 10000 },
];

const BUN_CHA_EXTRAS = [
  { id: 'bun_them', name: 'Thêm Bún', price: 5000 },
  { id: 'thit_nuong', name: 'Thịt Nướng', price: 10000 },
  { id: 'quay', name: 'Quẩy', price: 10000 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'breakfast' | 'combo' | 'drink' | 'nhau' | 'lau'>('breakfast');

  const [selectedDishIndex, setSelectedDishIndex] = useState<number | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<number>(0);

  // Tùy chọn món ăn sáng
  const [selectedNoodle, setSelectedNoodle] = useState('Phở');
  const [selectedCooking, setSelectedCooking] = useState('Nước béo');
  const [selectedOnion, setSelectedOnion] = useState('Có hành');
  const [selectedPortion, setSelectedPortion] = useState('Bình thường');

  // Tùy chọn Lẩu
  const [selectedLauOption, setSelectedLauOption] = useState<string>('uyen-uong');

  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: number }>({});
  const [quantity, setQuantity] = useState(1);

  // Giỏ hàng & Popup
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const [quickSides, setQuickSides] = useState<{ [key: string]: number }>({});

  const getCurrentDishes = (): MenuItem[] => {
    switch (activeTab) {
      case 'breakfast': return BREAKFAST_DISHES;
      case 'combo': return COMBO_DISHES;
      case 'drink': return DRINK_DISHES;
      case 'nhau': return NHAN_DISHES;
      case 'lau': return LAU_DISHES;
      default: return BREAKFAST_DISHES;
    }
  };

  const currentDishList = getCurrentDishes();
  const currentDish = selectedDishIndex !== null ? currentDishList[selectedDishIndex] : null;

  const resetOptions = () => {
    setSelectedNoodle('Phở');
    setSelectedCooking('Nước béo');
    setSelectedOnion('Có hành');
    setSelectedPortion('Bình thường');
    setSelectedLauOption('uyen-uong');
    setSelectedExtras({});
    setQuantity(1);
  };

  const handleOpenDetail = (index: number) => {
    setSelectedDishIndex(index);
    resetOptions();
  };

  const handleNextDish = () => {
    if (selectedDishIndex === null) return;
    setSwipeDirection(1);
    setSelectedDishIndex((prev) => (prev! + 1) % currentDishList.length);
    resetOptions();
  };

  const handlePrevDish = () => {
    if (selectedDishIndex === null) return;
    setSwipeDirection(-1);
    setSelectedDishIndex((prev) => (prev! - 1 + currentDishList.length) % currentDishList.length);
    resetOptions();
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 40;
    const velocityThreshold = 200;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNextDish();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrevDish();
    }
  };

  const handleCycleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      const current = prev[id] || 0;
      const next = current >= 4 ? 0 : current + 1;
      return { ...prev, [id]: next };
    });
  };

  const handleCycleQuickSide = (id: string) => {
    setQuickSides((prev) => {
      const current = prev[id] || 0;
      const next = current >= 4 ? 0 : current + 1;
      return { ...prev, [id]: next };
    });
  };

  // Safe checks with TypeScript Interface
  const isBunChaDish = currentDish?.isBunCha || currentDish?.id === 'cha-cham';
  let calculatedUnitPrice = currentDish ? currentDish.price : 40000;

  if (activeTab === 'lau') {
    const lauOpt = LAU_OPTIONS.find((opt) => opt.id === selectedLauOption);
    if (lauOpt) {
      calculatedUnitPrice = lauOpt.price;
    }
  } else if (activeTab === 'breakfast' && !isBunChaDish) {
    const currentPortionObj = PORTION_SIZES.find((p) => p.name === selectedPortion);
    calculatedUnitPrice += currentPortionObj ? currentPortionObj.priceOffset : 0;

    const currentCookingObj = COOKING_METHODS.find((c) => c.name === selectedCooking);
    calculatedUnitPrice += currentCookingObj ? currentCookingObj.priceOffset : 0;
  }

  const availableExtrasList = isBunChaDish ? BUN_CHA_EXTRAS : EXTRA_TOPPINGS;

  if (activeTab === 'breakfast') {
    const totalExtrasCost = Object.entries(selectedExtras).reduce((sum, [id, count]) => {
      const topping = availableExtrasList.find((t) => t.id === id);
      const itemPrice = topping ? topping.price : 10000;
      return sum + count * itemPrice;
    }, 0);
    calculatedUnitPrice += totalExtrasCost;
  }

  const totalPriceForCustomItem = calculatedUnitPrice * quantity;

  // Thêm vào giỏ
  const handleAddToCart = () => {
    if (!currentDish) return;

    let optionsSummary = '';

    if (activeTab === 'breakfast') {
      const extrasList: string[] = [];
      Object.entries(selectedExtras).forEach(([id, count]) => {
        if (count > 0) {
          const topping = availableExtrasList.find((t) => t.id === id);
          if (topping) {
            extrasList.push(`${count}x ${topping.name} (+${(count * topping.price) / 1000}k)`);
          }
        }
      });

      if (isBunChaDish) {
        optionsSummary = extrasList.length > 0 ? extrasList.join(' • ') : 'Suất chuẩn';
      } else {
        const baseOpt = `Sợi: ${selectedNoodle} • ${selectedCooking} • ${selectedOnion} • Suất ${selectedPortion}`;
        optionsSummary = extrasList.length > 0 ? `${baseOpt} | Gọi thêm: ${extrasList.join(', ')}` : baseOpt;
      }
    } else if (activeTab === 'lau') {
      const lauOpt = LAU_OPTIONS.find((opt) => opt.id === selectedLauOption);
      optionsSummary = lauOpt ? lauOpt.name : 'Lẩu Uyên Ương (2 người)';
    } else {
      optionsSummary = currentDish.description || 'Suất tiêu chuẩn';
    }

    const cartItem = {
      cartId: Date.now(),
      dishId: currentDish.id,
      name: currentDish.name,
      image: currentDish.image,
      optionsSummary: optionsSummary,
      unitPrice: calculatedUnitPrice,
      quantity: quantity,
      finalPrice: totalPriceForCustomItem,
    };

    setCart((prevCart) => [...prevCart, cartItem]);
    setIsOptionOpen(false);
    setSelectedDishIndex(null);
  };

  const updateCartQuantity = (cartId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            finalPrice: item.unitPrice * newQty,
          };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeCartItem = (cartId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.finalPrice, 0);

  const handleCheckout = () => {
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const tableNum = new URLSearchParams(window.location.search).get('ban') || '?';
    const totalAmount = cart.reduce((sum, item) => sum + item.finalPrice, 0);

    const itemLines = cart.map((item, i) =>
      `<b>[${i + 1}] ${item.name}</b> x${item.quantity} — ${(item.finalPrice).toLocaleString('vi-VN')}đ\n  📝 ${item.optionsSummary}`
    ).join('\n─────────────────\n');

    const msg =
`🍜 <b>ĐƠN MỚI | BÀN ${tableNum}</b> | ${now}
━━━━━━━━━━━━━━━━━━
${itemLines}
━━━━━━━━━━━━━━━━━━
💰 <b>Tổng: ${totalAmount.toLocaleString('vi-VN')}đ</b>`;

    sendTelegramNotification(msg);

    setIsCartOpen(false);
    setShowThankYouPopup(true);
    setQuickSides({});
  };

  const closeThankYouPopup = () => {
    const hasQuickSides = Object.values(quickSides).some((v) => v > 0);
    if (hasQuickSides) {
      const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const tableNum = new URLSearchParams(window.location.search).get('ban') || '?';
      const sideLines = Object.entries(quickSides)
        .filter(([, count]) => count > 0)
        .map(([id, count]) => {
          const item = QUICK_SIDE_ITEMS.find((q) => q.id === id);
          return item ? `  • ${item.name} x${count} — ${(item.price * count / 1000)}k` : '';
        })
        .filter(Boolean)
        .join('\n');
      const totalSides = Object.entries(quickSides).reduce((sum, [id, count]) => {
        const item = QUICK_SIDE_ITEMS.find((q) => q.id === id);
        return sum + (item ? item.price * count : 0);
      }, 0);
      const msg =
`➕ <b>GỌI THÊM | BÀN ${tableNum}</b> | ${now}
━━━━━━━━━━━━━━━━━━
${sideLines}
━━━━━━━━━━━━━━━━━━
💰 <b>Thêm: ${totalSides.toLocaleString('vi-VN')}đ</b>`;
      sendTelegramNotification(msg);
    }

    setShowThankYouPopup(false);
    setQuickSides({});
    setCart([]);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.96,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.96,
    }),
  };

  const totalQuickSidesCost = Object.entries(quickSides).reduce((sum, [id, count]) => {
    const itemObj = QUICK_SIDE_ITEMS.find((q) => q.id === id);
    return sum + (itemObj ? itemObj.price * count : 0);
  }, 0);

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 font-sans text-slate-800 p-2 sm:p-4">
      <div className="relative w-full max-w-sm h-[800px] bg-slate-50 rounded-[40px] shadow-2xl overflow-hidden border-8 border-neutral-800 flex flex-col justify-between">
        
        {/* HÌNH NỀN CHÌM */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.08]">
          <img src={LOGO_URL} alt="Background Watermark" className="w-80 h-80 object-contain" />
        </div>

        {/* Header Top - Logo & Tên quán */}
        <div className="p-3 pb-2 bg-white/95 backdrop-blur-md flex justify-between items-center shadow-xs z-10 border-b border-slate-100">
          <div className="flex items-center gap-2 max-w-[80%]">
            <img
              src={LOGO_URL}
              alt="Logo Bò Ngon 888"
              className="w-10 h-10 object-contain shrink-0 rounded-full border border-orange-100 shadow-xs"
            />
            <div className="truncate">
              <h1 className="text-[13px] uppercase tracking-wider text-orange-600 font-black leading-tight truncate">
                Bò Ngon 888
              </h1>
              <p className="text-[9px] font-bold text-slate-500 leading-tight mt-0.5 line-clamp-1">
                Phở, Combo, Lẩu, Nướng - Bò tươi mỗi ngày
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-orange-50 hover:bg-orange-100 rounded-full text-slate-800 transition shrink-0"
          >
            <ShoppingBag size={20} className="text-orange-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* --- TAGS DANH MỤC --- */}
        <div className="bg-white/95 backdrop-blur-md px-2 py-2 flex gap-1.5 overflow-x-auto border-b border-slate-100 scrollbar-none z-10">
          {[
            { id: 'breakfast', label: 'Ăn Sáng' },
            { id: 'combo', label: 'Combo 🔥' },
            { id: 'drink', label: 'Đồ Uống' },
            { id: 'nhau', label: 'Đồ Nhậu' },
            { id: 'lau', label: 'Lẩu' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedDishIndex(null);
              }}
              className={`px-3 py-1.5 text-[11px] font-extrabold rounded-xl shrink-0 transition ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- MENU DẠNG 2 CỘT --- */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 z-1 relative">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {activeTab === 'breakfast' && 'Menu Phở & Bún Tươi'}
              {activeTab === 'combo' && 'Combo Tiết Kiệm (2, 4, 8 Người)'}
              {activeTab === 'drink' && 'Giải Khát, Cà Phê & Bia Rượu'}
              {activeTab === 'nhau' && 'Món Nhậu Bò & Lợn Độc Đáo'}
              {activeTab === 'lau' && 'Các Món Lẩu Bò Đậm Đà'}
            </h2>
            <span className="text-[10px] text-orange-600 font-bold">
              {currentDishList.length} món
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {currentDishList.map((dish, index) => (
              <div
                key={dish.id}
                onClick={() => handleOpenDetail(index)}
                className="bg-white/90 backdrop-blur-xs rounded-2xl p-2.5 border border-slate-100 shadow-xs hover:shadow-md transition cursor-pointer active:scale-95 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-24 rounded-xl overflow-hidden mb-2 relative">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    {dish.category && (
                      <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-md font-bold">
                        {dish.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{dish.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{dish.description}</p>
                </div>

                <div className="mt-2 flex justify-between items-center pt-2 border-t border-slate-50">
                  <span className="text-xs font-black text-orange-600">
                    {activeTab === 'lau' ? 'Từ 252.513 đ' : `${dish.price.toLocaleString('vi-VN')} đ`}
                  </span>
                  <span className="bg-orange-500 text-white p-1 rounded-full text-[10px]">
                    <Plus size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CHI TIẾT MÓN --- */}
        <AnimatePresence initial={false} custom={swipeDirection}>
          {selectedDishIndex !== null && currentDish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white z-30 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20">
                <button
                  onClick={() => setSelectedDishIndex(null)}
                  className="p-2.5 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition shadow-lg active:scale-90"
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                  {selectedDishIndex + 1} / {currentDishList.length}
                </span>
              </div>

              <button
                onClick={handlePrevDish}
                className="absolute left-2 top-1/4 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur-md text-slate-800 rounded-full shadow-md hover:bg-white active:scale-90 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextDish}
                className="absolute right-2 top-1/4 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur-md text-slate-800 rounded-full shadow-md hover:bg-white active:scale-90 transition"
              >
                <ChevronRight size={20} />
              </button>

              <motion.div
                key={selectedDishIndex}
                custom={swipeDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 350, damping: 28, mass: 0.8 },
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.15 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragSnapToOrigin={true}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                className="w-full h-full flex flex-col justify-between cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <div className="w-full h-[50%] relative bg-slate-900 overflow-hidden">
                  <img
                    src={currentDish.image}
                    alt={currentDish.name}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                </div>

                <div className="w-full h-[50%] bg-white rounded-t-[32px] -mt-6 relative z-10 px-4 pt-4 pb-3 flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-2" />
                    
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="text-lg font-black text-slate-900 leading-tight">
                        {currentDish.name}
                      </h2>
                      <span className="text-base font-black text-orange-600 shrink-0">
                        {activeTab === 'lau' ? 'Chọn cỡ lẩu' : `${currentDish.price.toLocaleString('vi-VN')} đ`}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {currentDish.description}
                    </p>

                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Món khác cùng loại (Vuốt để xem)
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {currentDishList.map((d, idx) => {
                          const isCurrent = idx === selectedDishIndex;
                          return (
                            <div
                              key={d.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDetail(idx);
                              }}
                              className={`shrink-0 w-14 flex flex-col items-center cursor-pointer transition ${
                                isCurrent ? 'scale-105 opacity-100' : 'opacity-50 hover:opacity-80'
                              }`}
                            >
                              <img
                                src={d.image}
                                className={`w-12 h-12 rounded-xl object-cover border-2 ${
                                  isCurrent ? 'border-orange-500 shadow-md' : 'border-transparent'
                                }`}
                              />
                              <span className="text-[9px] font-bold text-slate-700 truncate w-full text-center mt-1">
                                {d.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeTab === 'breakfast' || activeTab === 'lau') {
                          setIsOptionOpen(true);
                        } else {
                          handleAddToCart();
                        }
                      }}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-extrabold shadow-lg transition active:scale-95 text-xs flex items-center justify-center gap-2"
                    >
                      <span>
                        {activeTab === 'breakfast' || activeTab === 'lau'
                          ? 'TÙY CHỌN & ĐẶT MÓN'
                          : 'THÊM TRỰC TIẾP VÀO GIỎ'}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- BOTTOM SHEET TÙY CHỌN (ĂN SÁNG & LẨU) --- */}
        <AnimatePresence>
          {isOptionOpen && currentDish && (activeTab === 'breakfast' || activeTab === 'lau') && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-0 bg-white z-40 flex flex-col justify-between p-3.5 overflow-hidden rounded-t-[35px] shadow-2xl"
            >
              <div className="flex-1 overflow-y-auto pr-1 pb-2 scrollbar-none">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setIsOptionOpen(false)}
                    className="p-1.5 bg-slate-100 rounded-full text-slate-700 hover:bg-slate-200 transition"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h3 className="text-xs font-bold text-slate-800">
                    {activeTab === 'lau' ? 'Chọn Size Nồi Lẩu' : 'Tùy Chọn Món Ăn'}
                  </h3>
                  <div className="w-6" />
                </div>

                <div className="flex gap-2.5 items-center bg-orange-50 p-2 rounded-2xl mb-2.5 border border-orange-100">
                  <img src={currentDish.image} className="w-12 h-12 rounded-xl object-cover shadow-xs" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{currentDish.name}</h4>
                    <p className="text-[11px] text-orange-600 font-bold mt-0.5">
                      {calculatedUnitPrice.toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>

                {/* OPTION DÀNH CHO LẨU */}
                {activeTab === 'lau' && (
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Chọn Quy Cách Nồi Lẩu
                    </p>
                    <div className="space-y-2">
                      {LAU_OPTIONS.map((opt) => {
                        const isSelected = selectedLauOption === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedLauOption(opt.id)}
                            className={`p-3 rounded-2xl border transition cursor-pointer flex justify-between items-center ${
                              isSelected
                                ? 'bg-orange-50 border-orange-500 text-orange-900 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div>
                              <span className="text-xs font-black block">{opt.name}</span>
                              <span className="text-[10px] text-slate-500">Thích hợp ăn gia đình & bạn bè</span>
                            </div>
                            <span className="text-xs font-black text-orange-600">
                              {opt.price.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* OPTION DÀNH CHO ĂN SÁNG */}
                {activeTab === 'breakfast' && !isBunChaDish && (
                  <>
                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">1. Loại Sợi</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {NOODLE_TYPES.map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedNoodle(type)}
                            className={`py-1 text-[11px] font-bold rounded-lg border transition ${
                              selectedNoodle === type
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">2. Cách Chế Biến</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {COOKING_METHODS.map((method) => (
                          <button
                            key={method.name}
                            onClick={() => setSelectedCooking(method.name)}
                            className={`py-1 px-2 text-[11px] font-bold rounded-lg border transition flex justify-between items-center ${
                              selectedCooking === method.name
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{method.name}</span>
                            {method.priceOffset > 0 && (
                              <span className={`text-[9px] ${selectedCooking === method.name ? 'text-white' : 'text-orange-600'}`}>
                                +{method.priceOffset / 1000}k
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">3. Lựa Chọn Hành</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {GREEN_ONION_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSelectedOnion(opt)}
                            className={`py-1 text-[11px] font-bold rounded-lg border transition ${
                              selectedOnion === opt
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">4. Chọn Suất Ăn</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {PORTION_SIZES.map((portion) => (
                          <button
                            key={portion.name}
                            onClick={() => setSelectedPortion(portion.name)}
                            className={`py-1 text-[10px] font-bold rounded-lg border transition flex flex-col items-center justify-center ${
                              selectedPortion === portion.name
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{portion.name}</span>
                            <span className="text-[8px] opacity-80">
                              {portion.priceOffset > 0
                                ? `+${portion.priceOffset / 1000}k`
                                : portion.priceOffset < 0
                                ? `${portion.priceOffset / 1000}k`
                                : 'Chuẩn'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'breakfast' && (
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {isBunChaDish ? 'Tùy Chọn Gọi Thêm' : 'Gọi Thêm Thịt & Đồ Kèm'}
                      </p>
                      <span className="text-[9px] text-orange-600 font-medium">Chạm để cộng (+1)</span>
                    </div>
                    
                    <div className={`grid ${isBunChaDish ? 'grid-cols-1 gap-1.5' : 'grid-cols-2 gap-1.5'} max-h-36 overflow-y-auto pr-0.5`}>
                      {availableExtrasList.map((item) => {
                        const count = selectedExtras[item.id] || 0;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleCycleExtra(item.id)}
                            className={`flex items-center justify-between px-2 py-1 rounded-lg border transition cursor-pointer select-none active:scale-95 ${
                              count > 0
                                ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div>
                              <span className="text-[10px] font-bold block leading-tight">{item.name}</span>
                              <span className={`text-[8px] ${count > 0 ? 'text-orange-100' : 'text-slate-400'}`}>
                                +{item.price / 1000}k
                              </span>
                            </div>

                            <div className="flex items-center">
                              {count > 0 ? (
                                <span className="bg-white text-orange-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                  +{count}
                                </span>
                              ) : (
                                <span className="text-[9px] text-slate-400 font-medium">+0</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700">Số Lượng Suất</span>
                  <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-slate-600 font-bold text-xs">
                      -
                    </button>
                    <span className="text-xs font-black text-slate-800 min-w-[16px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)} className="text-slate-600 font-bold text-xs">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 shrink-0">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-extrabold shadow-md transition active:scale-95 text-xs flex items-center justify-between px-3"
                >
                  <span>THÊM VÀO GIỎ HÀNG</span>
                  <span>{totalPriceForCustomItem.toLocaleString('vi-VN')} đ</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- BOTTOM SHEET GIỎ HÀNG --- */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-white z-50 flex flex-col justify-between p-4 rounded-t-[35px] shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800">Giỏ Hàng Của Bạn</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-slate-400 font-bold text-sm">✕</button>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <p className="text-center text-slate-400 text-xs py-16">Chưa có món nào trong giỏ</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.cartId} className="flex gap-2.5 items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeCartItem(item.cartId)}
                              className="text-slate-400 hover:text-red-500 p-0.5 transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                            {item.optionsSummary}
                          </p>
                          
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs font-black text-orange-600">
                              {item.finalPrice.toLocaleString('vi-VN')} đ
                            </p>

                            <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                              <button
                                onClick={() => updateCartQuantity(item.cartId, -1)}
                                className="text-slate-600 font-black text-xs hover:text-orange-600 px-1"
                              >
                                -
                              </button>
                              <span className="text-xs font-black text-slate-800 min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.cartId, 1)}
                                className="text-slate-600 font-black text-xs hover:text-orange-600 px-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">Tổng tiền:</span>
                    <span className="text-lg font-black text-slate-900">{totalCartAmount.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-orange-500 text-white rounded-2xl font-bold shadow-md hover:bg-orange-600 transition text-xs uppercase tracking-wider"
                  >
                    Xác Nhận Đặt Hàng
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- POPUP CẢM ƠN + CHỌN NHANH ĐỒ KÈM --- */}
        <AnimatePresence>
          {showThankYouPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3"
            >
              <motion.div
                initial={{ scale: 0.85, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 15 }}
                className="bg-white rounded-3xl p-4 text-center shadow-2xl border border-orange-100 w-full max-w-[320px] flex flex-col justify-between max-h-[750px] overflow-y-auto scrollbar-none"
              >
                <div>
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <HeartHandshake size={26} />
                  </div>

                  <h3 className="text-sm font-black text-slate-800 mb-1">ĐẶT HÀNG THÀNH CÔNG!</h3>

                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium bg-orange-50/80 p-2 rounded-xl border border-orange-100 mb-3 text-left">
                    Cảm ơn quý khách! Trong lúc đợi bếp chuẩn bị món, quý khách có thể lấy thêm rau sống, giá, trà đá miễn phí tại quầy tự phục vụ.
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 mb-3 text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
                        ⚡ Chọn nhanh đồ ăn kèm
                      </span>
                      <span className="text-[8px] text-orange-600 font-bold">Chạm để thêm (+1)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {QUICK_SIDE_ITEMS.map((item) => {
                        const count = quickSides[item.id] || 0;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleCycleQuickSide(item.id)}
                            className={`flex items-center justify-between px-2 py-1.5 rounded-xl border transition cursor-pointer select-none active:scale-95 ${
                              count > 0
                                ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div>
                              <span className="text-[10px] font-bold block leading-tight">{item.name}</span>
                              <span className={`text-[8px] ${count > 0 ? 'text-orange-100' : 'text-slate-400'}`}>
                                +{item.price / 1000}k
                              </span>
                            </div>

                            <div className="flex items-center">
                              {count > 0 ? (
                                <span className="bg-white text-orange-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                  +{count}
                                </span>
                              ) : (
                                <span className="text-[9px] text-slate-400 font-medium">+0</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {totalQuickSidesCost > 0 && (
                      <div className="mt-2 pt-1.5 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-500">Đồ gọi thêm:</span>
                        <span className="text-orange-600 font-black">
                          +{totalQuickSidesCost.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={closeThankYouPopup}
                  className="w-full py-3 bg-slate-900 text-white text-xs font-extrabold rounded-2xl shadow-md hover:bg-slate-800 transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={16} className="text-orange-500" />
                  <span>
                    {totalQuickSidesCost > 0 ? 'BỔ SUNG ĐỒ KÈM & QUAY LẠI' : 'XÁC NHẬN & QUAY LẠI'}
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}