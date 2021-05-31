
import '../../App.css';
import React from "react";
import HorizontalItem from "./HorizontalItem";
class HorizontalItemLList extends React.Component {
    constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "Pendant earrings",
          imageUrl: "assets/img/trend/ht-1.jpg",
          
          price: "$ 59.0",
          
        },
        {
         title: "Cotton T-Shirt",
          imageUrl: "assets/img/trend/ht-3.jpg",
         
          price: "$ 49.0",
         
        },
        {
          title: "Cotton T-Shirt",
          imageUrl: "/assets/img/trend/ht-3.jpg",
         
          price: "$ 59.0",
          
        }
      ]
    };
  }

  render() {
  return (
    
            
            <div class="trend__content">
            <div class="section-title">
            <h4>{this.props.topic}</h4>
            </div>
              
            
           
         {this.state.sections.map(({ title, imageUrl, price }) => (
          <HorizontalItem
            
            title={title}
            imageUrl={imageUrl}
           
            price={price}
           
          />
        ))}
            </div>
         
           
           
     
          
    
  );
}
}
export default HorizontalItemLList;
