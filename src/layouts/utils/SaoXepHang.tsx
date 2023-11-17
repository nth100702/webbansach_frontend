import {StarFill}from "react-bootstrap-icons";
import {Star}from "react-bootstrap-icons";
import {StarHalf}from "react-bootstrap-icons";

const renderRating =(diem: number)=>{
    const stars = [];
    for(let i=1;i<=5;i++){
        if(i<=diem){
            stars.push(<StarFill className="text-warning"/>);
        }else{
            if(i<(diem+1) && (i-diem)!=0){
                stars.push(<StarHalf className="text-warning"/>);
            }else if(i>=diem){
                stars.push(<Star className="text-warning"/>);
            }
            
        }

    }
    return stars;
}
export default renderRating;