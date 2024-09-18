import { useStateProvider } from "../../../context/StateContext";
import { GET_BUYER_ORDERS_ROUTE, RELEASE_PAYMENT } from "../../../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { toast } from "react-toastify"; // Ensure toast notifications are being used
import Link from 'next/link'
function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderUpdateFlag, setOrderUpdateFlag] = useState(false); // New state to trigger re-fetching of orders
  const [{ userInfo }] = useStateProvider();

  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_BUYER_ORDERS_ROUTE, { withCredentials: true });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo, orderUpdateFlag]); // Adding orderUpdateFlag to dependency array

  const approvePayment = async (paymentIntent) => {
    try {
      const response = await axios.put(
        RELEASE_PAYMENT,
        {
          paymentIntentId: paymentIntent,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Payment approved and released to the seller!");
        setOrderUpdateFlag((prev) => !prev); // Trigger re-fetching of orders
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while releasing the payment.");
    }
  };

  // Helper function to truncate long gig titles
  const truncateTitle = (title, maxLength = 30) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-200 dark:text-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#A0C7C7] dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">Order Id</th>
              <th scope="col" className="px-6 py-3">Gig Title</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
              <th scope="col" className="px-6 py-3">Send Message</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="bg-white dark:bg-[#596e6e] hover:bg-gray-600" key={order.id}>
                <th scope="row" className="px-6 py-4">{order.id}</th>
                <td className="px-6 py-4 font-medium">{truncateTitle(order.gig.title)}</td>
                <td className="px-6 py-4">${order.price}</td>
                <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>
                <td className="px-6 py-4">
                  {order.isCompleted ? (
                    <span className="text-green-500">Payment Done to us</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {order.isApproved ? (
                    <span className="text-green-500">Payment Released to Seller</span>
                  ) : (
                    <button
                      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                      onClick={() => approvePayment(order.paymentIntent)}
                    >
                      Approve Payment to seller
                    </button>
                  )}
                </td>
                <td className="px-14 py-4">
                  <Link href={`/buyer/orders/messages/${order.id}`}>
                    <FaRegEnvelope className="text-green-500 text-xl cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
