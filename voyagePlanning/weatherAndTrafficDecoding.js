

export const WeatherDecoding= (weatherFactor)=>{

    if(weatherFactor<1){
        return "sunny"
    }else if(weatherFactor<2){
        
        return "cloudy"
    }else if(weatherFactor<3){
        return "windy"
    }else if(weatherFactor<4){
        return "rainy"
    }else if(weatherFactor<5){
        return "snowy"
    }else{



        return "stormy"
    }



}



export const TrafficDecoding = (trafficFactor)=>{

    if(trafficFactor<1){
        return "light";
    }else if(trafficFactor<2){
        return "moderate";
    }else{
        
        return "heavy";
    
    }


} 