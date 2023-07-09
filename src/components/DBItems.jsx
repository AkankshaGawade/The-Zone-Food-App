import React from "react";
import { DataTable } from "../components";
import { HiCurrencyRupee } from "../assets/icons";
import { useSelector } from "react-redux";

const DBItems = () => {
  const products =useSelector(state=>state.products)
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-2xl font-semibold text-textColor">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
       
        ]}
        Data={products}
        title="List of products"
        actions={[
          {
            icon:"edit",
            tooltip:"Edit data",
            onClick:(event,rowData)=>{
                alert("You want to delete "+rowData.productId);
            }
          }
        ]}
      />
           
    </div>
  );
};

export default DBItems;
