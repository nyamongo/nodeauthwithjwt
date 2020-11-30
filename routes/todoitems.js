const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/',verify,(req,res)=> {
    res.json({items: {name:'item1',desc:'item1 desc'}})
})

module.exports = router;