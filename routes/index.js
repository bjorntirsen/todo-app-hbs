var express = require('express');
var router = express.Router();

const todoItems = [
  {
    id: 1,
    title: 'First item',
    content: 'Content of first item.',
  },
  {
    id: 2,
    title: 'second item',
    content: 'Content of second item.',
  },
  {
    id: 3,
    title: 'third item',
    content: 'Content of third item.',
  },
];

/* GET all items. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Björns TODO', items: todoItems });
});

/* GET one item. */
router.get('/items/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = todoItems.find((item) => item.id === itemId);
  res.render('item', { title: 'Björns TODO', item });
});

module.exports = router;
