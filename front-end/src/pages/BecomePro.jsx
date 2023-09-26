import PropTypes from 'prop-types';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalPayment } from '../components/PaypalPayment';

export default function BecomePro() {
    const paypalOptions = {
        clientId: "AQpA-hhfzocEfg3jkMyuziheekP0vE8aV0qUYvImjibDqvfrmZcH0-sEq0QGaITen2_ZlxoXvzO6-_Tg",
        currency: "BRL"
    }

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalPayment />
        </PayPalScriptProvider>
    )
}

BecomePro.propTypes = {
    session: PropTypes.object.isRequired
}