import { rest } from 'msw';

let initDataMock = [
    {
        id: 1,
        title: 'title 1',
    },
    {
        id: 2,
        title: 'title 2',
    },
]

const handlers = [
    rest.get('http://localhost:8080/core', (req, res, ctx) => {
        return res(
            ctx.json(initDataMock)
        )
    }),
    rest.post('http://localhost:8080/core', (req, res, ctx) => {
        const body = JSON.parse(req.body);
        initDataMock.push(body);
        return res(
            ctx.json(initDataMock)
        )
    }),
    rest.delete('http://localhost:8080/core', (req, res, ctx) => {
        const body = JSON.parse(req.body);
        initDataMock = initDataMock.filter((item) => item.id !== body.id);
        return res(
            ctx.json(initDataMock)
        )
    }),
]

export default handlers;
