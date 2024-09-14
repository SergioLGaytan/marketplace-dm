import { LitElement } from 'lit';
import { BGADPRequestGet } from './BGADPRequestGet';

export class MarketplaceDm extends LitElement {
  static properties = {
    path: {type: String},
    categoriesResponse: {type: Array}
  };

  constructor() {
    super();
    this.path = 'sites/MLM';
    this.categoriesResponse = [];
  }

  async executeRequest(){
      try {
        const response = await BGADPRequestGet(this.path);
        this.mapInformation(response)
      } catch (error){
        console.log("Salió mal bb");
      }
    }

    mapInformation({categories}){
      this._customEvent("success-response", categories)
    }

    _customEvent(eventName, detail) {
      return this.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail
    }))
    }

    // construir template repasar destructurado, asincronismo, 
    // ejercicio para crear una calculadora con JS
}
