const request = require('supertest');
const { app } = require('./../app');
const { Todo } = require('./../models/todo');
const { ObjectID } = require('mongodb');

const sampleTodos = [
  {
    _id: new ObjectID(),
    text: 'todo'
  },
  {
    _id: new ObjectID(),
    text: 'todo #2'
  },
  {
    _id: new ObjectID(),
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

describe('POST /api/todos', () => {
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
});

describe('GET /api/todos', () => {
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

describe('GET /api/todos/:id', () => {
  it('should return todo doc - 200 OK', (done) => {
    request(app)
      .get(`/api/todos/${sampleTodos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(sampleTodos[0].text);
      })
      .end(done);
  });

  it('should return a 404', (done) => {
    const objID = new ObjectID();
    request(app)
      .get(`/api/todos/${objID.toHexString()}`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('should return a 400', (done) => {
    request(app)
      .get('/api/todos/123')
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('DELETE /api/todos/:id', () => {
  it('should return 200 - OK', (done) => {
    const id = sampleTodos[0]._id;

    request(app)
      .delete(`/api/todos/${id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toEqual(sampleTodos[0].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id)
          .then((todo) => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch((e) => {
            done(e);
          });
      });
  });

  it('should return 400 - Todo does NOT exist', (done) => {
    request(app)
      .delete(`/api/todos/${new ObjectID().toHexString()}`)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('should return 400 - Invalid todo format', (done) => {
    request(app)
      .delete('/api/todos/12345')
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
