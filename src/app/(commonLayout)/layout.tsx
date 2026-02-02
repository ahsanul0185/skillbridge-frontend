import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { menuItems } from "@/constants/menuItems";
import { categoryService } from "@/services/category.service";

export default async function CommonLayout({children} : {children : React.ReactNode}) {

  const {data : categoryData} = await categoryService.getAllCategories();

  const menu = [...menuItems, {title : "Categories", url : "#", items : categoryData?.data}]

  return (
    <div>
        <Navbar menu={menu} className="sticky left-0 top-0"/>
        <div>
          {children}
        </div>
        <Footer />
    </div>
  )
}
