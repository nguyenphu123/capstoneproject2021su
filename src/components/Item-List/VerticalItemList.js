import logo from '../../logo.svg';
import '../../App.css';
import React from "react";

import VerticalItem from "./VerticalItem";

class VerticalItemList extends React.Component {
    constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "Buttons tweed blazer",
          imageUrl: "assets/img/product/product-1.jpg",
          label: "new",
          price: "$ 59.0",
          mix:""
        },
        {
         title: "Flowy striped skirt",
          imageUrl: "assets/img/product/product-2.jpg",
          label: "",
          price: "$ 49.0",
          mix:""
        },
        {
          title: "Cotton T-Shirt",
          imageUrl: "assets/img/product/product-3.jpg",
          label: "stockout",
          price: "$ 59.0",
          mix:""
        },
        {
         title: "Slim striped pocket shirt",
          imageUrl: "assets/img/product/product-4.jpg",
          label: "",
          price: "$ 59.0",
          mix:""
        },
        {
          title: "Fit micro corduroy shirt",
          imageUrl: "assets/img/product/product-5.jpg",
          label: "",
          price: "$ 59.0",
          mix:""
        }, 
        {
          title: "Tropical Kimono",
          imageUrl: "assets/img/product/product-6.jpg",
          label: "sale",
          price: "$ 49.0 ",
          mix:"women men kid accessories cosmetic"
        }, 
        {
          title: "Contrasting sunglasses",
          imageUrl: "assets/img/product/product-7.jpg",
          label: "",
          price: "$ 59.0",
          mix:"women men kid accessories cosmetic"
        }, 
        {
          title: "Water resistant backpack",
          imageUrl: "assets/img/product/product-8.jpg",
          label: "sale",
          price: "$ 49.0 ",
          mix:"women men kid accessories cosmetic"
        }
      ]
    };
  }

  render() {
   
  return (
    
      <section class="product spad">
             
           <div class="container">
             
           <div class="col-lg-4 col-md-4">
           
            <div class="section-title">
            <h4>{this.props.topic}</h4>
          
            </div>
            </div>
              <div class="row">
            
          
         {this.state.sections.map(({ title, imageUrl, label, price, mix }) => (
          <VerticalItem
            
            title={title}
            imageUrl={imageUrl}
            label={label}
            price={price}
            mix={mix}
          />
        ))}
            
            
            
           
            
          
            
            
           

            </div>
                  </div>
          
            </section>
          
    
  );
}
}
export default VerticalItemList;
