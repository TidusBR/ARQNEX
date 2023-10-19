import { PayPalButtons } from "@paypal/react-paypal-js";
import { config } from "../config";

export function PayPalPayment() {
    const createOrder = () => {
        // Order is created on the server and the order id is returned
        return fetch(`${config.api}${config.endpoints.paypal.createOrder}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: "Premium",
                    cost: "20.00"
                }
            }),
            credentials: "include"
        })
        .then((response) => response.json())
        .then((order) => order.id);
    }

    const onApprove = (data) => {
        // Order is captured on the server
        return fetch(`${config.api}${config.endpoints.paypal.captureOrder}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            }),
            credentials: "include"
        })
        .then((response) => response.json())
        .then((order) => {
            if (order.status === 'COMPLETED') {
                window.location.href = "/";
            }
        });
    }
    
    return (
        <PayPalButtons
            createOrder={(data) => createOrder(data)}
            onApprove={(data) => onApprove(data)}
            style={{ layout: "horizontal" }}
        />
    )
}