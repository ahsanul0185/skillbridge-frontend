import { Navbar } from "@/components/layout/Navbar";
import { menuItems } from "@/constants/menuItems";
import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";
import { User } from "@/types";

export default async function CommonLayout({children} : {children : React.ReactNode}) {

  const {data} = await userService.getSession();
  const {data : categoryData} = await categoryService.getAllCategories();

  const menu = [...menuItems, {title : "Categories", url : "#", items : categoryData.data}]

  console.log(menu)
  return (
    <div>
        <Navbar user={data.user as User} menu={menu}/>
        {/* <Navbar/> */}
        <div className="container mx-auto px-4 ">
          {children}
        </div>
    </div>
  )
}
