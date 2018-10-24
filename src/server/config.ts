/**
 * Created by Ron on 02/10/2016.
 */
export const config = {
    auth: {
        SALT_ROUNDS: 10,
        TOKEN_SECRET: 'MyTokenSecret',

        // OAuth 2.0
        GOOGLE_SECRET: '7IsxblwHRT_OJzfErSkRDJqe',
        GOOGLE_CLIENT_ID: '1040156216476-moaoejmnru44umfgjulbbr1tkb5lef7c.apps.googleusercontent.com'
        // FACEBOOK_SECRET: 'REPLACE ME',
        // TWITTER_SECRET: 'REPLACE ME',
    },
    solr: {
        host: '127.0.0.1',
        port: '8983',
        core: 'dbFlow5',
        path: '/solr',
        solrVersion: '5.1'
    }
};
