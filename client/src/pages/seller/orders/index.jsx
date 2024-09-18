import { useStateProvider } from "../../../context/StateContext";
import { GET_SELLER_ORDERS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegPaperPlane, FaImage } from "react-icons/fa";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_SELLER_ORDERS_ROUTE, { withCredentials: true });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#A0C7C7] dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                Ordered By
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Send Message
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  className="bg-white dark:bg-[#5f7777] dark:text-white hover:bg-gray-500"
                  key={order.id}
                >
                  <th scope="row" className="px-6 py-4 ">
                    {order.id}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium">
                    {order.gig.title}
                  </th>
                  <td className="px-6 py-4">{order.gig.category}</td>
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                  <td className="px-6 py-4">
                    {order.buyer.fullName} (@{order.buyer.username})
                  </td>
                  <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>

                  <td className="px-6 py-4 ">
                    <Link
                      href={`/seller/orders/messages/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      <button
              type="submit"
              className="bg-[#1DBF73] hover:border border-white text-white rounded-full px-4 py-2 ml-2"
              
            >
              <FaRegPaperPlane />
            </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
