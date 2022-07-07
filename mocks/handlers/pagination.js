import { rest } from 'msw';

let initDataMock = [
    [
        {
            id: 1,
            name: 'name 1',
        },
        {
            id: 2,
            name: 'name 2',
        },
    ],
    [
        {
            id: 3,
            name: 'name 3',
        },
        {
            id: 4,
            name: 'name 4',
        },
    ],
    [
        {
            id: 5,
            name: 'name 5',
        },
        {
            id: 6,
            name: 'name 6',
        },
    ],
]

const handlers = [
    rest.get('http://localhost:8080/pagination', (req, res, ctx) => {
        const page = req.url.searchParams.get('page')

        const hasMore = (Number(page) + 1) < 3;

        return res(
            ctx.json({
                projects: initDataMock[page] ?? [],
                hasMore,
            })
        )
    }),
]

export default handlers;
