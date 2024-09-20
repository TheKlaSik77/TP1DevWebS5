
const routes = {
  'index': 'http://localhost:5000/taches?offset={offset}&limit={limit}',
  "findOne": 'http://localhost:5000/taches/{taskId}',
  'create': 'http://localhost:5000/taches',
  "delete": 'http://localhost:5000/taches/{taskId}',
  "update": 'http://localhost:5000/taches/{taskId}',
  'comparison': 'http://localhost:5000/statistics/categories',
};
