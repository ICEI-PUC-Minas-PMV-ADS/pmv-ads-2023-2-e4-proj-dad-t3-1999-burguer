import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class PedidosService {

    atualizarStatusPedido(id: any, status: any) {
        return this._api.crudGet(`/order/${id}`, {}, true)
    }
    
    constructor(
        private _api: ApiService
    ) { }

    exibirPedidos(payload: {}): Observable<any>{
        console.log(payload)
        console.log()
        return this._api.crudGet('/orders', payload, true)
    }

    buscarHistoricoPedidos(payload: any): Observable<any> {
        return this._api.crudGet(`/historico-pedidos`,payload, true );
      }

}
