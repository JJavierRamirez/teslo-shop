import { TableRow, TableCell } from "@/components/ui/table"
import type { Product } from "@/interfaces/product.interface"
import { currencyFormatter } from "@/lib/currencyFormatter"
// import { PencilIcon } from "lucide-react"
import { Link } from "react-router"

interface Props{
    product: Product
}

export const ProductRow = ({product}: Props) => {
  return (
    <TableRow>
        <TableCell>
            <img 
            src={product.images[1]}
            alt={product.title}
            className="w-20 h-20 object-cover rounded-md"
            />
        </TableCell>
        <TableCell>
          <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline">
          {product.title}  
          </Link>
        </TableCell>
        <TableCell>{currencyFormatter(product.price)}</TableCell>
        <TableCell>{product.tags.join(',') || ''}</TableCell>
        <TableCell>{product.stock}</TableCell>
        <TableCell>{product.sizes.join(',')}</TableCell>
        <TableCell className="text-right">
            <Link to={`/admin/products/${product.id}`}>
              Editar
              {/* <PencilIcon className="w-4 h-4 text-blue-500"/> */}
            </Link>
        </TableCell>
    </TableRow>
  )
}
