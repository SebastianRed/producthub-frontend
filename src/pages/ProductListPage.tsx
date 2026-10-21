import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import {
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Package,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";


import styles from "./ProductListPage.module.css";

interface ProductRow {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

const mockProducts: ProductRow[] = [
  {
    id: 1,
    name: "Teclado mecánico",
    sku: "PRD-001",
    category: "Periféricos",
    price: 45990,
    stock: 2,
  },
  {
    id: 2,
    name: "Mouse inalámbrico",
    sku: "PRD-002",
    category: "Periféricos",
    price: 19990,
    stock: 3,
  },
  {
    id: 3,
    name: 'Monitor 24"',
    sku: "PRD-003",
    category: "Monitores",
    price: 129990,
    stock: 1,
  },
  {
    id: 4,
    name: "Audífonos Bluetooth",
    sku: "PRD-004",
    category: "Audio",
    price: 34990,
    stock: 18,
  },
  {
    id: 5,
    name: "Webcam Full HD",
    sku: "PRD-005",
    category: "Accesorios",
    price: 27990,
    stock: 12,
  },
  {
    id: 6,
    name: "SSD 1 TB",
    sku: "PRD-006",
    category: "Almacenamiento",
    price: 79990,
    stock: 0,
  },
  {
    id: 7,
    name: "Hub USB-C",
    sku: "PRD-007",
    category: "Accesorios",
    price: 24990,
    stock: 25,
  },
  {
    id: 8,
    name: "Parlante portátil",
    sku: "PRD-008",
    category: "Audio",
    price: 39990,
    stock: 8,
  },
];

const categories = [
  ...new Set(mockProducts.map((product) => product.category)),
].sort();

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);

function ProductListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock > 0 && product.stock <= 5) ||
      (stockFilter === "out" && product.stock === 0) ||
      (stockFilter === "available" && product.stock > 5);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize),
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;

  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStockChange = (value: string) => {
    setStockFilter(value);
    setCurrentPage(1);
  };

  useEffect(() => {
  getProducts()
    .then((page) => {
      console.log("Productos recibidos:", page.content);
      console.log("Total de productos:", page.totalElements);
      console.log("Total de páginas:", page.totalPages);
    })
    .catch((error: unknown) => {
      console.error("Error al consultar los productos:", error);
    });
}, []);

  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Productos</h1>
          <p className={styles.subtitle}>
            Administra los productos y controla el stock de tu inventario.
          </p>
        </div>

        <button className={styles.createButton} type="button">
          <Plus size={18} />
          <span>Nuevo producto</span>
        </button>
      </header>

      <div className={styles.summary}>
        <div className={styles.summaryIcon}>
          <Package size={22} />
        </div>

        <div>
          <p className={styles.summaryLabel}>Productos registrados</p>
          <p className={styles.summaryValue}>{mockProducts.length}</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            aria-label="Buscar productos por nombre o SKU"
          />
        </div>

        <div className={styles.filterWrapper}>
          <SlidersHorizontal size={17} className={styles.filterIcon} />

          <select
            className={styles.filterSelect}
            value={category}
            onChange={(event) => handleCategoryChange(event.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className={styles.filterSelect}
            value={stockFilter}
            onChange={(event) => handleStockChange(event.target.value)}
            aria-label="Filtrar por stock"
          >
            <option value="all">Todos los stocks</option>
            <option value="low">Stock bajo</option>
            <option value="out">Sin stock</option>
            <option value="available">Stock disponible</option>
          </select>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.tableTitle}>Listado de productos</h2>
            <p className={styles.tableSubtitle}>
              Consulta y revisa los productos registrados.
            </p>
          </div>

          <span className={styles.resultCount}>
            {filteredProducts.length} resultados
          </span>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th className={styles.actionsHeading}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map((product) => {
                const isOutOfStock = product.stock === 0;
                const isLowStock =
                  product.stock > 0 && product.stock <= 5;

                return (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.productIcon}>
                          <Package size={19} />
                        </div>

                        <div>
                          <span className={styles.productName}>
                            {product.name}
                          </span>
                          <span className={styles.productSku}>
                            {product.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={styles.category}>
                        {product.category}
                      </span>
                    </td>

                    <td className={styles.price}>
                      {formatPrice(product.price)}
                    </td>

                    <td className={styles.stock}>{product.stock} uds.</td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          isOutOfStock
                            ? styles.statusOut
                            : isLowStock
                              ? styles.statusLow
                              : styles.statusAvailable
                        }`}
                      >
                        <span className={styles.statusDot} />
                        {isOutOfStock
                          ? "Sin stock"
                          : isLowStock
                            ? "Stock bajo"
                            : "Disponible"}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionButton}
                          type="button"
                          aria-label={`Ver ${product.name}`}
                          title="Ver detalle"
                          disabled
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          className={styles.actionButton}
                          type="button"
                          aria-label={`Editar ${product.name}`}
                          title="Editar producto"
                          disabled
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          type="button"
                          aria-label={`Eliminar ${product.name}`}
                          title="Eliminar producto"
                          disabled
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    <Package size={28} />
                    <span>No se encontraron productos.</span>
                    <p>Prueba con otro nombre o cambia los filtros.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className={styles.pagination}>
          <span className={styles.paginationInfo}>
            {filteredProducts.length === 0
              ? "Sin resultados"
              : `Mostrando ${startIndex + 1}–${Math.min(
                  startIndex + pageSize,
                  filteredProducts.length,
                )} de ${filteredProducts.length} productos`}
          </span>

          <div className={styles.paginationControls}>
            <button
              className={styles.pageButton}
              type="button"
              aria-label="Página anterior"
              disabled={safePage === 1}
              onClick={() => setCurrentPage(safePage - 1)}
            >
              <ChevronLeft size={18} />
            </button>

            <span className={styles.currentPage}>{safePage}</span>

            <button
              className={styles.pageButton}
              type="button"
              aria-label="Página siguiente"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(safePage + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default ProductListPage;