export interface IPublishSubscribe {
    subscribe(topic: string, subscriber: (...args: any) => void): number;
    publish(topic: string, ...args: any): void;
    unsubscribe(topic: string, key: number): void;
    unsubscribeAll(): void;
}
export declare class PublishSubscribe implements IPublishSubscribe {
    private key;
    private subscribers;
    subscribe(topic: string, subscriber: (...args: any) => void): number;
    publish(topic: string, ...args: any): void;
    unsubscribe(topic: string, key: number): void;
    unsubscribeAll(): void;
}
