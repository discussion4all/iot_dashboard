import MQTT from "async-mqtt";
import AWSAppSyncClient from 'aws-appsync'; //AppSyncClient

//MQTT client
const client = MQTT.connect("ws://admin:admin123@mqtt.omnivoltaic.com:9001");

//AppSyncClient
const Appclient = new AWSAppSyncClient({
  url: 'https://4urrtrh5cbek5e7tefv6qmku2i.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  region: 'ap-southeast-1',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-uybvqvefkfdzvior3cddv4h4gu',
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  }
})

export {client, Appclient};
