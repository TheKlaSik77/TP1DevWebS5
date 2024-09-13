
const routes = {
  'index': 'http://localhost:5000/tasks?offset={offset}&limit={limit}',
  "findOne": 'http://localhost:5000/tasks/{taskId}',
  'create': 'http://localhost:5000/tasks',
  "delete": 'http://localhost:5000/tasks/{taskId}',
  "update": 'http://localhost:5000/tasks/{taskId}',
  'comparison': 'http://localhost:5000/statistics/status',
};
