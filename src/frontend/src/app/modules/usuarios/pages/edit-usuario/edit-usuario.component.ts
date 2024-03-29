import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../usuarios.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-usuario',
    templateUrl: './edit-usuario.component.html',
    styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {
    userForm!: FormGroup;


    constructor(private _api: UsuarioService, private router: Router) {}

    ngOnInit() {
        this.userForm = new FormGroup({
            email: new FormControl(''),
            nome: new FormControl()
        });

        this.carregarUsuario();
    }

    carregarUsuario() {
        this._api.exibirUsuario().subscribe((userData) => {
            this.userForm.setValue({
                email: userData.email,
                nome: userData.nome || '' // Inicialize com uma string vazia se for nulo
            });
        });
    }

    onSubmit() {
        const dadosAtualizados = this.userForm.value;
        this._api.editarUsuario(dadosAtualizados).subscribe(
            (response) => {
                this.router.navigate(['pedidos/home']);
            },
            (error) => {
               console.log(error)
            }
    )}

    Deslogar(){
        localStorage.removeItem('1999Burger.access_token');
        localStorage.removeItem('1999Burger.user_id');
        this.router.navigate(['sessao/login']);
    }
}
