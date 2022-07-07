import { rest } from 'msw';
import { basicMock } from '../data';

const handlers = [
    rest.get('http://localhost:8080/react-query', (req, res, ctx) => {
        return res(
            //   ctx.status(400, 'error guys'),
            ctx.json(basicMock)
        )
    }),
]

export default handlers;
