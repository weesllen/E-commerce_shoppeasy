// Mock data para desenvolvimento
export const mockProducts = [
  {
    id: 1,
    name: "Smartphone Galaxy Ultra",
    slug: "smartphone-galaxy-ultra",
    price: "2499.99",
    description: "Smartphone top de linha com câmera de 108MP e processador de última geração",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    stock: 15,
    rating: 4.8
  },
  {
    id: 2,
    name: "Notebook Gamer Pro",
    slug: "notebook-gamer-pro",
    price: "5999.90",
    description: "Notebook gamer com RTX 4060, Intel i7 e 16GB RAM",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    stock: 8,
    rating: 4.9
  },
  {
    id: 3,
    name: "Fone Bluetooth Premium",
    slug: "fone-bluetooth-premium",
    price: "449.99",
    description: "Fone com cancelamento de ruído ativo e bateria de 30h",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Áudio",
    stock: 25,
    rating: 4.7
  },
  {
    id: 4,
    name: "Smart Watch Fitness",
    slug: "smart-watch-fitness",
    price: "899.00",
    description: "Relógio inteligente com monitoramento de saúde e GPS integrado",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Wearables",
    stock: 30,
    rating: 4.6
  },
  {
    id: 5,
    name: "Câmera DSLR Profissional",
    slug: "camera-dslr-profissional",
    price: "3799.99",
    description: "Câmera profissional 24MP com lente 18-55mm inclusa",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    category: "Fotografia",
    stock: 12,
    rating: 4.9
  },
  {
    id: 6,
    name: "Tablet Android Max",
    slug: "tablet-android-max",
    price: "1599.00",
    description: "Tablet de 11 polegadas com tela AMOLED e S-Pen",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    stock: 20,
    rating: 4.5
  },
  {
    id: 7,
    name: "Console Gaming Next Gen",
    slug: "console-gaming-next-gen",
    price: "3999.99",
    description: "Console de última geração com suporte a 4K e Ray Tracing",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
    category: "Games",
    stock: 5,
    rating: 5.0
  },
  {
    id: 8,
    name: "Mouse Gamer RGB",
    slug: "mouse-gamer-rgb",
    price: "249.90",
    description: "Mouse gamer com sensor óptico de 16.000 DPI e iluminação RGB",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    category: "Periféricos",
    stock: 40,
    rating: 4.4
  }
];

// Função para obter produtos (simula API)
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500); // Simula delay de rede
  });
};

// Função para obter produto por slug
export const getProductBySlug = (slug) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.slug === slug);
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Produto não encontrado'));
      }
    }, 300);
  });
};
