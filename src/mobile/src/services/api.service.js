import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://1999-burguer-api.vercel.app/api/v1';
// const apiUrl = 'http://localhost:3000/api/v1';

const getHeaders = async (auth = false) => {

    let headers = {};

    headers['Content-Type'] = 'application/json';

    let userMem = await AsyncStorage.getItem('usuario');
    const usuarioLogado = userMem ? JSON.parse(userMem) : null;
    
    if (auth && usuarioLogado) {
        headers['Authorization'] = `Bearer ${usuarioLogado.accessToken}`;
    }

    return headers;

}

/**
 * GET
 */
export const crudGet = async (rota, query, auth = true) => {
    
    return new Promise(async (resolve, reject) => {

        try {

            const result = await axios({
                method: 'get',
                url: `${apiUrl}${rota}`,
                headers: await getHeaders(auth),
                params: {
                    filter: JSON.stringify(query)
                }
            });

            resolve({ res: result?.data || null });

        } catch (error) {

            resolve({ error });

        }

    });

};

/**
 * GET BY ID
 */
export const crudGetById = async (rota, id, auth = true) => {

    return new Promise(async (resolve, reject) => {

        try {

            fetch(`${apiUrl}${rota}/${id}`, {
                method: 'GET',
                headers: await getHeaders(auth)
            })
            .then((response) => response.json())
            .then((json) => resolve({ res: json }));

        } catch (error) {

            resolve({ error });

        }

    });

};

/**
 * POST
 */
export const crudPost = async (rota, body, params, auth = true) => {

    return new Promise(async (resolve, reject) => {

        try {

            let headers = await getHeaders(auth);

            fetch(`${apiUrl}${rota}${params ? `?${params}` : ''}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })
            .then((response) => response.json())
            .then((json) => resolve({ res: json }));

        } catch (error) {

            resolve({ error });

        }

    });

};


export const apiLogin = async (rota, body) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(`${apiUrl}${rota}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
            .then((json) => resolve({ res: json }));
        } catch (error) {
            resolve({ error });
        }
    })
}

export const apiCadastro = async (rota, body) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(`${apiUrl}${rota}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
            .then((json) => resolve({ res: json }));
        } catch (error) {
            resolve({ error });
        }
    })
}

/**
 * PUT
 */
export const crudPut = async (rota, body, auth = true) => {

    return new Promise(async (resolve, reject) => {

        try {

            fetch(`${apiUrl}${rota}/${id}`, {
                method: 'PUT',
                body,
                headers: await getHeaders(auth)
            })
            .then((response) => response.json())
            .then((json) => resolve({ res: json }));

        } catch (error) {

            resolve({ error });

        }

    });

};

/**
 * DELETE
 */
export const crudDelete = async (rota, id, auth = true) => {

    return new Promise(async (resolve, reject) => {

        try {

            // let headers = await getHeaders(auth);

            // fetch(`${apiUrl}${rota}/${id}`, {
            //     method: 'DELETE',
            //     headers
            // })
            // .then((response) => response.json())
            // .then((json) => resolve({ res: json }));

        } catch (error) {

            resolve({ error });

        }

    });

};