
export class ConstantesModule {

}
export interface ConstantesConfig {
  
  BASE_URL:string;

}

export const APPCONFIG:ConstantesConfig = {
  
  BASE_URL: 'http://localhost:5000/api',
  //BASE_URL: 'http://192.168.1.115:5001/api', en produccion
 
};