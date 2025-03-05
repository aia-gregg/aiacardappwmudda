import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WalletList from '../../components/List/WalletList';
import { IMAGES } from '../../constants/Images';

const TopCrypto = () => {
  // Define tokens in the exact order requested
  const initialData = [
    { image: IMAGES.ltc, name: 'Litecoin', tag: '$LTC', price: '', change: '' },
    { image: IMAGES.trx, name: 'TRON', tag: '$TRX', price: '', change: '' },
    { image: IMAGES.fil, name: 'Filecoin', tag: '$FIL', price: '', change: '' },
    { image: IMAGES.link, name: 'Chainlink', tag: '$LINK', price: '', change: '' },
    { image: IMAGES.dot, name: 'Polkadot', tag: '$DOT', price: '', change: '' },
    { image: IMAGES.doge, name: 'Dogecoin', tag: '$DOGE', price: '', change: '' },
    { image: IMAGES.shib, name: 'Shiba Inu', tag: '$SHIB', price: '', change: '' },
    { image: IMAGES.ada, name: 'Cardano', tag: '$ADA', price: '', change: '' },
    { image: IMAGES.avax, name: 'Avalanche', tag: '$AVAX', price: '', change: '' },
    { image: IMAGES.uni, name: 'Uniswap', tag: '$UNI', price: '', change: '' },
    { image: IMAGES.arb, name: 'Arbitrum', tag: '$ARB', price: '', change: '' },
    { image: IMAGES.pepe, name: 'Pepe', tag: '$PEPE', price: '', change: '' },
    { image: IMAGES.bch, name: 'Bitcoin Cash', tag: '$BCH', price: '', change: '' },
  ];

  const [tcryptoData, setTcryptoData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real-time data for the tokens in USDT
        const response = await fetch(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=LTC,TRX,FIL,LINK,DOT,DOGE,SHIB,ADA,AVAX,UNI,ARB,PEPE,BCH&convert=USDT',
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

        // Map the API data to our token list in the same order
        const updatedData = [
          {
            image: IMAGES.ltc,
            name: 'Litecoin',
            tag: '$LTC',
            price: `$${json.data.LTC.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.LTC.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.trx,
            name: 'TRON',
            tag: '$TRX',
            price: `$${json.data.TRX.quote.USDT.price.toFixed(4)}`,
            change: `${json.data.TRX.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.fil,
            name: 'Filecoin',
            tag: '$FIL',
            price: `$${json.data.FIL.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.FIL.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.link,
            name: 'Chainlink',
            tag: '$LINK',
            price: `$${json.data.LINK.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.LINK.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.dot,
            name: 'Polkadot',
            tag: '$DOT',
            price: `$${json.data.DOT.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.DOT.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.doge,
            name: 'Dogecoin',
            tag: '$DOGE',
            price: `$${json.data.DOGE.quote.USDT.price.toFixed(4)}`,
            change: `${json.data.DOGE.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.shib,
            name: 'Shiba Inu',
            tag: '$SHIB',
            price: `$${json.data.SHIB.quote.USDT.price.toFixed(8)}`,
            change: `${json.data.SHIB.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.ada,
            name: 'Cardano',
            tag: '$ADA',
            price: `$${json.data.ADA.quote.USDT.price.toFixed(4)}`,
            change: `${json.data.ADA.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.avax,
            name: 'Avalanche',
            tag: '$AVAX',
            price: `$${json.data.AVAX.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.AVAX.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.uni,
            name: 'Uniswap',
            tag: '$UNI',
            price: `$${json.data.UNI.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.UNI.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.arb,
            name: 'Arbitrum',
            tag: '$ARB',
            price: `$${json.data.ARB.quote.USDT.price.toFixed(4)}`,
            change: `${json.data.ARB.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.pepe,
            name: 'Pepe',
            tag: '$PEPE',
            price: `$${json.data.PEPE.quote.USDT.price.toFixed(9)}`,
            change: `${json.data.PEPE.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
          {
            image: IMAGES.bch,
            name: 'Bitcoin Cash',
            tag: '$BCH',
            price: `$${json.data.BCH.quote.USDT.price.toFixed(2)}`,
            change: `${json.data.BCH.quote.USDT.percent_change_24h.toFixed(2)}%`,
          },
        ];

        setTcryptoData(updatedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {tcryptoData.map((data, index) => (
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
    padding: 10,
  },
});

export default TopCrypto;