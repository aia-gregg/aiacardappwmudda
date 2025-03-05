import React from 'react';
import { View, FlatList } from 'react-native';
import BalanceCard from '../../components/Card/BalanceCard';

const cardData = [
    {
        id : '1',
        balance : '$1,450,987',
        expires : '06/28',
        number : '**********2595',
    },
    {
        id : '2',
        balance : '$9,865',
        expires : '06/28',
        number : '**********2595',
    },
    {
        id : '3',
        balance : '$15,180.50',
        expires : '06/28',
        number : '**********2595',
    },
]

const Cards = () => {
    return (
        <View
            style={{
                marginHorizontal:-15,
            }}
        >
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal:15,
                    paddingTop:25,
                    paddingBottom:10,
                }}
                data={cardData}
                renderItem={({item}) => 
                    <BalanceCard 
                        balance={item.balance}
                        expires={item.expires}
                        number={item.number}
                    />
                }
                keyExtractor={(item:any) => item.id}
            />
        </View>
    )
}

export default Cards;