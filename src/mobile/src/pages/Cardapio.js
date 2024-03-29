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
                                    <Picker.Item style={styles.pickerItem} key={1} label={1} value={1} />
                                    <Picker.Item style={styles.pickerItem} key={2} label={2} value={2} />
                                    <Picker.Item style={styles.pickerItem} key={3} label={3} value={3} />
                                    <Picker.Item style={styles.pickerItem} key={4} label={4} value={4} />
                                    <Picker.Item style={styles.pickerItem} key={5} label={5} value={5} />
                                    <Picker.Item style={styles.pickerItem} key={6} label={6} value={6} />
                                    <Picker.Item style={styles.pickerItem} key={7} label={7} value={7} />
                                    <Picker.Item style={styles.pickerItem} key={8} label={8} value={8} />
                                    <Picker.Item style={styles.pickerItem} key={9} label={9} value={9} />
                                    <Picker.Item style={styles.pickerItem} key={10} label={10} value={10} />
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
        marginTop: 16,
        paddingHorizontal: 16,
    },
    produto: {
        width: '100%',
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginBottom: 32,
        paddingVertical: 8,
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    infos: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "start",
        gap: 12
    },
    blocoDescricao: {
        flexDirection: 'column',
        flex: 'auto'
    },
    nome: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 16
    },
    descricao: {
        fontSize: 16
    },
    blocoImagem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    imagem: {
        maxWidth: '100%',
        width: 80,
        height: 80,
        borderRadius: 8,
        position: 'relative',
        marginBottom: 8
    },
    valor: {
        fontSize: 20,
        fontWeight: '600'
    },
    botoes: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 16,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    picker: {
        height: 40,
        width: 64,
        borderRadius: 8,
        fontSize: 18,
        textAlign: 'center'
    },
    pickerItem: {
        fontSize: 24
    },
    btnAddCarrinho: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        padding: 6.4,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconeAddCarrinho: {
        color: '#fff',
        fontSize: 22
    }
});