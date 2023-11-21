// Define GraphQL typeDefs and resolvers

const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const EtherDataSource = require('./datasource/ethDatasource');
const typeDefs = importSchema('./schema.graphql');

require('dotenv').config();

const resolvers = {
	Query: {
		etherBalanceByAddress: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.etherBalanceByAddress(),

		totalSupplyOfEther: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.totalSupplyOfEther(),

		latestEthereumPrice: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.getLatestEthereumPrice(),

		blockConfirmationTime: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.getBlockConfirmationTime(),
	},
};

// Create Apollo Server instance

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		// Instantiate EtherDataSource for accessing Ethereum data

		ethDataSource: new EtherDataSource(),
	}),
});

// Set no timeout limit
server.timeout = 0;

// Start the server on port 9000
server.listen('9000').then(({ url }) => {
	// Log message when server is ready
	console.log(`🚀 Server ready at ${url}`);
});
