import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"
import { useParams } from "react-router"

export const GenderPage = () => {

  const {data} = useProducts();

  const { gender } = useParams();

  const genderLabel = gender === 'men' ? 'hombres' : gender === 'women' ? 'mujeres' : 'niños';

  return (
    <>
          <CustomJumbotron title={`Productos para ${genderLabel}`}/>
    
          <ProductsGrid products={data?.products || []}/>
    
          <CustomPagination totalPages={data?.pages || 1}/>
    </>
  )
}
