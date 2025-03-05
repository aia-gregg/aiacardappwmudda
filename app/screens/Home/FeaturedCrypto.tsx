import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WalletList from '../../components/List/WalletList';
import { IMAGES } from '../../constants/Images';

const FeaturedCrypto = () => {
  // Define tokens in the exact order
  const initialData = [
    {
      image: IMAGES.aiat,
      name: 'AI Analysis Token',
      tag: '$AIAT',
      price: '',    // Real price in USDT to be updated
      change: '',   // 24h % change to be updated
    },
    {
      image: IMAGES.cco2,
      name: 'Carbon Capture',
      tag: '$CCO2',
      price: '',
      change: '',
    },
    {
      image: IMAGES.btc,
      name: 'Bitcoin',
      tag: '$BTC',
      price: '',
      change: '',
    },
    {
      image: IMAGES.eth,
      name: 'Ethereum',
      tag: '$ETH',
      price: '',
      change: '',
    },
    {
      image: IMAGES.sol,
      name: 'Solana',
      tag: '$SOL',
      price: '',
      change: '',
    },
    {
      image: IMAGES.xrp,
      name: 'Ripple',
      tag: '$XRP',
      price: '',
      change: '',
    },
    {
      image: IMAGES.bnb,
      name: 'BNB',
      tag: '$BNB',
      price: '',
      change: '',
    },
    {
      image: IMAGES.usdt,
      name: 'Tether',
      tag: '$USDT',
      price: '',
      change: '',
    },
    {
      image: IMAGES.usdc,
      name: 'USD Coin',
      tag: '$USDC',
      price: '',
      change: '',
    },
  ];

  const [fcryptoData, setFcryptoData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real-time data for tokens in USDT
        const response = await fetch(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=AIAT,CCO2,BTC,ETH,SOL,XRP,BNB,USDT,USDC&convert=USDT',
          {
            headers: {
              'X-CMC_PRO_API_KEY': '8028e79e-0f12-416e-8bd9-827bb607bb9a',
            },
          }
        );

        if (!response.ok) {
          const status = response.status;
          const text = await response.text();
          throw new Error(`Network response was not ok. Status: ${status} - ${text}`);
        }

        const json = await response.json();

        const updatedData = [
          {
            image: IMAGES.aiat,
            name: 'AI Analysis Token',
            tag: '$AIAT',
            price: `$${json.data.AIAT.quote.USDT.price.toFixed(4)}`,
            change: `${json.data.AIAT.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.cco2,
            name: 'Carbon Capture',
            tag: '$CCO2',
            price: `$${json.data.CCO2.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.CCO2.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.btc,
            name: 'Bitcoin',
            tag: '$BTC',
            price: `$${json.data.BTC.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.BTC.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.eth,
            name: 'Ethereum',
            tag: '$ETH',
            price: `$${json.data.ETH.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.ETH.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.sol,
            name: 'Solana',
            tag: '$SOL',
            price: `$${json.data.SOL.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.SOL.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.xrp,
            name: 'Ripple',
            tag: '$XRP',
            price: `$${json.data.XRP.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.XRP.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.bnb,
            name: 'BNB',
            tag: '$BNB',
            price: `$${json.data.BNB.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.BNB.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.usdt,
            name: 'Tether',
            tag: '$USDT',
            price: `$${json.data.USDT.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.USDT.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.usdc,
            name: 'USD Coin',
            tag: '$USDC',
            price: `$${json.data.USDC.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.USDC.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
        ];

        setFcryptoData(updatedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {fcryptoData.map((data, index) => (
        <WalletList
          key={index}
          image={data.image}
          name={data.name}
          tag={data.tag}
          price={data.price}
          change={data.change}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 1,
  },
});

export default FeaturedCrypto;