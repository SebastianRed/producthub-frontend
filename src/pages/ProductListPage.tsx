import { useEffect, useState } from "react";
import {
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

import { getProducts } from "../services/productService";
import type { ProductApi } from "../types/productApi";
import styles from "./ProductListPage.module.css";

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
}

function ProductListPage() {
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  // La API utiliza páginas basadas en cero.
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 10;

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const filters = {
          ...(categoryId !== "" && {
            categoryId: Number(categoryId),
          }),
          ...(stockFilter === "low" && {
            stockMin: 1,
          }),
          ...(stockFilter === "out" && {
            stockMin: 0,
          }),
        };

        const page = await getProducts({
          page: currentPage,
          size: pageSize,
          sort: "name,asc",
          filters,
        });

        if (cancelled) {
          return;
        }

        setProducts(page.content);
        setTotalElements(page.totalElements);
        setTotalPages(page.totalPages);
      } catch {
        if (!cancelled) {
          setError(
            "No fue posible cargar los productos. Inténtalo nuevamente.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [currentPage, categoryId, stockFilter]);

  // La API no ofrece un parámetro de búsqueda por nombre o SKU.
  // Por ahora, la búsqueda se limita a los productos de la página actual.
  const visibleProducts = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(searchTerm) ||
      String(product.id).includes(searchTerm)
    );
  });

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setCurrentPage(0);
  };

  const handleStockChange = (value: string) => {
    setStockFilter(value);
    setCurrentPage(0);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

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
          <p className={styles.summaryValue}>{totalElements}</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />

          <input
            className={styles.searchInput}
            type="search"
            placeholder="Buscar por nombre o ID..."
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            aria-label="Buscar productos por nombre o identificador"
          />
        </div>

        <div className={styles.filterWrapper}>
          <SlidersHorizontal
            size={17}
            className={styles.filterIcon}
          />

          <select
            className={styles.filterSelect}
            value={categoryId}
            onChange={(event) => handleCategoryChange(event.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>

            {Array.from(
              new Map(
                products.map((product) => [
                  product.categoryId,
                  product.categoryName,
                ]),
              ),
            ).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
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
            {isLoading ? "Cargando..." : `${visibleProducts.length} resultados`}
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
              {isLoading && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    Cargando productos...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    <span>{error}</span>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => page)}
                    >
                      Reintentar
                    </button>
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                visibleProducts.map((product) => {
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
                              ID: {product.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className={styles.category}>
                          {product.categoryName}
                        </span>
                      </td>

                      <td className={styles.price}>
                        {formatPrice(product.price)}
                      </td>

                      <td className={styles.stock}>
                        {product.stock} uds.
                      </td>

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

              {!isLoading &&
                !error &&
                visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.emptyState}>
                      <Package size={28} />
                      <span>No se encontraron productos.</span>
                      <p>
                        Prueba con otro nombre o cambia los filtros.
                      </p>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        <footer className={styles.pagination}>
          <span className={styles.paginationInfo}>
            {totalElements === 0
              ? "Sin productos"
              : `Página ${currentPage + 1} de ${totalPages} · ${totalElements} productos`}
          </span>

          <div className={styles.paginationControls}>
            <button
              className={styles.pageButton}
              type="button"
              aria-label="Página anterior"
              disabled={isLoading || currentPage === 0}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ChevronLeft size={18} />
            </button>

            <span className={styles.currentPage}>
              {currentPage + 1}
            </span>

            <button
              className={styles.pageButton}
              type="button"
              aria-label="Página siguiente"
              disabled={
                isLoading ||
                totalPages === 0 ||
                currentPage >= totalPages - 1
              }
              onClick={() => goToPage(currentPage + 1)}
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