const request = require('supertest');
const { app } = require('./../app');
const { Todo } = require('./../models/todo');

const sampleTodos = [
  {
    text: 'todo'
  },
  {
    text: 'todo #2'
  },
  {
    text: 'todo #3'
  }
];

beforeEach((done) => {
  Todo.remove({})
    .then(() => Todo.insertMany(sampleTodos))
    .then(() => {
      done();
    });
});

describe('server', () => {
  it('should POST /api/todos', (done) => {
    const text = 'new todo';

    request(app)
      .post('/api/todos/')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.result.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not POST with bad data to /api/todos', (done) => {
    request(app)
      .post('/api/todos')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.status).toBe('FAIL');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(3);
            done();
          })
          .catch((e) => {
            done(e);
          });
      });
  });

  it('should GET list of todos from /api/todos', (done) => {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});
