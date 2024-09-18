import { ORDER_SUCCESS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Success() {
  const router = useRouter();
  const { payment_intent } = router.query;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const changeOrderStatus = async () => {
      try {
        // Update the order status in the backend
        await axios.put(
          ORDER_SUCCESS_ROUTE,
          { paymentIntent: payment_intent }, // Check if this key matches what your backend expects
          { withCredentials: true }
        );
        setLoading(false);
        // Redirect to the orders page after success
        setTimeout(() => router.push("/buyer/orders"), 3000);
      } catch (err) {
        console.error("Error updating order status:", err);
        setError("Failed to confirm payment. Please try again.");
        setLoading(false);
      }
    };

    if (payment_intent) {
      changeOrderStatus();
    } else {
      router.push("/");
    }
  }, [payment_intent, router]);

  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      {loading ? (
        <>
          <h1 className="text-4xl text-center">
            Payment successful. You are being redirected to the orders page.
          </h1>
          <h1 className="text-4xl text-center">Please do not close the page.</h1>
        </>
      ) : error ? (
        <h1 className="text-4xl text-center text-red-600">{error}</h1>
      ) : (
        <h1 className="text-4xl text-center text-green-600">
          Redirecting to orders page...
        </h1>
      )}
    </div>
  );
}

export default Success;
