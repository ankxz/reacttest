import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Search, 
  Package, 
  Upload,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Tag,
  Star,
  ShoppingCart,
  Filter,
  Download
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock product catalog data
const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and titanium design',
    price: 999.00,
    currency: 'USD',
    category: 'Smartphones',
    brand: 'Apple',
    sku: 'IPH15PRO128',
    stock: 45,
    status: 'active',
    images: ['/api/placeholder/300/300'],
    rating: 4.8,
    reviews: 1250,
    tags: ['premium', 'new', 'bestseller'],
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Flagship Android phone with AI features and excellent camera',
    price: 899.00,
    currency: 'USD',
    category: 'Smartphones',
    brand: 'Samsung',
    sku: 'SGS24256',
    stock: 32,
    status: 'active',
    images: ['/api/placeholder/300/300'],
    rating: 4.6,
    reviews: 850,
    tags: ['android', 'premium'],
    createdAt: '2024-01-08',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    description: 'Ultra-thin laptop with M3 chip for exceptional performance',
    price: 1299.00,
    currency: 'USD',
    category: 'Laptops',
    brand: 'Apple',
    sku: 'MBA13M3512',
    stock: 18,
    status: 'active',
    images: ['/api/placeholder/300/300'],
    rating: 4.9,
    reviews: 650,
    tags: ['laptop', 'premium', 'bestseller'],
    createdAt: '2024-01-05',
    lastUpdated: '2024-01-12'
  },
  {
    id: '4',
    name: 'AirPods Pro 2',
    description: 'Premium wireless earbuds with active noise cancellation',
    price: 249.00,
    currency: 'USD',
    category: 'Audio',
    brand: 'Apple',
    sku: 'APP2GEN2',
    stock: 0,
    status: 'out_of_stock',
    images: ['/api/placeholder/300/300'],
    rating: 4.7,
    reviews: 2100,
    tags: ['audio', 'wireless'],
    createdAt: '2024-01-03',
    lastUpdated: '2024-01-11'
  },
  {
    id: '5',
    name: 'Gaming Keyboard RGB',
    description: 'Mechanical gaming keyboard with customizable RGB lighting',
    price: 149.00,
    currency: 'USD',
    category: 'Accessories',
    brand: 'TechGear',
    sku: 'KBRGB01',
    stock: 75,
    status: 'draft',
    images: ['/api/placeholder/300/300'],
    rating: 4.4,
    reviews: 320,
    tags: ['gaming', 'mechanical'],
    createdAt: '2024-01-01',
    lastUpdated: '2024-01-10'
  }
];

const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Accessories', 'Gaming'];
const brands = ['All', 'Apple', 'Samsung', 'Sony', 'TechGear', 'Others'];

const getStatusIcon = (status) => {
  switch (status) {
    case 'active': return <Eye className="h-4 w-4 text-green-600" />;
    case 'out_of_stock': return <Package className="h-4 w-4 text-red-600" />;
    case 'draft': return <Edit className="h-4 w-4 text-gray-600" />;
    default: return <Package className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'out_of_stock': return 'bg-red-100 text-red-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
  });

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    outOfStock: products.filter(p => p.status === 'out_of_stock').length
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Product Catalog</h1>
            <p className="text-muted-foreground">Manage your product catalog for WhatsApp Commerce</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="Enter product name" />
                    </div>
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input id="sku" placeholder="Product SKU" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Product description" rows={3} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" placeholder="0.00" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="USD" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" placeholder="Product brand" />
                    </div>
                  </div>

                  <div>
                    <Label>Product Images</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop images here, or click to browse
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g., premium, bestseller, new" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="publish-immediately" />
                    <Label htmlFor="publish-immediately">Publish immediately</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Add Product
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold">{stats.activeProducts}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Catalog Value</p>
                  <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold">{stats.outOfStock}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <Badge className={getStatusColor(product.status)} variant="secondary">
                      {getStatusIcon(product.status)}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Stock: {product.stock}</span>
                    <span className="text-gray-600">SKU: {product.sku}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.brand}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {product.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-xs text-gray-500">
                      Updated {product.lastUpdated}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Add your first product to start building your catalog.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}