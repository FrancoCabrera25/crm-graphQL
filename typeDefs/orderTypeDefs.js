const {gql} = require("apollo-server");

const orderTypeDefs = gql`
        
       type Order {
           id: ID
           order: [OrderProductType]
           total: Float
           client: ID
           seller: ID
           create_At: String
           state: StateOrder
      }
      
      type OrderProductType {
           id: ID!
           quantity: Int
       }
      
       input OrderProductInput {
           id: ID
           quantity: Int
       }
       
       input OrderInput {
             order: [OrderProductInput]
             total: Float
             client: ID!
             state: StateOrder
      }

      enum StateOrder {
          PENDING
          COMPLETE
          CANCELED
      }
       type Query {
            #Order
            getOrders: [Order]
            getOrdersBySeller: [Order]
            getOrderById(id: ID!): Order
            getOrderByState(state: String): [Order]   
        }

        type Mutation {
            #Order
             createOrder(input: OrderInput): Order
             updateOrder(id: ID!, input: OrderInput): Order
             deleteOrder(id: ID!): String
        }
 `;

module.exports = orderTypeDefs;
