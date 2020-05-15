
export class ConstantesModule {

}
export interface ConstantesConfig {
  
  BASE_URL:string;

}

export const APPCONFIG:ConstantesConfig = {
  
  BASE_URL: 'http://localhost:5000/api',
  //BASE_URL: 'http://13.58.141.161:5000/api', //Prueba CI/CD
 //BASE_URL: 'http://192.168.43.214:5000/api', //en produccion
 
};