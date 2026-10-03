import { AlertTriangle } from "lucide-react";

import styles from "./LowStockTable.module.css";

interface LowStockProduct {
  id: number;
  name: string;
  stock: number;
}

interface LowStockTableProps {
  products: LowStockProduct[];
}

export default function LowStockTable({
  products,
}: LowStockTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Productos con bajo stock</h2>
          <p>Productos que requieren atención.</p>
        </div>

        <AlertTriangle className={styles.headerIcon} />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td className={styles.stock}>
                  {product.stock}
                </td>

                <td>
                  <span
                    className={
                      product.stock === 1
                        ? styles.critical
                        : styles.warning
                    }
                  >
                    {product.stock === 1 ? "Crítico" : "Bajo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}