import createDebug from 'debug';
const debug = createDebug('films:server:listening');
export const listenManager = (server) => {
    const addr = server.address();
    if (addr === null)
        return;
    let bind;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    }
    else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `${addr.address}:${addr?.port}`;
    }
    if (!process.env.DEBUG) {
        console.log(`Server listening on ${bind}`);
    }
    else {
        debug(`Servidor escuchando en ${bind}`);
    }
};
