import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock product dataset using local images
const products = [
  { id: 1, title: 'Intricate Gold Embroidery Blouse', fabric: 'Silk', occasion: 'Bridal', img: '/images/159619685_1184690468639569_590223834013184851_n.jpg' },
  { id: 2, title: 'Pastel Floral Festive Set', fabric: 'Cotton', occasion: 'Festive', img: '/images/166711274_1194599050982044_6270426226883514264_n.jpg' },
  { id: 3, title: 'Royal Crimson Zardosi Blouse', fabric: 'Silk', occasion: 'Bridal', img: '/images/472501964_2109710246137582_1686977478784632714_n.jpg' },
  { id: 4, title: 'Elegant Ivory Silk Suit', fabric: 'Silk', occasion: 'Festive', img: '/images/473524949_2120114618430478_169379780733222852_n.jpg' },
  { id: 5, title: 'Mint Green Embroidery Detail', fabric: 'Cotton', occasion: 'Casual', img: '/images/480570600_1076526654487711_3924801425631528700_n.jpg' },
  { id: 6, title: 'Classic Charcoal Silk Blouse', fabric: 'Silk', occasion: 'Party', img: '/images/477063021_1066180105522366_5657374101924216005_n.jpg' },
  { id: 7, title: 'Handcrafted Beadwork Blouse', fabric: 'Silk', occasion: 'Bridal', img: '/images/480706275_2147161119059161_3844977769859544022_n.jpg' },
  { id: 8, title: 'Deep Emerald Festive Gown', fabric: 'Georgette', occasion: 'Festive', img: '/images/481001969_1076526647821045_4152357952502763403_n.jpg' },
  { id: 9, title: 'Traditional Red Bridal Blouse', fabric: 'Silk', occasion: 'Bridal', img: '/images/481221441_2147162539059019_2548166908990516478_n.jpg' },
  { id: 10, title: 'Contemporary Cotton Chic', fabric: 'Cotton', occasion: 'Casual', img: '/images/482238873_1087318246741885_790327867538979276_n.jpg' },
  { id: 11, title: 'Midnight Black Party Wear', fabric: 'Georgette', occasion: 'Party', img: '/images/483526126_1093693992770977_1618860359566028370_n.jpg' },
  { id: 12, title: 'Sophisticated Slate Ensemble', fabric: 'Silk', occasion: 'Festive', img: '/images/484346869_1093702669436776_2951272808785275227_n.jpg' },
  { id: 13, title: 'Sunshine Yellow Celebration', fabric: 'Cotton', occasion: 'Festive', img: '/images/485065848_1093951916078518_6494842611118841167_n.jpg' },
  { id: 14, title: 'Luxury Lavender Embroidery', fabric: 'Silk', occasion: 'Bridal', img: '/images/486120513_1097000309107012_8322201134060825428_n.jpg' },
  { id: 15, title: 'Regal Ruby Red Lehenga', fabric: 'Silk', occasion: 'Bridal', img: '/images/486169833_1099486662191710_9146049030650242459_n.jpg' },
];

const allFabrics = ['All', 'Silk', 'Cotton', 'Georgette'];
const allOccasions = ['All', 'Bridal', 'Festive', 'Casual', 'Party'];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFabric = selectedFabric === 'All' || product.fabric === selectedFabric;
      const matchOccasion = selectedOccasion === 'All' || product.occasion === selectedOccasion;
      return matchSearch && matchFabric && matchOccasion;
    });
  }, [searchTerm, selectedFabric, selectedOccasion]);

  return (
    <section className="py-24 px-4 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-charcoal tracking-tight mb-4">The Lookbook</h2>
          <p className="text-charcoal/60 text-lg font-light max-w-2xl mx-auto">
            Explore our curated collection of custom-tailored creations. Let these inspire your next masterpiece.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search designs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all text-sm font-light"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {/* Fabric Filter */}
            <div className="flex gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
              {allFabrics.map(fab => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${selectedFabric === fab ? 'bg-white shadow-sm text-charcoal' : 'text-gray-400 hover:text-charcoal'}`}
                >
                  {fab}
                </button>
              ))}
            </div>
            
            {/* Occasion Filter */}
            <div className="flex gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
              {allOccasions.map(occ => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${selectedOccasion === occ ? 'bg-white shadow-sm text-charcoal' : 'text-gray-400 hover:text-charcoal'}`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-gray-100">
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-charcoal">{product.title}</h3>
                    <p className="text-sm font-light text-gray-400 mt-1">{product.fabric} &middot; {product.occasion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-light">
            No designs found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
}
