import { html, css, LitElement } from 'lit';
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
    this.addEventListener("success-response", ({detail}) => {
      this.categoriesResponse = detail
    })
  }

  async executeRequest(){
      try {
        const response = await BGADPRequestGet(this.path);
        this.mapInformation(response)
      } catch (error){
        console.log("Salió mal bb");
      }
    }

    // Destructurar a categories
    // Emitir un evento y enviar el array de categories
    mapInformation({categories}){
      this._customEvent("success-response", categories)
    }

    // Va a listar en un html cada item
    get _buildListItems() {
      return html`
      ${this.categoriesResponse.map(({name}) => html`
      <p>${name}</p>
          `)}
      `
    }

    // Emisión de eventos
    _customEvent(eventName, detail) {
      return this.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail
    }))
    }

    // construir template repasar destructurado, asincronismo, 
    // ejercicio para crear una calculadora con JS
    render() {
      return html`
      ${this._buildListItems}
      `;
    }
}
