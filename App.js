import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStripe } from '@stripe/stripe-react-native';

// Replace with your own Stripe publishable key
const PUBLISHABLE_KEY = 'pk_test_your_publishable_key';

// Replace with your server endpoint for creating payments
const PAYMENT_ENDPOINT = 'https://your-server-endpoint.com/payments';

const HomeScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePaymentSheet = async () => {
      try {
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: 'your_payment_intent_client_secret',
        });

        if (!error) {
          setLoading(false);
        }
      } catch (e) {
        console.log('Error initializing payment sheet:', e);
      }
    };

    initializePaymentSheet();
  }, []);

  const handlePayment = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.log('Payment failed:', error);
      } else {
        console.log('Payment succeeded!');
      }
    } catch (e) {
      console.log('Error during payment:', e);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Stripe Integration Example</Text>
      <Button title="Make Payment" onPress={handlePayment} disabled={loading} />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
