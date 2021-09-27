var express = require('express');
var router = express.Router();

let todoItems = [
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
  if (!item) {
    res.statusCode = 404;
    res.send('No item found by that id!');
    res.end();
    return;
  } else {
    res.statusCode = 200;
    res.render('item', { title: 'Björns TODO', item });
  }
});

/* POST update one item. */
router.post('/items/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = todoItems.find((item) => item.id === itemId);
  if (!item) {
    res.statusCode = 404;
    res.send('No item found by that id!');
    res.end();
    return;
  } else {
    const updatedItem = {
      id: itemId,
      title: req.body.title,
      content: req.body.content,
    };
    const filteredItems = todoItems.filter((item) => item.id !== itemId);
    todoItems = [...filteredItems, updatedItem];
    todoItems = todoItems.sort((first, second) => first.id - second.id);
    res.statusCode = 200;
    res.render('item', { title: 'Updated Björns TODO', item: updatedItem });
  }
});

/* POST create new item. */
router.post('/items', (req, res, next) => {
  let highestId = 0;
  todoItems.forEach((item) => {
    if (item.id > highestId) highestId = parseInt(item.id);
  });

  const newItem = {
    id: highestId + 1,
    title: req.body.title,
    content: req.body.content,
  };

  console.log(`Created new item: `);
  console.log(newItem);

  todoItems.push(newItem);
  //todoItems = [...todoItems, newItem];
  res.statusCode = 201;
  res.redirect('/');
});

module.exports = router;
