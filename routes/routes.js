
const express = require('express');
var {authenticate} = require('../middleware/authenticate');

const { fetchvotes, fetchusers, fetchspecificuser, vote, saveuser, deletevote, updateuser, deleteuser, fetchuserauthenticated, userlogin } = require('./voting/votingroutes');


const getRoutes = () => ({
    '/fetchvotes' : [ fetchvotes ],
    '/fetchusers' : [ fetchusers ],
    '/fetchuser/:IdentityId' : [ fetchspecificuser ],
    '/users/me' : [ authenticate, fetchuserauthenticated ],
    '/users/login' : [ userlogin ],
});

const postRoutes = () => ({
    '/vote' : [ vote ] ,
    '/SaveUser' : [ saveuser ] ,
});

const deleteRoutes = () => ({
    '/vote/:id' : [ deletevote ] ,
    '/users/me/token' : [authenticate, deleteuser],
});

const patchRoutes = () => ({
    '/user/:id' : [ updateuser ] ,

})

const routes = () => ({
    get: getRoutes(),
    post: postRoutes(),
    delete: deleteRoutes(), 
    patch: patchRoutes(),
});

module.exports.setup = function () {
    const router = express.Router();
    Object.entries(routes()).forEach(([ type, routelist ]) => {
    Object.entries(routelist).forEach(([ key, value ]) => {
      if (type === 'get') {
        router.get(key, value);
      }
      else if (type === 'post') {
        router.post(key, value);
      }
      else if (type === 'delete') {
        router.delete(key, value);
      }
      else if (type === 'patch') {
        router.patch(key, value);
      }
    });
  });

  return router;
};