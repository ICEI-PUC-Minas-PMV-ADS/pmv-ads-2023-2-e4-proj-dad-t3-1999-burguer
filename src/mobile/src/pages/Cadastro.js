import { Text } from 'react-native-paper';

import Body from '../components/Body';
import Footer from '../components/Footer';
import { useState } from 'react';
import React from 'react';
import { StyleSheet, Button, TextInput, Modal, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cadastroUsuario } from '../services/cadastro.service';
import Login from './Login';

const Cadastro = () => {

    const navigation = useNavigation();

    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [complemento, setComplemento] = useState('');
    const [ponto_referencia, setPontoReferencia] = useState('');
    const [telefone, setTelefone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const validarEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validarSenha = (senha) => {
        if (senha.length < 8) {
            return 'A senha deve ter pelo menos 8 caracteres.';
        }
        if (!/\d/.test(senha)) {
            return 'A senha deve conter pelo menos um número.';
        }
        if (!/[A-Z]/.test(senha)) {
            return 'A senha deve conter pelo menos uma letra maiúscula.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            return 'A senha deve conter pelo menos um caractere especial.';
        }
        return '';
    };

    const cadastrar = async () => {
        if (!validarEmail(email)) {
            setModalMessage('E-mail inválido. Por favor, insira um e-mail válido.');
            setModalVisible(true);
            return;
        }
        const senhaValidacao = validarSenha(senha);
        if (senhaValidacao !== '') {
            setModalMessage(senhaValidacao);
            setModalVisible(true);
            return;
        }
       console.log( await cadastroUsuario(
            nome,
            email,
            senha,
            endereco,
            numero,
            bairro,
            cidade,
            cep,
            uf,
            complemento !== "" ? complemento : null,
            ponto_referencia !== "" ? ponto_referencia : null,            
            telefone
        ).then());

        navigation.navigate('Login');
    }

    return (
        <View style={{ marginTop: 250}}>
            <Text style={styles.titulo}>
                Cadastro
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                keyboardType="string"
                value={nome}
                onChangeText={(texto) => setNome(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType="string"
                value={email}
                onChangeText={(texto) => setEmail(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                keyboardType="string"
                value={senha}
                onChangeText={(texto) => setSenha(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Endereço"
                keyboardType="string"
                value={endereco}
                onChangeText={(texto) => setEndereco(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Numero"
                keyboardType="string"
                value={numero}
                onChangeText={(texto) => setNumero(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Bairro"
                keyboardType="string"
                value={bairro}
                onChangeText={(texto) => setBairro(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Cidade"
                keyboardType="string"
                value={cidade}
                onChangeText={(texto) => setCidade(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="CEP"
                keyboardType="string"
                value={cep}
                onChangeText={(texto) => setCep(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="UF"
                keyboardType="string"
                value={uf}
                onChangeText={(texto) => setUf(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Complemento"
                keyboardType="string"
                value={complemento}
                onChangeText={(texto) => setComplemento(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Ponto de Referência"
                keyboardType="string"
                value={ponto_referencia}
                onChangeText={(texto) => setPontoReferencia(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="number"
                value={telefone}
                onChangeText={(texto) => setTelefone(texto)}
            />

            <Button
                title="Cadastrar"
                color='red'
                onPress={cadastrar}
            />

            <Button
                title="Voltar"
                color='grey'
                onPress={() => { navigation.navigate('Login');	}}
            />

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <Button title="OK" onPress={() => setModalVisible(false)}  color="red"/>
                    </View>
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,

    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    modalMessage: {
        marginBottom: 10
    }
});

export default Cadastro;