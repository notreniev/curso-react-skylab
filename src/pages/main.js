import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    
    static navigationOptions = {
        title: "JSHunt"
    };

    state = {
        productInfo: {},
        docs: [],
        page: 1
    }

    componentDidMount(){
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productInfo } = response.data

        this.setState({
            docs: [...this.state.docs, ...docs], 
            productInfo,
            page
        })
    }
    
    renderItem = ({item}) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text srtyles={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.productButton} onPress={() => {
                this.props.navigation.navigate('Product', { product: item })
            }}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    loadMore = () => {
        const { page, productInfo } = this.state
        if (page === productInfo.pages) return

        const pageNumber = page + 1
        this.loadProducts(pageNumber)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.docs}
                contentContainerStyle={styles.list}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    productTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    productDescription:{
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    productButtonText:{
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    }
})



