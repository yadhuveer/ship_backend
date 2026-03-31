export class VoyageModel{

    constructor(userId,origin,destination,distance,cargo,originPort,destinationPort,predictedETA,feedBackETA,predictedFuel,feedBackFuel,speed,weatherFactor,weather,TrafficFactor,Traffic,portPath,reqPath){

        this.userId=userId;
        this.origin=origin;
        this.destination=destination;
        this.distance=distance;
        this.cargo=cargo;

        this.originPort=originPort;
        this.destinationPort=destinationPort;
        this.predictedETA=predictedETA;
        this.feedBackETA=feedBackETA;
        this.predictedFuel=predictedFuel;
        this.feedBackFuel=feedBackFuel;
        this.speed=speed;
        this.weatherFactor=weatherFactor;
        this.weather=weather;

        this.TrafficFactor=TrafficFactor;
        this.Traffic=Traffic;
        this.portPath=portPath;
        this.reqPath=reqPath;


    }

}