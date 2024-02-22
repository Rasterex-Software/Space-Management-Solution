declare class RxEvents {
    private static instance;
    private readonly EVENTS;
    private publishSubscribe;
    private constructor();
    static readonly Instance: RxEvents;
    dispatchEvent(name: string, ...args: any): void;
    subscribe(topic: string, subscriber: (...args: any) => void): number;
    unsubscribe(topic: string, key: number): void;
    unsubscribeAll(): void;
    private dispatchRxEvents;
}
declare const _default: RxEvents;
export default _default;
