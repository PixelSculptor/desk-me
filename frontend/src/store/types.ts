export type TAction<Type, Payload> = {
    type: Type[keyof Type];
    payload: Payload;
};
