import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { cloneDeep } from 'lodash-es';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import LoadingAnimation from '../components/Loading';
import * as ApiService from '../services/api.service';
import * as CarrinhoService from '../services/carrinho.service';

const Cardapio = () => {

    const [loading, setLoading] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});

    useEffect(() => {

        const getLista = async () => {

            setLoading(true)

            const result = await ApiService.crudGet('/cardapio', { filter: { status: true } }, false);

            setLoading(false)

            if (result.error) {

                Toast.show({
                    type: 'success',
                    text1: 'Erro ao carregar cardápio!',
                    text2: `${result.error.message}`,
                    position: 'bottom'
                });

            } else if (result.res?.length) {

                setProdutos(result.res);

            }

        };

        getLista();

    }, []);

    const _handleAddCarrinho = async (produto) => {

        let quantidade = +(selectedValue[produto.id] || 1);

        setSelectedValue({});

        let prodCarrinho = cloneDeep(produto);

        prodCarrinho.quantidade = quantidade;

        await CarrinhoService.setProdutoCarrinho(prodCarrinho);

        Toast.show({
            type: 'success',
            text1: `${produto.nome} adicionado!`,
            position: 'bottom'
        });

    }

    const _handleAtualizaValorSelecionado = (produtoId, valor) => {

        if (!selectedValue) setSelectedValue({});
        selectedValue[produtoId] = valor;

    }

    return (
        <>
            { loading && <LoadingAnimation/> }
            <Header>
            </Header>

            <Body>
                <FlatList
                    style={styles.listaProdutos}
                    data={produtos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.produto}>
                            <View style={styles.infos}>
                                <View style={styles.blocoDescricao}>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                    <Text style={styles.descricao}>{item.descricao}</Text>
                                </View>

                                <View style={styles.blocoImagem}>
                                    <Image style={styles.imagem} source={item.imagem || require('../../assets/burguer.png')} />
                                    <Text style={styles.valor}>R$ {(+item.valor).toFixed(2).replace('.', ',')}</Text>
                                </View>
                            </View>

                            <View style={styles.botoes}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={selectedValue[item.id]}
                                    onValueChange={(itemValue, itemIndex) => _handleAtualizaValorSelecionado(item.id, itemValue)}>
                                    <Picker.Item key={1} label={1} value={1} />
                                    <Picker.Item key={2} label={2} value={2} />
                                    <Picker.Item key={3} label={3} value={3} />
                                    <Picker.Item key={4} label={4} value={4} />
                                    <Picker.Item key={5} label={5} value={5} />
                                    <Picker.Item key={6} label={6} value={6} />
                                    <Picker.Item key={7} label={7} value={7} />
                                    <Picker.Item key={8} label={8} value={8} />
                                    <Picker.Item key={9} label={9} value={9} />
                                    <Picker.Item key={10} label={10} value={10} />
                                </Picker>

                                <Pressable style={styles.btnAddCarrinho} onPress={() => _handleAddCarrinho(item)}>
                                    <FontAwesome5
                                        style={styles.iconeAddCarrinho}
                                        name="cart-plus">
                                    </FontAwesome5>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </Body>

            <Footer tabIndex={0} />
        </>
    );

}
export default Cardapio;

const styles = StyleSheet.create({
    listaProdutos: {
        width: '100%',
        marginTop: '1rem',
        paddingHorizontal: '1rem',
    },
    produto: {
        width: '100%',
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        marginBottom: '2rem',
        paddingVertical: '0.5rem',
        paddingHorizontal: '0.5rem',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    infos: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "start",
        gap: '0.75rem'
    },
    blocoDescricao: {
        flexDirection: 'column',
        flex: 'auto'
    },
    nome: {
        fontSize: '22px',
        fontWeight: '500',
        marginBottom: '1rem'
    },
    descricao: {
        fontSize: '16px'
    },
    blocoImagem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    imagem: {
        maxWidth: '100%',
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        position: 'relative',
        marginBottom: '0.5rem'
    },
    valor: {
        fontSize: '20px',
        fontWeight: '600'
    },
    botoes: {
        marginTop: '1rem',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'flex-end'
    },
    picker: {
        height: '40px',
        width: '100px',
        borderRadius: '8px'
    },
    btnAddCarrinho: {
        width: '50px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        padding: '0.4rem',
        borderRadius: '8px',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconeAddCarrinho: {
        color: '#fff',
        fontSize: '30px'
    }
});