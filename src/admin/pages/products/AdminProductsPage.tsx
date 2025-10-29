import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProducts } from "@/shop/hooks/useProducts"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { ProductRow } from "./ProductRow"
import type { Product } from '../../../interfaces/product.interface';
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"

export const AdminProductsPage = () => {

  const { data, isLoading } = useProducts();

  if( isLoading ){
    return <CustomFullScreenLoading/>
  }

  return (
    <>

      <div className="flex justify-between items-center">
        <AdminTitle title="Productos" subtitle="Aquí puedes y administrar los productos"/>
        <div className="flex justify-end mb-10 gap-4">
          <Link to={'/admin/products/new'}>
            <Button>
              <PlusIcon/>
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>


      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data?.products.map((product: Product) => {
              return(
                <ProductRow key={product.id} product={product}></ProductRow>
              )
            })
          }
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0}/>
    </>
  )
}
