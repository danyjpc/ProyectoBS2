
export class ConstantesModule {

}
export interface ConstantesConfig {
  
  BASE_URL:string;

}

export const APPCONFIG:ConstantesConfig = {
  
 //BASE_URL: 'http://localhost:5000/api',
 BASE_URL: 'http://192.168.99.100:5000/api', //Prueba en docker-toolbox
  //BASE_URL: 'http://192.168.43.214:5000/api', //en produccion
 
};